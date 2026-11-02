/* HAWA / DEPTH 03 — requestAnimationFrame parallax.
   Scroll is never hijacked. Pointer depth runs only on fine pointers.
   Reduced-motion disables all transforms. */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  var coarse = window.matchMedia("(pointer: coarse)");
  var small = window.matchMedia("(max-width: 680px)");
  var hero = document.querySelector(".hawa-hero");
  var heroPhoto = document.querySelector(".hawa-hero__photo");
  var heroCopy = document.querySelector(".hawa-hero__copy");
  var heroEdge = document.querySelector(".hawa-hero__edge");
  var story = document.getElementById("story");
  var storyPhotos = document.querySelector(".hawa-story__photos");
  var spotlightFigures = Array.prototype.slice.call(document.querySelectorAll(".hawa-spotlight__slide figure"));
  var galleryTriggers = Array.prototype.slice.call(document.querySelectorAll(".hawa-gallery-trigger"));
  var gatherImage = document.querySelector(".gather-image");
  var outro = document.querySelector(".hawa-outro");
  var outroSignature = document.querySelector(".hawa-outro__signature");
  var menuBanner = document.querySelector(".hawa-menu-banner__image");
  var cards = Array.prototype.slice.call(document.querySelectorAll(".dish-card"));
  var raf = 0;
  var pointerRaf = 0;
  var px = 0, py = 0, targetPx = 0, targetPy = 0;

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function centeredProgress(el) {
    if (!el) return 0;
    var rect = el.getBoundingClientRect();
    var center = rect.top + rect.height / 2;
    var viewport = window.innerHeight / 2;
    return clamp((viewport - center) / Math.max(window.innerHeight, 1), -1.2, 1.2);
  }

  function setPx(el, name, value) {
    if (el) el.style.setProperty(name, value.toFixed(2) + "px");
  }

  function updateScrollDepth() {
    raf = 0;
    if (reduce.matches) return;

    if (hero && heroPhoto) {
      var rect = hero.getBoundingClientRect();
      var p = clamp(-rect.top / Math.max(rect.height, 1), 0, 1);
      var heroY = p * 92;
      setPx(heroPhoto, "--hawa-depth-y", heroY);
      setPx(heroPhoto, "--hawa-depth-y-mobile", heroY * .55);
      setPx(heroCopy, "--hawa-copy-depth-y", -p * 26);
      setPx(heroEdge, "--hawa-edge-depth-y", -p * 54);
    }

    if (story && storyPhotos && !small.matches) {
      var srect = story.getBoundingClientRect();
      var travel = Math.max(srect.height - window.innerHeight, 1);
      var sp = clamp(-srect.top / travel, 0, 1);
      setPx(storyPhotos, "--hawa-story-depth", (sp - .5) * 82);
    }

    spotlightFigures.forEach(function (figure) {
      setPx(figure, "--hawa-depth-y", centeredProgress(figure) * 42);
    });

    galleryTriggers.forEach(function (trigger) {
      setPx(trigger, "--hawa-depth-y", centeredProgress(trigger) * 30);
    });

    if (gatherImage) setPx(gatherImage, "--hawa-depth-y", centeredProgress(gatherImage) * 24);
    if (menuBanner) setPx(menuBanner, "--hawa-depth-y", centeredProgress(menuBanner) * 26);

    if (outro && outroSignature) {
      var op = centeredProgress(outro);
      setPx(outroSignature, "--hawa-depth-x", op * -58);
      setPx(outro, "--hawa-orbit-x", op * 36);
      setPx(outro, "--hawa-orbit-y", op * 22);
    }
  }

  function scheduleScrollDepth() {
    if (!raf) raf = window.requestAnimationFrame(updateScrollDepth);
  }

  function updatePointerDepth() {
    pointerRaf = 0;
    px += (targetPx - px) * .085;
    py += (targetPy - py) * .085;

    if (hero) {
      setPx(hero, "--hawa-photo-pointer-x", px * 16);
      setPx(hero, "--hawa-photo-pointer-y", py * 12);
      setPx(hero, "--hawa-copy-pointer-x", px * -5);
      setPx(hero, "--hawa-copy-pointer-y", py * -4);
      setPx(hero, "--hawa-glow-x", px * 7);
      setPx(hero, "--hawa-glow-y", py * 6);
    }

    spotlightFigures.forEach(function (figure) {
      setPx(figure, "--hawa-shine-x", px * 9);
    });

    if (Math.abs(targetPx - px) > .002 || Math.abs(targetPy - py) > .002) {
      pointerRaf = window.requestAnimationFrame(updatePointerDepth);
    }
  }

  function schedulePointerDepth() {
    if (!pointerRaf) pointerRaf = window.requestAnimationFrame(updatePointerDepth);
  }

  function onPointerMove(event) {
    if (reduce.matches || coarse.matches) return;
    targetPx = clamp((event.clientX / Math.max(window.innerWidth, 1) - .5) * 2, -1, 1);
    targetPy = clamp((event.clientY / Math.max(window.innerHeight, 1) - .5) * 2, -1, 1);
    schedulePointerDepth();
  }

  function resetPointer() {
    targetPx = 0;
    targetPy = 0;
    schedulePointerDepth();
  }

  /* Very low-amplitude perspective on food cards: pointer-only and local. */
  function attachCardTilt(card) {
    if (coarse.matches || reduce.matches) return;
    card.addEventListener("pointermove", function (event) {
      var rect = card.getBoundingClientRect();
      var nx = clamp((event.clientX - rect.left) / Math.max(rect.width, 1), 0, 1);
      var ny = clamp((event.clientY - rect.top) / Math.max(rect.height, 1), 0, 1);
      card.style.setProperty("--hawa-tilt-y", ((nx - .5) * 3.2).toFixed(2) + "deg");
      card.style.setProperty("--hawa-tilt-x", ((.5 - ny) * 2.4).toFixed(2) + "deg");
    });
    card.addEventListener("pointerleave", function () {
      card.style.setProperty("--hawa-tilt-y", "0deg");
      card.style.setProperty("--hawa-tilt-x", "0deg");
    });
  }

  function resetAll() {
    if (!reduce.matches) return;
    [hero, heroPhoto, heroCopy, heroEdge, storyPhotos, gatherImage, outro, outroSignature, menuBanner]
      .filter(Boolean)
      .forEach(function (node) { node.removeAttribute("style"); });
    spotlightFigures.concat(galleryTriggers).forEach(function (node) {
      node.style.removeProperty("--hawa-depth-y");
      node.style.removeProperty("--hawa-shine-x");
    });
  }

  window.addEventListener("scroll", scheduleScrollDepth, { passive: true });
  window.addEventListener("resize", scheduleScrollDepth, { passive: true });
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  document.documentElement.addEventListener("mouseleave", resetPointer);

  if (reduce.addEventListener) reduce.addEventListener("change", function () { resetAll(); scheduleScrollDepth(); });
  if (small.addEventListener) small.addEventListener("change", scheduleScrollDepth);

  cards.forEach(attachCardTilt);
  updateScrollDepth();
})();
