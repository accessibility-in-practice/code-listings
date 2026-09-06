const form = document.querySelector("#dog-complaint-form");
const errorSummary = document.querySelector("#error-summary");
const errorList = document.querySelector("#error-list");
const statusMessage = document.querySelector("#form-status");
const clearButton = document.querySelector("#clear-form");

const controls = [
    document.querySelector("#owner-name"),
    document.querySelector("#owner-email"),
    document.querySelector("#dog-breed"),
    document.querySelector("#dog-age"),
    document.querySelector("#complaint")
];

let submissionAttempted = false;

const validationMessages = {
    "owner-name": {
        valueMissing: "Enter the owner's name."
    },

    "owner-email": {
        valueMissing: "Enter the owner's email address.",
        typeMismatch:
            "Enter an email address in the format name@example.com."
    },

    "dog-breed": {
        valueMissing:
            "Enter the dog's breed, or enter “mixed breed” if it is unknown."
    },

    "dog-age": {
        valueMissing: "Enter the dog's age in years.",
        badInput: "Enter the dog's age as a whole number.",
        rangeUnderflow: "Enter an age of 0 or greater.",
        rangeOverflow: "Enter an age of 30 or less.",
        stepMismatch: "Enter the dog's age as a whole number."
    },

    complaint: {
        valueMissing: "Describe the complaint.",
        tooShort:
            "Enter at least 20 characters describing the complaint."
    }
};

const validityChecks = [
    "valueMissing",
    "typeMismatch",
    "badInput",
    "rangeUnderflow",
    "rangeOverflow",
    "stepMismatch",
    "tooShort",
    "tooLong"
];

function getErrorMessage(control) {
    const messages = validationMessages[control.id] || {};

    for (const check of validityChecks) {
        if (control.validity[check]) {
            return messages[check] || "Check the information entered here.";
        }
    }

    return "";
}

function showFieldError(control, message) {
    const group = document.querySelector(`#${control.id}-group`);
    const error = document.querySelector(`#${control.id}-error`);

    control.setAttribute("aria-invalid", "true");
    group.classList.add("form-field--error");

    error.textContent = `There's a problem with this field: ${message}`;
    error.hidden = false;
}

function clearFieldError(control) {
    const group = document.querySelector(`#${control.id}-group`);
    const error = document.querySelector(`#${control.id}-error`);

    control.removeAttribute("aria-invalid");
    group.classList.remove("form-field--error");

    error.textContent = "";
    error.hidden = true;
}

function validateField(control) {
    if (control.validity.valid) {
        clearFieldError(control);
        return "";
    }

    const message = getErrorMessage(control);
    showFieldError(control, message);

    return message;
}

function getCurrentErrors() {
    return controls
        .filter((control) => !control.validity.valid)
        .map((control) => ({
            control,
            message: getErrorMessage(control)
        }));
}

function renderErrorSummary(errors) {
    errorList.replaceChildren();

    if (errors.length === 0) {
        errorSummary.hidden = true;
        return;
    }

    for (const error of errors) {
        const listItem = document.createElement("li");
        const link = document.createElement("a");

        link.href = `#${error.control.id}`;
        link.textContent = error.message;

        link.addEventListener("click", (event) => {
            event.preventDefault();
            error.control.focus();
        });

        listItem.append(link);
        errorList.append(listItem);
    }

    errorSummary.hidden = false;
}

form.addEventListener("submit", (event) => {
    submissionAttempted = true;
    statusMessage.textContent = "";

    const errors = [];

    for (const control of controls) {
        const message = validateField(control);

        if (message) {
            errors.push({ control, message });
        }
    }

    if (errors.length > 0) {
        event.preventDefault();
        renderErrorSummary(errors);

        errorSummary.hidden = false;

        requestAnimationFrame(() => {
            // Move focus to the descriptive error summary, right after the newly displayed element is rendered (otherwise focus indicator will not show up)
            errorSummary.focus();
        });
        return;
    }

    errorSummary.hidden = true;

    /*
      Allow the normal form submission to continue.

      The server must validate the same fields again. The resulting page
      should provide a clear success message or return the form with the
      submitted values, error summary, and inline errors preserved.
    */
    statusMessage.textContent = "The form is valid and is being submitted.";
});

for (const control of controls) {
    /*
      Do not report errors before the user has tried to submit.
      After submission, update an invalid field as the user corrects it.
    */
    control.addEventListener("input", () => {
        if (
            submissionAttempted &&
            control.getAttribute("aria-invalid") === "true"
        ) {
            validateField(control);
            renderErrorSummary(getCurrentErrors());
        }
    });

    control.addEventListener("blur", () => {
        if (submissionAttempted) {
            validateField(control);
            renderErrorSummary(getCurrentErrors());
        }
    });
}

/*
  Reset controls can cause substantial accidental data loss.
  A confirmation is provided before the native reset proceeds.
*/
clearButton.addEventListener("click", (event) => {
    const shouldClear = window.confirm(
        "Clear all information entered in this form?"
    );

    if (!shouldClear) {
        event.preventDefault();
    }
});

form.addEventListener("reset", () => {
    /*
      The reset event fires before the browser has finished resetting
      the controls, so accessibility states are cleared on the next frame.
    */
    window.requestAnimationFrame(() => {
        submissionAttempted = false;

        for (const control of controls) {
            clearFieldError(control);
        }

        errorList.replaceChildren();
        errorSummary.hidden = true;
        statusMessage.textContent = "The form has been cleared.";
    });
});