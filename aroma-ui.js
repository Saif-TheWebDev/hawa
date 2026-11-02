/* Shared, semantic interface behavior. Food identity is never inferred from a photograph. */
(() => {
  "use strict";
  const $ = (s) => document.querySelector(s),
    $$ = (s) => [...document.querySelectorAll(s)];

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
    const ids = ["kacchi-biryani", "sizzling-platter", "beef-roast"];
    featured.innerHTML = ids
      .map((id) => {
        const m = HAWA.MENU.find((x) => x.id === id);
        return `<article class="featured-dish"><button class="featured-photo" type="button" data-detail="${id}" aria-label="Take a closer look ↗: ${m.name}"><img src="${m.img.replace(".webp", "-small.webp")}" width="1536" height="1024" loading="lazy" alt="AI-created ${m.name} illustration"><span>TAKE A CLOSER LOOK ↗</span></button><div class="featured-info"><p>${m.cat === "rice" ? "RICE & BIRYANI" : m.cat === "grill" ? "FROM THE GRILL" : "SLOW & SPICED"}</p><div class="featured-title"><h3>${m.name}</h3><strong>${money(m.price)}</strong></div><div class="featured-bottom"><button class="dish-more" data-detail="${id}" type="button">Dish details ↗</button><button class="featured-add" data-feature-add="${id}" type="button">Add to request +</button></div></div></article>`;
      })
      .join("");
    featured.addEventListener("click", (e) => {
      const add = e.target.closest("[data-feature-add]");
      if (add) {
        const m = HAWA.MENU.find((x) => x.id === add.dataset.featureAdd);
        HAWA.addToCart(m.id);
        HAWA.toast(m.name + " added to your request");
        return;
      }
      const b = e.target.closest("[data-detail]");
      if (!b) return;
      const m = HAWA.MENU.find((x) => x.id === b.dataset.detail);
      $("#dishDetail").innerHTML =
        `${m.img ? `<img src="${m.generated ? m.img.replace(".webp", "-small.webp") : m.img}" width="1536" height="1024" alt="Illustrative food image">` : ""}<p class="eyebrow">FROM THE HAWA MENU</p><h2 id="dishTitle">${m.name}</h2><p>${m.desc}</p><p class="detail-price">Listed ${money(m.price)}</p><p class="detail-note">Confirm current price, portion and availability with Hawa.${m.img ? " Illustrative food image; actual presentation may vary." : ""}</p><button type="button" class="button button--dark" id="detailAdd">Add to request +</button><p id="detailStatus" role="status"></p>`;
      detail.showModal();
      $("#detailAdd").onclick = () => {
        HAWA.addToCart(m.id);
        const item = HAWA.getCart().find((x) => x.id === m.id);
        $("#detailStatus").textContent = `${item.qty} in your selection.`;
      };
    });
    $("[data-close-detail]").onclick = () => detail.close();
  }
  // Capture failures for images created later by filters or dish details, too.
  function failedImage(img) {
    if (img.dataset.failed) return;
    img.dataset.failed = "true";
    img.style.visibility = "hidden";
    const note = document.createElement("span");
    note.className = "image-error";
    note.textContent = "Image unavailable";
    img.parentElement.append(note);
  }
  document.addEventListener(
    "error",
    (e) => {
      if (e.target instanceof HTMLImageElement) failedImage(e.target);
    },
    true,
  );
  $$("img").forEach((img) => {
    if (img.complete && !img.naturalWidth) failedImage(img);
  });
})();
