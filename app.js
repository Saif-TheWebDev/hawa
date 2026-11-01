/* Hawa — interactions (nav, reveals, counters, menu filter,
   gallery lightbox, reviews slider, open-now pill, copy, to-top) */
(function () {
  "use strict";

  /* ---------- Nav: scrolled state, progress bar, to-top ---------- */
  var nav = document.getElementById("nav");
  var progress = document.getElementById("scrollProgress");
  var toTop = document.getElementById("toTop");
  function onScroll() {
    nav.classList.toggle("scrolled", window.scrollY > 40);
    var h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
    toTop.classList.toggle("show", window.scrollY > 600);
    highlightSection();
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  var backdrop = document.getElementById("navBackdrop");
  function setMenu(open) {
    links.classList.toggle("open", open);
    toggle.classList.toggle("open", open);
    backdrop.classList.toggle("show", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  }
  toggle.addEventListener("click", function () { setMenu(!links.classList.contains("open")); });
  backdrop.addEventListener("click", function () { setMenu(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { setMenu(false); closeLightbox(); }
  });
  links.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { setMenu(false); });
  });

  /* ---------- Active nav link on scroll ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
  var sections = navLinks
    .map(function (l) { return document.querySelector(l.getAttribute("href")); })
    .filter(Boolean);
  function highlightSection() {
    var pos = window.scrollY + 140;
    var current = sections[0];
    sections.forEach(function (s) { if (s.offsetTop <= pos) current = s; });
    navLinks.forEach(function (l) {
      l.classList.toggle("active", current && l.getAttribute("href") === "#" + current.id);
    });
  }

  /* ---------- Scroll reveal with stagger ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  /* ---------- Animated counters ---------- */
  var counterIo = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target, target = +el.dataset.count, suffix = el.dataset.suffix || "";
      var start = null, dur = 1400;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      counterIo.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll(".stat-num").forEach(function (el) { counterIo.observe(el); });

  /* ---------- Menu category filter ---------- */
  var tabs = document.querySelectorAll(".menu-tab");
  var cards = document.querySelectorAll("#menuGrid .menu-card");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.classList.remove("active"); t.setAttribute("aria-selected", "false"); });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      var f = tab.dataset.filter;
      cards.forEach(function (c) {
        var show = f === "all" || c.dataset.cat === f;
        c.classList.toggle("hidden", !show);
        if (show) { c.classList.add("visible"); }
      });
    });
  });

  /* ---------- Gallery lightbox ---------- */
  var lightbox = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbCap = document.getElementById("lbCap");
  var items = Array.prototype.slice.call(document.querySelectorAll(".gallery-item"));
  var current = 0;
  function showItem(i) {
    current = (i + items.length) % items.length;
    lbImg.src = items[current].dataset.full;
    lbImg.alt = items[current].querySelector("img").alt;
    lbCap.textContent = items[current].dataset.caption || "";
  }
  function openLightbox(i) { showItem(i); lightbox.hidden = false; document.body.style.overflow = "hidden"; }
  function closeLightbox() { lightbox.hidden = true; document.body.style.overflow = ""; }
  items.forEach(function (it, i) { it.addEventListener("click", function () { openLightbox(i); }); });
  document.getElementById("lbClose").addEventListener("click", closeLightbox);
  document.getElementById("lbPrev").addEventListener("click", function () { showItem(current - 1); });
  document.getElementById("lbNext").addEventListener("click", function () { showItem(current + 1); });
  lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", function (e) {
    if (lightbox.hidden) return;
    if (e.key === "ArrowLeft") showItem(current - 1);
    if (e.key === "ArrowRight") showItem(current + 1);
  });

  /* ---------- Reviews slider ---------- */
  var slides = Array.prototype.slice.call(document.querySelectorAll("#slides .slide"));
  var dotsWrap = document.getElementById("dots");
  var idx = 0, timer = null;
  slides.forEach(function (_, i) {
    var d = document.createElement("button");
    d.className = "dot" + (i === 0 ? " active" : "");
    d.setAttribute("aria-label", "Go to review " + (i + 1));
    d.addEventListener("click", function () { go(i); restart(); });
    dotsWrap.appendChild(d);
  });
  var dots = Array.prototype.slice.call(dotsWrap.children);
  function go(i) {
    idx = (i + slides.length) % slides.length;
    slides.forEach(function (s, n) { s.classList.toggle("active", n === idx); });
    dots.forEach(function (d, n) { d.classList.toggle("active", n === idx); });
  }
  function restart() { clearInterval(timer); timer = setInterval(function () { go(idx + 1); }, 6000); }
  document.getElementById("prevSlide").addEventListener("click", function () { go(idx - 1); restart(); });
  document.getElementById("nextSlide").addEventListener("click", function () { go(idx + 1); restart(); });
  var slider = document.getElementById("slider");
  slider.addEventListener("mouseenter", function () { clearInterval(timer); });
  slider.addEventListener("mouseleave", restart);
  var touchX = null;
  slider.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener("touchend", function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) { go(idx + (dx < 0 ? 1 : -1)); restart(); }
    touchX = null;
  }, { passive: true });
  restart();

  /* ---------- Open-now pill (listed 24/7) ---------- */
  function updateOpen() {
    var open = true; // Google Maps & Facebook list Hawa as always open
    document.querySelectorAll(".open-pill").forEach(function (p) {
      p.textContent = open ? "Open now" : "Closed";
      p.style.color = open ? "var(--green)" : "#f87171";
    });
  }
  updateOpen();

  /* ---------- Copy to clipboard + toast ---------- */
  var toast = document.getElementById("toast");
  var toastTimer = null;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 2200);
  }
  document.querySelectorAll("[data-copy]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      if (el.tagName === "A" && el.getAttribute("href") && el.getAttribute("href").startsWith("tel:")) return; // let call links work
      var text = el.dataset.copy;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { showToast("Copied: " + text); })
          .catch(function () { showToast(text); });
      } else { showToast(text); }
    });
  });

  /* ---------- Back to top ---------- */
  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Hero parallax ---------- */
  var heroBg = document.getElementById("heroBg");
  window.addEventListener("scroll", function () {
    if (window.scrollY < window.innerHeight && heroBg) {
      heroBg.style.translate = "0 " + window.scrollY * 0.25 + "px";
    }
  }, { passive: true });

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  onScroll();
})();
