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

  detailsHeading.addEventListener("click", function () {
    details.classList.toggle("show");
  });
});
