/* ============================================================
   HAWA SHOP ENGINE — menu data, cart (localStorage), checkout,
   WhatsApp enquiry handoff. No fake order confirmation or rider tracking.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Menu data ---------- */
  var IMG = {
    biryani: "https://raw.githubusercontent.com/Saif-TheWebDev/hawa/49137b22867bd2de13409fc429922b8b724df001/assets/dish-biryani.jpg",
    grill: "https://raw.githubusercontent.com/Saif-TheWebDev/hawa/49137b22867bd2de13409fc429922b8b724df001/assets/dish-grill.jpg",
    hall: "https://raw.githubusercontent.com/Saif-TheWebDev/hawa/49137b22867bd2de13409fc429922b8b724df001/assets/hero.jpg"
  };

  var MENU = [
    { id: "beef-roast", name: "Beef Roast", bn: "বиф রোস্ট", price: 650, cat: "curry", emoji: "🥩", color: "#7a2e12", desc: "Spicy, slow-cooked beef — the house favourite that keeps Mymensingh coming back.", spicy: 2, popular: true },
    { id: "chicken-korma", name: "Chicken Korma", bn: "চিকেন কারি", price: 480, cat: "curry", emoji: "🍗", color: "#a8641c", desc: "Tender chicken in a golden, creamy masala gravy. Mild, rich and comforting.", spicy: 1 },
    { id: "masala-bhuna", name: "Masala Bhuna", bn: "মسلা ভুনা", price: 550, cat: "curry", emoji: "🌶️", color: "#8f1d0c", desc: "A fiery, deeply spiced meat dish for those who like real heat.", spicy: 3, popular: true },
    { id: "ilish-fry", name: "Ilish (Hilsa) Fry", bn: "ইলিশ ভাজা", price: 0, seasonal: true, cat: "curry", emoji: "🐟", color: "#1c5d6e", desc: "Bangladesh's national fish, fried crisp with mustard. Market price, best in season.", spicy: 1 },
    { id: "kacchi-biryani", name: "Kacchi Biryani (Mutton)", bn: "কacchi বিরিয়ানি", price: 420, cat: "rice", emoji: "🍚", color: "#b3541e", img: IMG.biryani, desc: "Saffron basmati, marinated mutton, fried onion & boiled egg — the traditional way.", popular: true, pick: true },
    { id: "chicken-biryani", name: "Chicken Biryani", bn: "চিকেন বিরিয়ানি", price: 320, cat: "rice", emoji: "🍗", color: "#c07a1f", desc: "Classic comfort biryani served with borhani, raita & salad.", spicy: 1 },
    { id: "polao", name: "Polao & Roast", bn: "পোলাও", price: 300, cat: "rice", emoji: "🍛", color: "#8a6d1f", desc: "Fragrant polao with beef/chicken roast — the ultimate Mymensingh combo." },
    { id: "chicken-tikka", name: "Chicken Tikka", bn: "টিক্কা", price: 380, cat: "grill", emoji: "🍢", color: "#a33c10", img: IMG.grill, desc: "Charcoal-grilled, yogurt-marinated, smoky & juicy.", spicy: 2, popular: true },
    { id: "seekh-kebab", name: "Beef Seekh Kebab", bn: "বিফ কাবাব", price: 450, cat: "grill", emoji: "🥩", color: "#6e2a0e", desc: "Hand-minced beef kebab straight off the charcoal, with green chutney.", spicy: 2 },
    { id: "sizzling-platter", name: "Sizzling Platter", bn: "সিজলিং", price: 1200, cat: "grill", emoji: "🔥", color: "#991f0a", img: IMG.grill, desc: "Mixed grill for the table — tikka, kebab & wings on a hot iron plate.", popular: true },
    { id: "fried-rice", name: "Chicken Fried Rice", bn: "ফ্রাইড রাইস", price: 260, cat: "asian", emoji: "🍜", color: "#3d6b1f", desc: "Wok-fried rice with egg, veggies & soy glaze.", spicy: 1 },
    { id: "chowmein", name: "Chowmein", bn: "নুডলস", price: 280, cat: "asian", emoji: "🥡", color: "#556b1f", desc: "Stir-fried noodles with chicken & crunchy vegetables." },
    { id: "thai-curry", name: "Thai Green Curry", bn: "থাই কারি", price: 520, cat: "asian", emoji: "🥥", color: "#2f6e46", desc: "Coconut curry with basil, bamboo shoots & your choice of protein.", spicy: 2 },
    { id: "firni", name: "Firni", bn: "ফিরনি", price: 120, cat: "sweet", emoji: "🍮", color: "#8a6d3f", desc: "Creamy rice-pudding dessert, chilled & lightly sweet." },
    { id: "borhani", name: "Borhani & Juices", bn: "বোরহানি ও জুস", price: 60, cat: "sweet", emoji: "🥤", color: "#1f6e5e", desc: "Spiced mint yogurt drink & fresh juices — the perfect cool-down after spice." }
  ];

  var CATS = [
    { id: "all", label: "⭐ All", emoji: "⭐" },
    { id: "grill", label: "🔥 Grill", emoji: "🔥" },
    { id: "curry", label: "🍛 Curries & Roasts", emoji: "🍛" },
    { id: "rice", label: "🍚 Rice & Biryani", emoji: "🍚" },
    { id: "asian", label: "🥡 Chinese & Thai", emoji: "🥡" },
    { id: "sweet", label: "🍰 Sweet & Drinks", emoji: "🍰" }
  ];

  /* Delivery prices, discounts and payment must be confirmed by Hawa. */

  /* ---------- Cart store ---------- */
  var CART_KEY = "hawa_cart_v1";
  function getCart() { try { var data = JSON.parse(localStorage.getItem(CART_KEY)) || []; return Array.isArray(data) ? data.filter(function (i) { return i && MENU.some(function (m) { return m.id === i.id; }) && Number.isInteger(i.qty) && i.qty > 0; }).map(function (i) { return { id: i.id, qty: Math.min(i.qty, 50) }; }) : []; } catch (e) { return []; } }
  function saveCart(c) { localStorage.setItem(CART_KEY, JSON.stringify(c)); window.dispatchEvent(new CustomEvent("hawa:cart")); }
  function addToCart(id) {
    var c = getCart(), found = c.find(function (i) { return i.id === id; });
    if (found) found.qty++; else c.push({ id: id, qty: 1 });
    saveCart(c); return c;
  }
  function setQty(id, qty) {
    var c = getCart().filter(function (i) { return i.id !== id; });
    if (qty > 0) c.push({ id: id, qty: Math.min(qty, 50) });
    saveCart(c);
  }
  function removeFromCart(id) { saveCart(getCart().filter(function (i) { return i.id !== id; })); }
  function cartCount() { return getCart().reduce(function (s, i) { return s + i.qty; }, 0); }
  function cartSubtotal() {
    return getCart().reduce(function (s, i) {
      var m = MENU.find(function (x) { return x.id === i.id; });
      return s + (m ? m.price * i.qty : 0);
    }, 0);
  }
  function getItem(id) { return MENU.find(function (x) { return x.id === id; }); }
  function money(n) { return "৳" + n.toLocaleString("en-BD"); }

  /* ---------- Toast ---------- */
  var toastEl = null, toastTimer = null;
  function toast(msg) {
    if (!toastEl) toastEl = document.getElementById("toast");
    if (!toastEl) return;
    toastEl.textContent = msg; toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 2200);
  }

  /* ---------- Cart badge (all pages) ---------- */
  function updateBadge() {
    var b = document.getElementById("cartCount");
    if (b) { var n = cartCount(); b.textContent = n; b.style.display = n ? "flex" : "none"; }
    var bar = document.getElementById("cartBar");
    if (bar) {
      var n2 = cartCount();
      if (n2) {
        bar.classList.add("show");
        bar.querySelector(".total").textContent = money(cartSubtotal());
        bar.querySelector(".cnt").textContent = n2 + (n2 === 1 ? " item" : " items");
      } else bar.classList.remove("show");
    }
  }
  window.addEventListener("hawa:cart", updateBadge);

  /* ---------- Cart drawer (menu page) ---------- */
  function openDrawer() { var d = document.getElementById("cartDrawer"); if (d) { renderDrawer(); d.classList.add("open"); document.getElementById("drawerBackdrop").classList.add("show"); document.body.style.overflow = "hidden"; var close = document.getElementById("drawerClose"); if (close) close.focus(); } }
  function closeDrawer() { var d = document.getElementById("cartDrawer"); if (d && d.classList.contains("open")) { d.classList.remove("open"); document.getElementById("drawerBackdrop").classList.remove("show"); document.body.style.overflow = ""; var trigger = document.getElementById("drawerBtn"); if (trigger) trigger.focus(); } }
  function renderDrawer() {
    var body = document.getElementById("drawerBody"), foot = document.getElementById("drawerFoot");
    var c = getCart();
    if (!c.length) {
      body.innerHTML = '<div class="cart-empty"><div class="big">🛒</div><p>Your cart is empty.<br>Add something delicious!</p></div>';
      foot.style.display = "none"; return;
    }
    foot.style.display = "block";
    body.innerHTML = c.map(function (i) {
      var m = getItem(i.id); if (!m) return "";
      return '<div class="cart-item">' +
        '<div class="ci-emoji" style="background:' + m.color + '">' + m.emoji + '</div>' +
        '<div class="ci-info"><h4>' + m.name + '</h4><div class="ci-price">' + (m.price ? money(m.price) : "Seasonal") + " each</div>" +
        '<div class="ci-controls"><button class="qty-btn" data-dec="' + m.id + '" aria-label="Remove one ' + m.name + '">−</button><span class="qty-val">' + i.qty + '</span><button class="qty-btn" data-inc="' + m.id + '" aria-label="Add one ' + m.name + '">+</button></div></div>' +
        '<button class="ci-remove" data-rm="' + m.id + '" aria-label="Remove ' + m.name + '">🗑️</button></div>';
    }).join("");
    var sub = cartSubtotal();
    document.getElementById("sumSub").textContent = money(sub);
    document.getElementById("sumFee").textContent = "Ask Hawa";
    document.getElementById("sumTotal").textContent = money(sub) + " + delivery";
    body.querySelectorAll("[data-inc]").forEach(function (b) { b.onclick = function () { var it = getCart().find(function (i) { return i.id === b.dataset.inc; }); setQty(b.dataset.inc, it.qty + 1); renderDrawer(); }; });
    body.querySelectorAll("[data-dec]").forEach(function (b) { b.onclick = function () { var it = getCart().find(function (i) { return i.id === b.dataset.dec; }); setQty(b.dataset.dec, it.qty - 1); renderDrawer(); }; });
    body.querySelectorAll("[data-rm]").forEach(function (b) { b.onclick = function () { removeFromCart(b.dataset.rm); renderDrawer(); }; });
  }

  /* ---------- Menu page rendering ---------- */
  var activeCat = "all", query = "";
  function renderCats() {
    var el = document.getElementById("catList"); if (!el) return;
    el.innerHTML = CATS.map(function (c) {
      return '<button class="cat-btn' + (c.id === activeCat ? " active" : "") + '" data-cat="' + c.id + '">' + c.label + '</button>';
    }).join("");
    el.querySelectorAll(".cat-btn").forEach(function (b) {
      b.onclick = function () { activeCat = b.dataset.cat; renderCats(); renderMenu(); };
    });
  }
  function renderMenu() {
    var grid = document.getElementById("dishGrid"); if (!grid) return;
    var q = query.trim().toLowerCase();
    var items = MENU.filter(function (m) {
      var inCat = activeCat === "all" || m.cat === activeCat;
      var inQ = !q || m.name.toLowerCase().indexOf(q) > -1 || (m.bn && m.bn.toLowerCase().indexOf(q) > -1);
      return inCat && inQ;
    });
    document.getElementById("resultCount").textContent = items.length + (items.length === 1 ? " dish" : " dishes");
    if (!items.length) { grid.innerHTML = '<div class="panel" style="grid-column:1/-1;text-align:center"><h2 class="display h-md">Nothing on this page yet.</h2><p>Try another search or browse all categories.</p><button type="button" class="btn btn-ghost" id="clearSearch" style="margin-top:20px">Show all dishes</button></div>'; document.getElementById("clearSearch").onclick = function () { query = ""; activeCat = "all"; var input = document.getElementById("searchInput"); if (input) input.value = ""; renderCats(); renderMenu(); }; return; }
    grid.innerHTML = items.map(function (m, i) {
      var tags = "";
      if (m.popular) tags += '<span class="mini-tag pop">★ Popular</span>';
      if (m.pick) tags += '<span class="mini-tag hot">Chef\'s pick</span>';
      if (m.spicy) tags += '<span class="mini-tag hot">' + "🌶️".repeat(Math.min(m.spicy, 3)) + "</span>";
      if (m.seasonal) tags += '<span class="mini-tag">Seasonal</span>';
      var thumb = m.img
        ? '<div class="ph" style="background-image:url(\'' + m.img + '\')"></div><span class="emoji">' + m.emoji + "</span>"
        : '<span class="emoji">' + m.emoji + '</span>';
      return '<article class="dish-card reveal visible" style="--d:' + (i * 0.04) + 's; border-color: var(--cream);">' +
        '<div class="dish-thumb" style="background:' + m.color + '">' + thumb + "</div>" +
        '<div class="dish-body"><div class="dish-top"><h3>' + m.name + '</h3><span class="dish-price">' + (m.price ? money(m.price) : "MKT") + "</span></div>" +
        '<p class="dish-desc">' + m.desc + "</p>" +
        (tags ? '<div class="dish-tags">' + tags + "</div>" : "") +
        (m.price ? '<button class="add-btn" data-add="' + m.id + '">Add to request +</button>' : '<a class="add-btn" href="https://wa.me/8801705036161?text=' + encodeURIComponent("Hello Hawa! Could you confirm the price and availability of " + m.name + "?") + '" target="_blank" rel="noopener">Ask for market price</a>') + '</div></article>';
    }).join("");
    grid.querySelectorAll("[data-add]").forEach(function (b) {
      b.onclick = function () {
        addToCart(b.dataset.add);
        var m = getItem(b.dataset.add);
        toast(m.name + " added 🛒");
        b.textContent = "✓ Added"; b.classList.add("added");
        setTimeout(function () { b.textContent = "Add to request +"; b.classList.remove("added"); }, 1200);
      };
    });
  }

  /* ---------- WhatsApp order request: human confirmation required ---------- */
  function initCheckout() {
    var form = document.getElementById("checkoutForm");
    if (!form) return;
    var cart = getCart();
    var list = document.getElementById("coItems");
    if (!cart.length) {
      document.getElementById("coEmpty").style.display = "block";
      form.style.display = "none";
      document.getElementById("coSummary").style.display = "none";
      return;
    }
    list.innerHTML = cart.map(function (i) {
      var m = getItem(i.id);
      return m ? '<div class="sum-row"><span>' + m.name + " × " + i.qty + '</span><span>' + (m.price ? money(m.price * i.qty) : "Ask Hawa") + "</span></div>" : "";
    }).join("");
    var subtotal = cartSubtotal();
    document.getElementById("coSub").textContent = money(subtotal);
    document.getElementById("coDisc").textContent = "Confirm";
    document.getElementById("coFee").textContent = "Confirm";
    document.getElementById("coTotal").textContent = money(subtotal) + " + delivery";
    document.querySelectorAll(".pay-opt").forEach(function (option) {
      option.addEventListener("click", function () {
        document.querySelectorAll(".pay-opt").forEach(function (node) { node.classList.remove("selected"); node.setAttribute("aria-pressed", "false"); });
        option.classList.add("selected");
        option.setAttribute("aria-pressed", "true");
        document.getElementById("payMethod").value = option.dataset.pay;
      });
    });
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var fields = new FormData(form);
      var rows = [
        "Hello Hawa! I would like to request these dishes:",
        ""
      ];
      cart.forEach(function (i) {
        var item = getItem(i.id);
        if (item) rows.push("• " + item.name + " × " + i.qty + (item.price ? " (listed: " + money(item.price * i.qty) + ")" : " (please quote)"));
      });
      rows.push(
        "",
        "Listed item subtotal: " + money(subtotal) + " (subject to confirmation; delivery extra)",
        "",
        "Name: " + String(fields.get("name") || "").trim(),
        "Phone: " + String(fields.get("phone") || "").trim(),
        "Address: " + String(fields.get("address") || "").trim(),
        "Area: " + String(fields.get("area") || "").trim(),
        "Payment preference: " + String(fields.get("pay") || "Cash on Delivery"),
        "Notes: " + String(fields.get("note") || "").trim(),
        "",
        "Please confirm availability, final total, delivery and payment before I pay."
      );
      window.location.href = "https://wa.me/8801705036161?text=" + encodeURIComponent(rows.join("\n"));
    });
  }

  /* ---------- Boot ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    renderCats(); renderMenu(); updateBadge(); initCheckout();
    var db = document.getElementById("drawerBtn"), bb = document.getElementById("cartBar");
    if (db) db.onclick = openDrawer;
    if (bb) { var toCheckout = function () { window.location.href = "checkout.html"; }; bb.onclick = toCheckout; bb.addEventListener("keydown", function (event) { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); toCheckout(); } }); }
    var cb = document.getElementById("cartBtn"); if (cb) cb.onclick = function () { window.location.href = "checkout.html"; };
    var dclose = document.getElementById("drawerClose"); if (dclose) dclose.onclick = closeDrawer;
    var dback = document.getElementById("drawerBackdrop"); if (dback) dback.onclick = closeDrawer;
    document.addEventListener("keydown", function (event) { if (event.key === "Escape") closeDrawer(); });
    var search = document.getElementById("searchInput");
    if (search) search.addEventListener("input", function () { query = search.value; renderMenu(); });
  });

  /* expose for debugging */
  window.HAWA = { MENU: MENU, getCart: getCart, addToCart: addToCart, toast: toast };
})();
