/* HAWA / CHAPTERS — lightweight progressive enhancement.
   No GSAP dependency, no hijacked scroll, no fake motion on checkout. */
(function () {
  "use strict";
  var motionOff = window.matchMedia("(prefers-reduced-motion: reduce)");
  var smallScreen = window.matchMedia("(max-width: 680px)");
  var stage = document.getElementById("story");
  var storyHost = document.getElementById("hawaStory");
  var photos = Array.prototype.slice.call(document.querySelectorAll("[data-story-image]"));
  var chapters = Array.prototype.slice.call(document.querySelectorAll("[data-story-chapter]"));
  var counter = document.getElementById("hawaStoryCounter");
  var progressBar = document.getElementById("hawaStoryProgress");
  var lastChapter = -1;
  var ticking = false;
  var motionAllowed = function () { return !motionOff.matches && !smallScreen.matches; };

  function updateStory() {
    ticking = false;
    if (!stage || !storyHost) return;
    if (!motionAllowed()) {
      chapters.forEach(function (node) { node.removeAttribute("aria-hidden"); });
      return;
    }
    var box = stage.getBoundingClientRect();
    var length = Math.max(box.height - window.innerHeight, 1);
    var amount = Math.max(0, Math.min(1, -box.top / length));
    var current = Math.min(chapters.length - 1, Math.floor(amount * chapters.length));
    if (progressBar) progressBar.style.width = (amount * 100).toFixed(1) + "%";
    if (current === lastChapter) return;
    lastChapter = current;
    photos.forEach(function (node, i) { node.classList.toggle("is-active", i === current); });
    chapters.forEach(function (node, i) {
      node.classList.toggle("is-active", i === current);
      node.setAttribute("aria-hidden", String(i !== current));
    });
    if (counter) counter.textContent = String(current + 1).padStart(2, "0") + " / 03";
  }
  function scheduleStory() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(updateStory); }
  }
  if (stage) {
    window.addEventListener("scroll", scheduleStory, { passive: true });
    window.addEventListener("resize", function () { lastChapter = -1; scheduleStory(); }, { passive: true });
    var mediaUpdate = function () {
      lastChapter = -1;
      if (!motionAllowed()) {
        photos.forEach(function (node,i) { node.classList.toggle("is-active", i === 0); });
        chapters.forEach(function (node,i) { node.classList.toggle("is-active", i === 0); node.removeAttribute("aria-hidden"); });
      }
      scheduleStory();
    };
    if (motionOff.addEventListener) { motionOff.addEventListener("change", mediaUpdate); smallScreen.addEventListener("change", mediaUpdate); }
    mediaUpdate();
  }

  /* User-controlled editorial spotlight: no autoplay, arrow-key navigation. */
  var slider = document.getElementById("hawaSpotlight");
  var slides = Array.prototype.slice.call(document.querySelectorAll("[data-spotlight]"));
  var prev = document.getElementById("hawaSpotlightPrev");
  var next = document.getElementById("hawaSpotlightNext");
  var count = document.getElementById("hawaSpotlightIndex");
  var currentSlide = 0;
  function showSlide(nextIndex) {
    if (!slides.length) return;
    currentSlide = (nextIndex + slides.length) % slides.length;
    slides.forEach(function (node,i) {
      var active = i === currentSlide;
      node.classList.toggle("is-active", active);
      node.setAttribute("aria-hidden", String(!active));
      node.inert = !active;
    });
    if (count) count.innerHTML = String(currentSlide + 1).padStart(2, "0") + ' <span>/ ' + String(slides.length).padStart(2, "0") + "</span>";
  }
  if (slider && slides.length) {
    if (prev) prev.addEventListener("click", function () { showSlide(currentSlide - 1); });
    if (next) next.addEventListener("click", function () { showSlide(currentSlide + 1); });
    slider.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") { event.preventDefault(); showSlide(currentSlide - 1); }
      if (event.key === "ArrowRight") { event.preventDefault(); showSlide(currentSlide + 1); }
    });
    showSlide(0);
  }

  /* Dialog has built-in Escape, focus containment, and returns focus on close. */
  var lightbox = document.getElementById("hawaLightbox");
  var lightboxImage = document.getElementById("hawaLightboxImg");
  var lightboxCaption = document.getElementById("hawaLightboxCaption");
  var lightboxClose = document.getElementById("hawaLightboxClose");
  if (lightbox && lightboxImage) {
    document.querySelectorAll("[data-gallery-open]").forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var img = trigger.querySelector("img");
        if (!img) return;
        lightboxImage.src = img.currentSrc || img.src;
        lightboxImage.alt = img.alt;
        var caption = trigger.closest("figure");
        if (lightboxCaption) lightboxCaption.textContent = caption && caption.querySelector("figcaption") ? caption.querySelector("figcaption").textContent : img.alt;
        if (typeof lightbox.showModal === "function") lightbox.showModal();
        else lightbox.setAttribute("open", "");
      });
    });
    if (lightboxClose) lightboxClose.addEventListener("click", function () { if (typeof lightbox.close === "function") lightbox.close(); else lightbox.removeAttribute("open"); });
    lightbox.addEventListener("click", function (event) { if (event.target === lightbox && typeof lightbox.close === "function") lightbox.close(); });
    lightbox.addEventListener("close", function () { lightboxImage.removeAttribute("src"); });
  }
})();
