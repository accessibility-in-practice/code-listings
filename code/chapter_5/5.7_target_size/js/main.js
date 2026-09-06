const resourceLinks = document.querySelectorAll(".resourceLink");

// resourceLinks.forEach((resourceLink) => {
//     resourceLink.addEventListener("keydown", (event) => {
//         event.preventDefault();
//         //Some custom logic
//   });
// });

resourceLinks.forEach((resourceLink) => { 
    resourceLink.addEventListener("click", (event) => { 
        event.preventDefault();
        // Some custom logic 
    });
 });