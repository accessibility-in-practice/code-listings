const resourceLinks = document.querySelectorAll(".resourceLink");

resourceLinks.forEach((resourceLink) => {
    resourceLink.addEventListener("keydown", (event) => {
        event.preventDefault(); /* <-- Causes the keyboard trap as it is currently preventing the default handler for any key press */
        //Some custom logic
  });
});
