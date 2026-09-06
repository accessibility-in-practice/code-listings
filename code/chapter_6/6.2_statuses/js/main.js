const form = document.querySelector("#application-form");
const submitButton = form.querySelector("button[type='submit']");
const toast = document.querySelector("#toast");
const toastMessage = document.querySelector("#toast-message");
const dismissButton = document.querySelector("#dismiss-toast");

let toastTimeout;

function showToast(message) {
    toastMessage.textContent = message;
    if (!toast.matches(":popover-open")) {
        toast.showPopover();
    }
    toast.classList.add("is-visible");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(function () {
        hideToast();
    }, 4000);
}

function hideToast() {
    clearTimeout(toastTimeout);
    toast.classList.remove("is-visible");

    //This allows a transition animation to complete first (when allowed).
    toast.addEventListener("transitionend", function () {
        if (toast.matches(":popover-open")) {
            toast.hidePopover();
        }
    }, { once: true });
}

//Mimicking server side processing
form.addEventListener("submit", function (event) {
    event.preventDefault();

    submitButton.disabled = true;
    showToast("Submitting your request...");

    // Simulate a request to the server.
    setTimeout(function () {
        showToast("Your request has been received.");
        submitButton.disabled = false;
        form.reset();
    }, 5000);
});

dismissButton.addEventListener("click", hideToast);