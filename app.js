/* Hawa v3 — shared UI: nav, progress, reveal, to-top, year */
(function () {
  "use strict";
  var nav = document.getElementById("nav");
  var progress = document.getElementById("scrollProgress");
  var toTop = document.getElementById("toTop");
  var navLinks = document.querySelectorAll(".nav-link");

  function onScroll() {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 30);
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
    }
    if (toTop) toTop.classList.toggle("show", window.scrollY > 600);
    /* scroll-spy */
    var pos = window.scrollY + 160, current = null;
    document.querySelectorAll("section[id], main [id]").forEach(function () {});
    navLinks.forEach(function (l) {
      var href = l.getAttribute("href");
      if (href && href.startsWith("#")) {
        var sec = document.querySelector(href);
        if (sec && sec.offsetTop <= pos) current = href;
      }
    });
    navLinks.forEach(function (l) {
      l.classList.toggle("active", l.getAttribute("href") === (current || (location.pathname.endsWith("index.html") || location.pathname === "/" ? "#home" : null)));
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  var backdrop = document.getElementById("navBackdrop");
  function setMenu(open) {
    if (!links) return;
    links.classList.toggle("open", open);
    if (toggle) {
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
    }
    if (backdrop) backdrop.classList.toggle("show", open);
    document.body.style.overflow = open ? "hidden" : "";
  }
  if (toggle) toggle.addEventListener("click", function () { setMenu(!links.classList.contains("open")); });
  if (backdrop) backdrop.addEventListener("click", function () { setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  if (links) links.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  if (toTop) toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  var y = document.getElementById("year"); if (y) y.textContent = new Date().getFullYear();
  onScroll();
})();
