const form = document.querySelector("#application-form");
const submitButton = form.querySelector("button[type='submit']");
const toast = document.querySelector("#toast");
const toastMessage = document.querySelector("#toast-message");
const dismissButton = document.querySelector("#dismiss-toast");

function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add("is-visible");
    setTimeout(function () {
        toast.classList.remove("is-visible");
    }, 4000);
}

function hideToast() {
    toast.classList.remove("is-visible");
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