(function () {
  "use strict";
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  var closeBtn = document.getElementById("navClose");
  var overlay = document.getElementById("navOverlay");
  if (!toggle || !links || !overlay) return;

  function openDrawer() {
    links.classList.add("open");
    overlay.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closeDrawer() {
    links.classList.remove("open");
    overlay.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  toggle.addEventListener("click", function () {
    if (links.classList.contains("open")) closeDrawer();
    else openDrawer();
  });
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  overlay.addEventListener("click", closeDrawer);
  links.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeDrawer);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeDrawer();
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 820) closeDrawer();
  });
})();
