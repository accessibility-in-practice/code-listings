const modalDialog = document.getElementById("modal-dialog");
const openModalButton = document.getElementById("open-modal");
const closeModalButton = document.getElementById("close-modal");
const modalTitle = document.getElementById("modal-title");


openModalButton.addEventListener("click", () => {
    modalDialog.showModal();

    /*
      Move focus inside the modal.
 
      Focusing the heading is useful when the dialog contains explanatory
      text that should be encountered before the buttons. tabindex="-1"
      allows programmatic focus without adding the heading to the Tab order.
    */
    modalTitle.focus();
});

closeModalButton.addEventListener("click", () => {
    modalDialog.close();
});

modalDialog.addEventListener("close", () => {
    /*
      Return focus to the control that opened the modal.
      This preserves the user’s point of regard.
    */
    openModalButton.focus();
});

