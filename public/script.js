document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.querySelector(".dropdown-menu-icon");
  const dropdownContent = document.querySelector(".nav-link-container");

  menuIcon.addEventListener("click", function () {
    dropdownContent.classList.toggle("show");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const detailsHeading = document.querySelector(".blog-details-heading");
  const details = document.querySelector(".blog-details");
  const arroyIcon = document.querySelector(".arrow-icon");

  detailsHeading.addEventListener("click", function () {
    details.classList.toggle("show");

    if (arroyIcon.src === "http://localhost:7000/down.png") {
      arroyIcon.src = "http://localhost:7000/up.png";
      arroyIcon.alt = "Up Symbol";
    } else {
      arroyIcon.src = "http://localhost:7000/down.png";
      arroyIcon.alt = "Down Symbol";
    }
  });
});
