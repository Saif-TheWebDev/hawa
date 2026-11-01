/* ============================================================
   HAWA SHOP ENGINE — menu data, cart (localStorage), checkout,
   order tracking simulation. Shared by menu/checkout/track pages.
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

  var DELIVERY_FEE = 40, FREE_OVER = 800, PROMO = { HAWA10: 0.10 };

  /* ---------- Cart store ---------- */
  var CART_KEY = "hawa_cart_v1", ORDERS_KEY = "hawa_orders_v1";
  function getCart() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; } }
  function saveCart(c) { localStorage.setItem(CART_KEY, JSON.stringify(c)); window.dispatchEvent(new CustomEvent("hawa:cart")); }
  function addToCart(id) {
    var c = getCart(), found = c.find(function (i) { return i.id === id; });
    if (found) found.qty++; else c.push({ id: id, qty: 1 });
    saveCart(c); return c;
  }
  function setQty(id, qty) {
    var c = getCart().filter(function (i) { return i.id !== id || qty > 0; });
    var item = getCart().find(function (i) { return i.id === id; });
    if (item && qty > 0) item.qty = qty;
    if (item && qty > 0) c.push(item);
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

  /* ---------- Orders ---------- */
  function getOrders() { try { return JSON.parse(localStorage.getItem(ORDERS_KEY)) || []; } catch (e) { return []; } }
  function saveOrders(o) { localStorage.setItem(ORDERS_KEY, JSON.stringify(o)); }
  function placeOrder(form) {
    var id = "HW-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    var order = {
      id: id, ts: Date.now(), items: getCart(), form: form,
      subtotal: cartSubtotal(), discount: form.discount || 0, fee: form.fee, total: form.total,
      status: 0, statusTs: Date.now()
    };
    var orders = getOrders(); orders.unshift(order); saveOrders(orders);
    saveCart([]);
    return order;
  }
  function getOrder(id) { return getOrders().find(function (o) { return o.id === id; }); }

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
  function openDrawer() { var d = document.getElementById("cartDrawer"); if (d) { renderDrawer(); d.classList.add("open"); document.getElementById("drawerBackdrop").classList.add("show"); document.body.style.overflow = "hidden"; } }
  function closeDrawer() { var d = document.getElementById("cartDrawer"); if (d) { d.classList.remove("open"); document.getElementById("drawerBackdrop").classList.remove("show"); document.body.style.overflow = ""; } }
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
        '<div class="ci-controls"><button class="qty-btn" data-dec="' + m.id + '">−</button><span class="qty-val">' + i.qty + '</span><button class="qty-btn" data-inc="' + m.id + '">+</button></div></div>' +
        '<button class="ci-remove" data-rm="' + m.id + '" aria-label="Remove ' + m.name + '">🗑️</button></div>';
    }).join("");
    var sub = cartSubtotal(), fee = sub >= FREE_OVER || sub === 0 ? 0 : DELIVERY_FEE;
    document.getElementById("sumSub").textContent = money(sub);
    document.getElementById("sumFee").textContent = fee === 0 ? "FREE" : money(fee);
    document.getElementById("sumTotal").textContent = money(sub + fee);
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
    document.getElementById("resultCount").textContent = items.length + " dishes";
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
        '<button class="add-btn" data-add="' + m.id + '">+ Add to cart</button></div></article>';
    }).join("");
    grid.querySelectorAll("[data-add]").forEach(function (b) {
      b.onclick = function () {
        addToCart(b.dataset.add);
        var m = getItem(b.dataset.add);
        toast(m.name + " added 🛒");
        b.textContent = "✓ Added"; b.classList.add("added");
        setTimeout(function () { b.textContent = "+ Add to cart"; b.classList.remove("added"); }, 1200);
      };
    });
  }

  /* ---------- Checkout page ---------- */
  function initCheckout() {
    if (!document.getElementById("checkoutForm")) return;
    var cart = getCart();
    var list = document.getElementById("coItems");
    if (!cart.length) {
      document.getElementById("coEmpty").style.display = "block";
      document.getElementById("checkoutForm").style.display = "none";
      document.getElementById("coSummary").style.display = "none";
      return;
    }
    function totals() {
      var sub = cartSubtotal();
      var code = (document.getElementById("promoInput").value || "").trim().toUpperCase();
      var disc = PROMO[code] ? Math.round(sub * PROMO[code]) : 0;
      var fee = sub - disc >= FREE_OVER || sub === 0 ? 0 : DELIVERY_FEE;
      return { sub: sub, disc: disc, fee: fee, total: sub - disc + fee };
    }
    function renderSummary() {
      var t = totals();
      document.getElementById("coSub").textContent = money(t.sub);
      document.getElementById("coDisc").textContent = t.disc ? "−" + money(t.disc) : "—";
      document.getElementById("coFee").textContent = t.fee === 0 ? "FREE" : money(t.fee);
      document.getElementById("coTotal").textContent = money(t.total);
      var msg = document.getElementById("promoMsg");
      var code = (document.getElementById("promoInput").value || "").trim().toUpperCase();
      if (code) { msg.textContent = PROMO[code] ? "✔ " + code + " applied — you saved " + money(t.disc) + "!" : "✖ Invalid code"; msg.className = "promo-msg " + (PROMO[code] ? "ok" : "err"); }
      else { msg.textContent = ""; msg.className = "promo-msg"; }
    }
    list.innerHTML = cart.map(function (i) {
      var m = getItem(i.id); if (!m) return "";
      return '<div class="sum-row"><span>' + m.emoji + " " + m.name + " × " + i.qty + "</span><span>" + (m.price ? money(m.price * i.qty) : "MKT") + "</span></div>";
    }).join("");
    renderSummary();
    document.getElementById("promoInput").addEventListener("input", renderSummary);
    document.getElementById("promoApply").onclick = renderSummary;

    document.querySelectorAll(".pay-opt").forEach(function (p) {
      p.onclick = function () {
        document.querySelectorAll(".pay-opt").forEach(function (x) { x.classList.remove("selected"); });
        p.classList.add("selected");
        document.getElementById("payMethod").value = p.dataset.pay;
      };
    });

    document.getElementById("checkoutForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var f = new FormData(e.target);
      var t = totals();
      var order = placeOrder({
        name: f.get("name"), phone: f.get("phone"), address: f.get("address"),
        area: f.get("area"), note: f.get("note"), pay: f.get("pay") || "Cash on Delivery",
        discount: t.disc, fee: t.fee, total: t.total
      });
      toast("Order " + order.id + " placed! 🎉");
      setTimeout(function () { window.location.href = "track.html?id=" + order.id; }, 700);
    });
  }

  /* ---------- Tracking page ---------- */
  var STATUSES = [
    { key: "placed", label: "Order placed", icon: "🧾", desc: "We received your order and sent it to the kitchen." },
    { key: "confirmed", label: "Confirmed", icon: "✅", desc: "Hawa confirmed your order. Chefs are on it!" },
    { key: "cooking", label: "Cooking", icon: "🔥", desc: "Fresh masala, fired up — your food is being cooked now." },
    { key: "onway", label: "Out for delivery", icon: "🛵", desc: "Rider has picked up your order and is on the way." },
    { key: "delivered", label: "Delivered", icon: "🎉", desc: "Enjoy your meal! Rate your experience on Facebook." }
  ];
  var STAGE_DUR = 9000; // ms per stage (demo pace)

  function initTrack() {
    if (!document.getElementById("trackRoot")) return;
    var params = new URLSearchParams(location.search);
    var id = params.get("id");
    var order = id ? getOrder(id) : getOrders()[0];
    var root = document.getElementById("trackRoot");
    if (!order) {
      root.innerHTML = '<div class="panel" style="text-align:center;padding:60px 20px"><div style="font-size:3.5rem">📭</div><h2 class="h-md display">No order found</h2><p style="color:var(--muted);margin:12px 0 22px">Place an order first, then track it here.</p><a class="btn btn-blaze" href="menu.html">Browse the menu</a></div>';
      renderHistory(); return;
    }

    /* progress: advance stages over time (demo simulation, capped at delivered) */
    var elapsed = Date.now() - order.ts;
    var stage = Math.min(Math.floor(elapsed / STAGE_DUR), STATUSES.length - 1);
    if (stage >= STATUSES.length - 1) stage = STATUSES.length - 1;

    var itemsHtml = order.items.map(function (i) {
      var m = getItem(i.id); return m ? '<div class="sum-row"><span>' + m.emoji + " " + m.name + " × " + i.qty + "</span><span>" + (m.price ? money(m.price * i.qty) : "MKT") + "</span></div>" : "";
    }).join("");

    root.innerHTML =
      '<div class="track-head reveal visible">' +
        '<p class="section-kicker">Live tracking</p>' +
        '<div class="order-id">' + order.id + '</div>' +
        '<p style="color:var(--muted);font-size:.9rem">Placed ' + new Date(order.ts).toLocaleString("en-BD") + " · " + order.form.pay + " · " + (order.form.area || "Mymensingh") + "</p>" +
      "</div>" +
      '<div class="track-grid">' +
        '<div>' +
          '<div class="eta-box"><div class="eta" id="etaVal">' + (stage >= 4 ? "Delivered" : Math.max(5, 35 - stage * 8) + " min") + '</div><p>' + (stage >= 4 ? "Your food arrived. Enjoy!" : "Estimated delivery time") + '</p></div>' +
          '<div class="panel panel-dark"><h2>Order progress</h2><div class="timeline" id="timeline">' +
            STATUSES.map(function (s, i) {
              var cls = i < stage ? "done" : (i === stage ? "current" : "");
              return '<div class="tl-item ' + cls + '"><span class="tl-dot">' + (i < stage ? "✓" : (i === stage ? s.icon : "")) + '</span><h4>' + s.label + '</h4><p>' + s.desc + "</p></div>";
            }).join("") +
          "</div></div>" +
          '<div class="rider-card"><span class="rider-avatar">🛵</span><div><h4>Rider: Rahim</h4><p id="riderNote">on the way with your food, in sha Allah 🛣️</p></div></div>' +
          '<div class="track-actions">' +
            '<a class="btn btn-blaze" href="tel:+8801705036161">📞 Call restaurant</a>' +
            '<a class="btn btn-wa" href="https://wa.me/8801705036161?text=Hi%20Hawa!%20Tracking%20order%20' + order.id + ' 🛵" target="_blank" rel="noopener">💬 WhatsApp us</a>' +
            '<a class="btn btn-cream" href="menu.html?reorder=' + order.id + '">🔁 Re-order</a>' +
            '<button class="btn btn-ghost" id="shareBtn" type="button">🔗 Copy tracking link</button>' +
          "</div>" +
        "</div>" +
        '<div>' +
          '<div class="map-card"><svg viewBox="0 0 400 300" role="img" aria-label="Delivery route map">' +
            '<rect width="400" height="300" fill="#14100a"/>' +
            '<g stroke="#2c2113" stroke-width="10"><line x1="0" y1="80" x2="400" y2="80"/><line x1="0" y1="170" x2="400" y2="170"/><line x1="0" y1="250" x2="400" y2="250"/><line x1="90" y1="0" x2="90" y2="300"/><line x1="210" y1="0" x2="210" y2="300"/><line x1="320" y1="0" x2="320" y2="300"/></g>' +
            '<path id="route" d="M 60 240 L 90 170 L 210 170 L 210 80 L 340 80" fill="none" stroke="#d9f24f" stroke-width="4" stroke-dasharray="8 6"/>' +
            '<circle cx="60" cy="240" r="10" fill="#ff4d00" stroke="#f6eeda" stroke-width="3"/>' +
            '<text x="60" y="268" fill="#f6eeda" font-size="11" text-anchor="middle" font-family="sans-serif">HAWA</text>' +
            '<circle cx="340" cy="80" r="10" fill="#35d07f" stroke="#f6eeda" stroke-width="3"/>' +
            '<text x="340" y="60" fill="#f6eeda" font-size="11" text-anchor="middle" font-family="sans-serif">YOU</text>' +
            '<circle id="rider" cx="60" cy="240" r="8" fill="#ff7a33" stroke="#000" stroke-width="2"><animateMotion dur="9s" repeatCount="indefinite" path="M 60 240 L 90 170 L 210 170 L 210 80 L 340 80"/></circle>' +
          "</svg>" +
          '<div class="map-legend"><span>📍 Dhaka Bypass Mor</span><span id="riderStatus">' + STATUSES[stage].label + '</span><span>🏠 ' + (order.form.area || "Your door") + "</span></div>" +
          "</div>" +
          '<div class="panel panel-dark" style="margin-top:20px"><h2>Order summary</h2>' + itemsHtml +
            '<div class="sum-row" style="margin-top:8px"><span>Delivery fee</span><span>' + (order.fee ? money(order.fee) : "FREE") + "</span></div>" +
            (order.discount ? '<div class="sum-row"><span>Discount</span><span>−' + money(order.discount) + "</span></div>" : "") +
            '<div class="sum-row total"><span>Total</span><span>' + money(order.total) + "</span></div>" +
            '<p style="font-size:.85rem;color:var(--muted);margin-top:10px">Deliver to: ' + order.form.address + " · " + order.form.phone + "</p>" +
          "</div>" +
        "</div>" +
      "</div>";

    /* live stage advancement */
    if (stage < STATUSES.length - 1) {
      var nextIn = STAGE_DUR - (elapsed % STAGE_DUR);
      setTimeout(function () {
        var riderStatus = document.getElementById("riderStatus");
        var etaVal = document.getElementById("etaVal");
        var s2 = Math.min(stage + 1, STATUSES.length - 1);
        if (riderStatus) riderStatus.textContent = STATUSES[s2].label;
        if (etaVal) etaVal.textContent = s2 >= 4 ? "Delivered" : Math.max(5, 35 - s2 * 8) + " min";
        var items = document.querySelectorAll("#timeline .tl-item");
        items.forEach(function (el, i) { el.classList.toggle("done", i < s2); el.classList.toggle("current", i === s2); });
        var dots = document.querySelectorAll("#timeline .tl-dot");
        dots.forEach(function (d, i) { d.textContent = i < s2 ? "✓" : (i === s2 ? STATUSES[i].icon : ""); });
        if (s2 < STATUSES.length - 1) setTimeout(arguments.callee, STAGE_DUR);
      }, nextIn);
    }
    renderHistory();
  }

  function renderHistory() {
    var el = document.getElementById("historyList"); if (!el) return;
    var orders = getOrders();
    if (!orders.length) { el.innerHTML = '<p style="color:var(--muted)">No past orders yet.</p>'; return; }
    el.innerHTML = orders.slice(0, 5).map(function (o) {
      var n = o.items.reduce(function (s, i) { return s + i.qty; }, 0);
      return '<div class="history-item"><div><div class="h-id">' + o.id + '</div><div class="h-meta">' + new Date(o.ts).toLocaleString("en-BD") + " · " + n + " items · " + money(o.total) + "</div></div>" +
        '<div style="display:flex;gap:8px"><a class="mini-btn" href="track.html?id=' + o.id + '">Track</a><a class="mini-btn blaze" href="menu.html?reorder=' + o.id + '">Re-order</a></div></div>';
    }).join("");
  }

  /* ---------- Re-order ---------- */
  function applyReorder() {
    var params = new URLSearchParams(location.search);
    var rid = params.get("reorder");
    if (!rid) return;
    var o = getOrder(rid); if (!o) return;
    saveCart(o.items.map(function (i) { return { id: i.id, qty: i.qty }; }));
    toast("Re-ordered " + rid + " 🛒");
    if (document.getElementById("dishGrid")) updateBadge();
  }

  /* ---------- Boot ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    renderCats(); renderMenu(); updateBadge(); initCheckout(); initTrack(); applyReorder();
    var db = document.getElementById("drawerBtn"), bb = document.getElementById("barBtn");
    if (db) db.onclick = openDrawer;
    if (bb) bb.onclick = function () { window.location.href = "checkout.html"; };
    var cb = document.getElementById("cartBtn"); if (cb) cb.onclick = function () { window.location.href = "checkout.html"; };
    var dclose = document.getElementById("drawerClose"); if (dclose) dclose.onclick = closeDrawer;
    var dback = document.getElementById("drawerBackdrop"); if (dback) dback.onclick = closeDrawer;
    var search = document.getElementById("searchInput");
    if (search) search.addEventListener("input", function () { query = search.value; renderMenu(); });
  });

  /* expose for debugging */
  window.HAWA = { MENU: MENU, getCart: getCart, addToCart: addToCart, toast: toast };
})();
