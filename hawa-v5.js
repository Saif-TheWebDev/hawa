/* HAWA / TYPE ART 05 — GSAP motion system
   Native scrolling is preserved. Motion is progressive enhancement only. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var nav = document.getElementById("v4Nav");
  var menuBtn = document.getElementById("v4MenuBtn");
  var navLinks = document.getElementById("v4NavLinks");
  var progress = document.getElementById("scrollProgress");
  var toTop = document.getElementById("toTop");
  var year = document.getElementById("year");
  var loader = document.getElementById("hawaLoader");

  if (year) year.textContent = new Date().getFullYear();

  function basicScrollUI() {
    var y = window.scrollY || 0;
    if (nav) nav.classList.toggle("is-solid", y > 42);
    if (progress) {
      var max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      progress.style.width = ((y / max) * 100).toFixed(2) + "%";
    }
    if (toTop) toTop.classList.toggle("show", y > 700);
  }
  window.addEventListener("scroll", basicScrollUI, { passive: true });
  window.addEventListener("resize", basicScrollUI, { passive: true });
  basicScrollUI();

  if (toTop) toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.style.overflow = open ? "hidden" : "";
    });
    if (navLinks) navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open menu");
        document.body.style.overflow = "";
      });
    });
  }

  function removeLoaderImmediately() {
    if (!loader) return;
    loader.style.display = "none";
    document.body.style.overflow = "";
  }

  if (!window.gsap || !window.ScrollTrigger || reduceMotion) {
    removeLoaderImmediately();
    document.querySelectorAll("[data-v4-fade]").forEach(function (el) {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    document.querySelectorAll(".v4-image-reveal").forEach(function (el) {
      el.style.clipPath = "none";
    });
    return;
  }

  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);

  /* ----- custom loader ----- */
  function playLoader() {
    if (!loader) return Promise.resolve();
    document.body.style.overflow = "hidden";
    var count = document.getElementById("hawaLoadCount");
    var bar = document.getElementById("hawaLoadBar");
    var state = { value: 0 };
    var seen = false;
    try { seen = sessionStorage.getItem("hawa-loader-seen") === "1"; } catch (e) {}
    var duration = seen ? .65 : 1.45;

    return new Promise(function (resolve) {
      var tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: function () {
          loader.classList.add("is-done");
          loader.style.display = "none";
          document.body.style.overflow = "";
          try { sessionStorage.setItem("hawa-loader-seen", "1"); } catch (e) {}
          resolve();
        }
      });
      tl.fromTo(".v4-loader__emblem", { scale: .62, rotate: -18, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, duration: .7 })
        .fromTo(".v4-loader__brand", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .55 }, "<.12")
        .to(state, {
          value: 100,
          duration: duration,
          ease: "power2.inOut",
          onUpdate: function () {
            if (count) count.textContent = String(Math.round(state.value)).padStart(2, "0");
          }
        }, "<.08")
        .to(bar, { width: "100%", duration: duration, ease: "power2.inOut" }, "<")
        .to(".v4-loader__panel--cream", { yPercent: -100, duration: .65, ease: "power4.inOut" }, "+=.08")
        .to(".v4-loader__core", { y: -18, opacity: 0, duration: .32 }, "<")
        .to(".v4-loader__panel", { yPercent: -100, duration: .78, ease: "power4.inOut" }, "<.09");
    });
  }

  var swooshPath = document.querySelector(".v4-hero__swoosh path");
  var swooshLength = swooshPath ? swooshPath.getTotalLength() : 0;
  if (swooshPath) {
    swooshPath.style.strokeDasharray = swooshLength;
    swooshPath.style.strokeDashoffset = swooshLength;
  }

  function heroIntro() {
    var tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.from(".v4-hero__title-line > span", { yPercent: 118, duration: 1.15, stagger: .09 });
    if (swooshPath) tl.to(swooshPath, { strokeDashoffset: 0, duration: 1.05, ease: "power3.out" }, "<.08");
    tl.to(".v4-hero [data-v4-fade]", { opacity: 1, y: 0, duration: .72, stagger: .08 }, "<.12")
      .from(".v4-circle-link", { scale: .72, opacity: 0, duration: .7 }, "<.15");
    return tl;
  }

  playLoader().then(function () {
    heroIntro();
    ScrollTrigger.refresh();
  });

  /* ----- hero depth ----- */
  gsap.to(".v4-hero__media", {
    yPercent: 12,
    scale: 1.04,
    ease: "none",
    scrollTrigger: { trigger: ".v4-hero", start: "top top", end: "bottom top", scrub: 1.1 }
  });
  gsap.to(".v4-hero__botanical", {
    yPercent: -22,
    rotate: 4,
    ease: "none",
    scrollTrigger: { trigger: ".v4-hero", start: "top top", end: "bottom top", scrub: 1.2 }
  });
  gsap.to(".v4-hero__title", {
    yPercent: -8,
    ease: "none",
    scrollTrigger: { trigger: ".v4-hero", start: "top top", end: "bottom top", scrub: 1.2 }
  });

  /* non-hero fade-ups stay tied to their own scroll position */
  gsap.utils.toArray("[data-v4-fade]").filter(function (el) {
    return !el.closest(".v4-hero");
  }).forEach(function (el) {
    gsap.to(el, {
      opacity: 1, y: 0, duration: .72, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 86%", once: true }
    });
  });

  /* keep the home navigation honest as sections change */
  var homeNavLinks = gsap.utils.toArray(".v4-nav__links a[href^='#']");
  homeNavLinks.forEach(function (link) {
    var target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    ScrollTrigger.create({
      trigger: target,
      start: "top center",
      end: "bottom center",
      onToggle: function (self) {
        if (!self.isActive) return;
        homeNavLinks.forEach(function (item) { item.classList.remove("active"); });
        link.classList.add("active");
      }
    });
  });

  /* ----- editorial reveals ----- */
  gsap.utils.toArray(".v4-story .v4-reveal-line").forEach(function (line, i) {
    gsap.from(line, {
      yPercent: 115,
      duration: 1.05,
      delay: i * .05,
      ease: "power4.out",
      scrollTrigger: { trigger: ".v4-story", start: "top 72%", once: true }
    });
  });

  gsap.utils.toArray(".v4-image-reveal").forEach(function (el) {
    gsap.to(el, {
      clipPath: "inset(0 0 0% 0)",
      duration: 1.25,
      ease: "power4.inOut",
      scrollTrigger: { trigger: el, start: "top 82%", once: true }
    });
  });

  gsap.from(".v4-story__card", {
    x: -70, y: 45, rotate: -13, opacity: 0, duration: 1.15, ease: "power4.out",
    scrollTrigger: { trigger: ".v4-story__art", start: "top 72%", once: true }
  });
  gsap.from(".v4-story__stamp", {
    scale: .4, rotate: -70, opacity: 0, duration: 1, ease: "back.out(1.4)",
    scrollTrigger: { trigger: ".v4-story__art", start: "top 65%", once: true }
  });
  gsap.to(".v4-story__photo img", {
    yPercent: -8, ease: "none",
    scrollTrigger: { trigger: ".v4-story", start: "top bottom", end: "bottom top", scrub: 1.1 }
  });

  /* ----- three-scene signature menu ----- */
  var dishScenes = gsap.utils.toArray("[data-v4-dish]");
  var dishCounter = document.getElementById("v4DishCounter");
  var activeDish = 0;

  function showDish(index) {
    if (!dishScenes.length || index === activeDish) return;
    var oldScene = dishScenes[activeDish];
    var newScene = dishScenes[index];
    gsap.killTweensOf([oldScene, newScene]);
    gsap.to(oldScene, { autoAlpha: 0, duration: .5, ease: "power2.inOut" });
    oldScene.setAttribute("aria-hidden", "true");
    newScene.removeAttribute("aria-hidden");
    gsap.fromTo(newScene, { autoAlpha: 0 }, { autoAlpha: 1, duration: .65, ease: "power2.inOut" });
    gsap.fromTo(newScene.querySelector("img"), { scale: 1.13 }, { scale: 1.06, duration: 1.2, ease: "power3.out" });
    gsap.fromTo(newScene.querySelector(".v4-dish-scene__content"), { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: .72, delay: .08 });
    activeDish = index;
    if (dishCounter) dishCounter.textContent = String(index + 1).padStart(2, "0");
  }

  if (dishScenes.length) {
    dishScenes.forEach(function (scene, i) {
      gsap.set(scene, { autoAlpha: i === 0 ? 1 : 0 });
      if (i !== 0) scene.setAttribute("aria-hidden", "true");
    });
    ScrollTrigger.create({
      trigger: ".v4-menu-showcase",
      start: "top top",
      end: "bottom bottom",
      onUpdate: function (self) {
        var index = Math.min(dishScenes.length - 1, Math.floor(self.progress * dishScenes.length));
        showDish(index);
      }
    });
  }

  /* ----- pinned horizontal gallery ----- */
  var gallery = document.querySelector(".v4-gallery");
  var rail = document.getElementById("v4GalleryRail");
  if (gallery && rail && window.innerWidth > 680) {
    var galleryTween = gsap.to(rail, {
      x: function () { return -(rail.scrollWidth - window.innerWidth); },
      ease: "none",
      scrollTrigger: {
        trigger: gallery,
        start: "top top",
        end: function () { return "+=" + Math.max(rail.scrollWidth - window.innerWidth, window.innerWidth); },
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });
    gsap.utils.toArray(".v4-gallery__panel img").forEach(function (img) {
      gsap.to(img, {
        xPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: img.closest(".v4-gallery__panel"),
          containerAnimation: galleryTween,
          start: "left right",
          end: "right left",
          scrub: true
        }
      });
    });
  }

  /* ----- gathering parallax ----- */
  gsap.to(".v4-gather__image img", {
    yPercent: -12,
    ease: "none",
    scrollTrigger: { trigger: ".v4-gather", start: "top bottom", end: "bottom top", scrub: 1.1 }
  });
  gsap.from(".v4-gather__copy > *", {
    y: 35, opacity: 0, duration: .8, stagger: .11, ease: "power3.out",
    scrollTrigger: { trigger: ".v4-gather__copy", start: "top 75%", once: true }
  });

  /* ----- visit kinetic type ----- */
  gsap.from(".v4-visit h2", {
    xPercent: -18, opacity: 0, duration: 1.1, ease: "power4.out",
    scrollTrigger: { trigger: ".v4-visit", start: "top 78%", once: true }
  });
  gsap.from(".v4-visit__meta > div", {
    y: 28, opacity: 0, duration: .7, stagger: .08, ease: "power3.out",
    scrollTrigger: { trigger: ".v4-visit__meta", start: "top 80%", once: true }
  });

  /* ----- magnetic buttons: tiny local response, desktop only ----- */
  if (window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
    document.querySelectorAll("[data-magnetic]").forEach(function (el) {
      el.addEventListener("pointermove", function (event) {
        var rect = el.getBoundingClientRect();
        var x = event.clientX - rect.left - rect.width / 2;
        var y = event.clientY - rect.top - rect.height / 2;
        gsap.to(el, { x: x * .16, y: y * .16, duration: .35, ease: "power2.out" });
      });
      el.addEventListener("pointerleave", function () {
        gsap.to(el, { x: 0, y: 0, duration: .55, ease: "elastic.out(1,.45)" });
      });
    });
  }

  /* reveal content on inner pages too */
  gsap.utils.toArray(".hawa-inner .reveal").forEach(function (el) {
    gsap.fromTo(el, { y: 28, opacity: 0 }, {
      y: 0, opacity: 1, duration: .72, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true }
    });
  });

  /* ----- v5 type-art choreography ----- */
  gsap.to(".v4-hero__wind", {
    xPercent: 7,
    yPercent: -8,
    ease: "none",
    scrollTrigger: { trigger: ".v4-hero", start: "top top", end: "bottom top", scrub: 1.25 }
  });

  var manifesto = document.querySelector(".v5-manifesto");
  if (manifesto) {
    gsap.from(".v5-manifesto__quote span", {
      yPercent: 115,
      opacity: 0,
      duration: 1.05,
      stagger: .09,
      ease: "power4.out",
      scrollTrigger: { trigger: manifesto, start: "top 72%", once: true }
    });
    gsap.fromTo(".v5-manifesto__line", { scaleX: 0 }, {
      scaleX: 1,
      duration: 1.15,
      ease: "power4.inOut",
      scrollTrigger: { trigger: manifesto, start: "top 68%", once: true }
    });
    gsap.from(".v5-manifesto__meta, .v5-manifesto__note", {
      y: 25,
      opacity: 0,
      duration: .75,
      stagger: .12,
      ease: "power3.out",
      scrollTrigger: { trigger: manifesto, start: "top 70%", once: true }
    });
    gsap.to(".v5-manifesto::before", {});
  }

  gsap.utils.toArray(".v4-dish-scene").forEach(function (scene) {
    var word = scene.querySelector(".v4-dish-scene__content");
    if (!word) return;
    gsap.to(scene, {
      "--v5-drift": "1",
      duration: .01,
      scrollTrigger: { trigger: scene, start: "top bottom" }
    });
  });

  gsap.to(".v4-gallery__intro h2", {
    xPercent: -5,
    ease: "none",
    scrollTrigger: { trigger: ".v4-gallery", start: "top bottom", end: "top top", scrub: 1 }
  });

  ScrollTrigger.refresh();
})();