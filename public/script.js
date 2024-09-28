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

    if (arroyIcon.src === "https://kizod-blog-api.onrender.com/down.png") {
      arroyIcon.src = "https://kizod-blog-api.onrender.com/up.png";
      arroyIcon.alt = "Up Symbol";
    } else {
      arroyIcon.src = "https://kizod-blog-api.onrender.com/down.png";
      arroyIcon.alt = "Down Symbol";
    }
  });
});
