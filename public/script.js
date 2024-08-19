document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.querySelector(".dropdown-menu-icon");
  const dropdownContent = document.querySelector(".nav-link-container");

  menuIcon.addEventListener("click", function () {
    dropdownContent.classList.toggle("show");
  });
});
