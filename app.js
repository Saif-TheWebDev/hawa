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
    /* Keep the actual page active, and use section anchors only on home. */
    var path = location.pathname.split("/").pop() || "index.html";
    var current = path === "index.html" ? "index.html" : path;
    if (path === "index.html") {
      var pos = window.scrollY + 160;
      navLinks.forEach(function (link) {
        var href = link.getAttribute("href");
        if (href && href.charAt(0) === "#") {
          var sec = document.getElementById(href.slice(1));
          if (sec && sec.offsetTop <= pos) current = href;
        }
      });
    }
    navLinks.forEach(function (link) {
      var active = link.getAttribute("href") === current;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
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
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    if (backdrop) backdrop.classList.toggle("show", open);
    document.body.style.overflow = open ? "hidden" : "";
  }
  if (toggle) toggle.addEventListener("click", function () { setMenu(!links.classList.contains("open")); });
  if (backdrop) backdrop.addEventListener("click", function () { setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  if (links) links.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });

  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.add("visible"); io.unobserve(entry.target); } });
    }, { threshold: 0.08, rootMargin: "0px 0px -25px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }

  if (toTop) toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  var y = document.getElementById("year"); if (y) y.textContent = new Date().getFullYear();
  onScroll();
})();
