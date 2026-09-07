(function () {
  "use strict";
  var slides = [].slice.call(document.querySelectorAll(".hero-slide"));
  var dots = [].slice.call(document.querySelectorAll(".hero-dot"));
  var prevBtn = document.getElementById("heroPrev");
  var nextBtn = document.getElementById("heroNext");
  var carousel = document.getElementById("heroCarousel");
  if (!slides.length || !carousel) return;

  var current = 0;
  var timer = null;
  var DELAY = 7000;

  function goTo(index) {
    index = (index + slides.length) % slides.length;
    if (index === current) return;
    slides[current].classList.remove("active");
    if (dots[current]) {
      dots[current].classList.remove("active");
      dots[current].setAttribute("aria-selected", "false");
    }
    current = index;
    slides[current].classList.add("active");
    if (dots[current]) {
      dots[current].classList.add("active");
      dots[current].setAttribute("aria-selected", "true");
    }
  }
  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function start() {
    stop();
    timer = setInterval(next, DELAY);
  }
  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  if (nextBtn) nextBtn.addEventListener("click", function () { next(); start(); });
  if (prevBtn) prevBtn.addEventListener("click", function () { prev(); start(); });
  dots.forEach(function (dot, i) {
    dot.addEventListener("click", function () { goTo(i); start(); });
  });

  carousel.addEventListener("mouseenter", stop);
  carousel.addEventListener("mouseleave", start);
  carousel.addEventListener("focusin", stop);
  carousel.addEventListener("focusout", start);

  start();
})();
