/* Shared, semantic interface behavior. Food identity is never inferred from a photograph. */
(() => {
  "use strict";
  const $ = (s) => document.querySelector(s),
    $$ = (s) => [...document.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const header = $("#siteHeader"),
    nav = $("#primaryNav"),
    toggle = $("#menuToggle");
  function closeNav() {
    nav?.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
    toggle?.setAttribute("aria-label", "Open navigation");
  }
  toggle?.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation",
    );
    if (open) nav.querySelector("a").focus();
  });
  nav?.addEventListener("click", (e) => {
    if (e.target.closest("a")) closeNav();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav?.classList.contains("is-open")) {
      closeNav();
      toggle.focus();
    }
  });
  addEventListener("resize", () => {
    if (innerWidth > 760) closeNav();
  });
  $$(".primary-nav a").forEach((a) => {
    if (a.getAttribute("href") === location.pathname.split("/").pop())
      a.setAttribute("aria-current", "page");
  });
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
  function scrollHeader() {
    header?.classList.toggle("is-scrolled", scrollY > 20);
  }
  addEventListener("scroll", scrollHeader, { passive: true });
  scrollHeader();
  $$("dialog").forEach((d) => {
    d.addEventListener("click", (e) => {
      if (e.target === d) {
        const r = d.getBoundingClientRect();
        if (
          e.clientX < r.left ||
          e.clientX > r.right ||
          e.clientY < r.top ||
          e.clientY > r.bottom
        )
          d.close();
      }
    });
  });
  const featured = $("#featuredDishes"),
    detail = $("#dishDialog");
  const money = (n) => "৳" + n.toLocaleString("en-BD");
  if (featured && window.HAWA) {
    const ids = ["kacchi-biryani", "chicken-tikka", "sizzling-platter"];
    featured.innerHTML = ids
      .map((id) => {
        const m = HAWA.MENU.find((x) => x.id === id);
        return `<article class="featured-dish"><button type="button" data-detail="${id}">${m.img ? `<div class="dish-image"><img src="${m.img.replace(".webp", "-mobile.webp")}" width="1536" height="1024" loading="lazy" alt="${m.name} preview imagery"></div>` : '<div class="unpictured"><strong>For the<br>whole table.</strong><small>Dish photograph to come</small></div>'}<h3>${m.name}</h3><div class="featured-meta"><span>Listed ${money(m.price)}</span><span>Discover ↗</span></div></button></article>`;
      })
      .join("");
    featured.addEventListener("click", (e) => {
      const b = e.target.closest("[data-detail]");
      if (!b) return;
      const m = HAWA.MENU.find((x) => x.id === b.dataset.detail);
      $("#dishDetail").innerHTML =
        `${m.img ? `<img src="${m.img.replace(".webp", "-mobile.webp")}" width="1536" height="1024" alt="Existing food preview image">` : ""}<p class="eyebrow">FROM THE EXISTING MENU</p><h2 id="dishTitle">${m.name}</h2><p>${m.desc}</p><p class="detail-price">Listed ${money(m.price)}</p><p class="detail-note">Confirm current price, portion and availability with Hawa.${m.img ? " Food image awaiting identity approval." : " Unique dish photography needed."}</p><button type="button" class="button button--dark" id="detailAdd">Add to request +</button><p id="detailStatus" role="status"></p>`;
      detail.showModal();
      $("#detailAdd").onclick = () => {
        HAWA.addToCart(m.id);
        const item = HAWA.getCart().find((x) => x.id === m.id);
        $("#detailStatus").textContent = `${item.qty} in your selection.`;
      };
    });
    $("[data-close-detail]").onclick = () => detail.close();
  }
  const stage = $("#storyStage"),
    story = $("#aromaStory");
  if (stage) {
    let frame = 0,
      px = 0,
      py = 0,
      paused = false;
    const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    const smooth = (a, b, v) => {
      const t = clamp((v - a) / (b - a));
      return t * t * (3 - 2 * t);
    };
    function draw() {
      frame = 0;
      const mobile = innerWidth <= 760;
      const progress = reduced.matches
        ? 0
        : clamp(
            -story.getBoundingClientRect().top /
              Math.max(1, story.offsetHeight - innerHeight),
          );
      const table = smooth(0.48, 0.95, progress);
      const drift = Math.sin(progress * Math.PI);
      stage.style.setProperty("--p", progress);
      stage.style.setProperty("--table", table);
      stage.style.setProperty(
        "--food-x",
        `${(mobile ? -8 : -60) * progress + (paused ? 0 : px * 7)}px`,
      );
      stage.style.setProperty(
        "--food-y",
        `${(mobile ? 35 : 10) * progress + (paused ? 0 : py * 6) - drift * 24}px`,
      );
      stage.style.setProperty("--food-r", `${-9 + progress * 8}deg`);
      stage.style.setProperty(
        "--food-scale",
        1 + drift * 0.045 - progress * (mobile ? 0.18 : 0.3),
      );
      const weights = [
        1 - smooth(0.23, 0.4, progress),
        smooth(0.25, 0.42, progress) * (1 - smooth(0.6, 0.73, progress)),
        smooth(0.63, 0.79, progress),
      ];
      ["openingCopy", "aromaCopy", "tableCopy"].forEach((id, i) => {
        const el = document.getElementById(id),
          visible = weights[i] > 0.01;
        el.style.opacity = weights[i];
        el.style.visibility = visible ? "visible" : "hidden";
        el.inert = weights[i] < 0.5;
        el.setAttribute("aria-hidden", String(weights[i] < 0.5));
      });
      $$(".chapter-dots i").forEach((el, i) =>
        el.classList.toggle(
          "active",
          i === (progress < 0.32 ? 0 : progress < 0.7 ? 1 : 2),
        ),
      );
      dispatchEvent(
        new CustomEvent("hawa:scene", {
          detail: {
            progress,
            table,
            px: paused ? 0 : px,
            py: paused ? 0 : py,
            reduced: reduced.matches,
          },
        }),
      );
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(draw);
    }
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    stage.addEventListener("pointermove", (e) => {
      if (e.pointerType === "mouse" && !reduced.matches) {
        px = e.clientX / innerWidth - 0.5;
        py = e.clientY / innerHeight - 0.5;
        schedule();
      }
    });
    stage.addEventListener("pointerleave", () => {
      px = py = 0;
      schedule();
    });
    $("#motionToggle").onclick = () => {
      paused = !paused;
      stage.classList.toggle("atmosphere-paused", paused);
      $("#motionToggle").setAttribute("aria-pressed", String(paused));
      $("#motionToggle").textContent = paused
        ? "Resume atmosphere"
        : "Pause atmosphere";
      schedule();
    };
    addEventListener("hawa:scene-ready", schedule);
    draw();
  }
  // Handle errors that happened before deferred UI code as well as later failures.
  $$("img").forEach((img) => {
    const failed = () => {
      if (img.dataset.failed) return;
      img.dataset.failed = "true";
      img.style.visibility = "hidden";
      const note = document.createElement("span");
      note.className = "image-error";
      note.textContent = "Image unavailable";
      img.parentElement.append(note);
    };
    img.addEventListener("error", failed, { once: true });
    if (img.complete && !img.naturalWidth) failed();
  });
})();
