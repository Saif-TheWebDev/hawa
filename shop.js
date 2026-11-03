/* ============================================================
   HAWA SHOP ENGINE — menu data, cart (localStorage), checkout,
   WhatsApp enquiry handoff. No fake order confirmation or rider tracking.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Menu data ---------- */
  var IMG = {
    biryani: "assets/hawa-biryani-ai-v2.webp",
    mixedGrill: "assets/hawa-grill-ai-v2.webp",
    beef: "assets/hawa-beef-ai-v2.webp",
    firni: "assets/hawa-firni-ai-v2.webp",
    grill: "assets/grill-preview.webp",
    hall: "assets/hero.jpg",
  };

  var MENU = [
    {
      id: "beef-roast",
      name: "Beef Roast",
      bn: "বিফ রোস্ট",
      price: 650,
      cat: "curry",
      emoji: "🥩",
      color: "#7a2e12",
      img: IMG.beef,
      generated: true,
      desc: "Spicy, slow-cooked beef.",
      spicy: 2,
      popular: true,
    },
    {
      id: "chicken-korma",
      name: "Chicken Korma",
      bn: "চিকেন কারি",
      price: 480,
      cat: "curry",
      emoji: "🍗",
      color: "#a8641c",
      img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1100&q=85",
      desc: "Tender chicken in a golden, creamy masala gravy. Mild, rich and comforting.",
      spicy: 1,
    },
    {
      id: "masala-bhuna",
      name: "Masala Bhuna",
      bn: "মসলা ভুনা",
      price: 550,
      cat: "curry",
      emoji: "🌶️",
      color: "#8f1d0c",
      img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1100&q=85",
      desc: "A fiery, deeply spiced meat dish for those who like real heat.",
      spicy: 3,
      popular: true,
    },
    {
      id: "ilish-fry",
      name: "Ilish (Hilsa) Fry",
      bn: "ইলিশ ভাজা",
      price: 0,
      seasonal: true,
      cat: "curry",
      emoji: "🐟",
      color: "#1c5d6e",
      img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1100&q=85",
      desc: "Bangladesh's national fish, fried crisp with mustard. Market price, best in season.",
      spicy: 1,
    },
    {
      id: "kacchi-biryani",
      name: "Kacchi Biryani (Mutton)",
      bn: "কাচ্চি বিরিয়ানি",
      price: 420,
      cat: "rice",
      emoji: "🍚",
      color: "#b3541e",
      img: IMG.biryani,
      generated: true,
      desc: "Saffron basmati, marinated mutton, fried onion & boiled egg — the traditional way.",
      popular: true,
      pick: true,
    },
    {
      id: "chicken-biryani",
      name: "Chicken Biryani",
      bn: "চিকেন বিরিয়ানি",
      price: 320,
      cat: "rice",
      emoji: "🍗",
      color: "#c07a1f",
      img: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Chicken_Biryani_%2801%29.jpg?width=1600",
      generated: false,
      desc: "Classic comfort biryani served with borhani, raita & salad.",
      spicy: 1,
    },
    {
      id: "polao",
      name: "Polao & Roast",
      bn: "পোলাও",
      price: 300,
      cat: "rice",
      emoji: "🍛",
      color: "#8a6d1f",
      img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1100&q=85",
      desc: "Fragrant polao with beef/chicken roast.",
    },
    {
      id: "chicken-tikka",
      name: "Chicken Tikka",
      bn: "টিক্কা",
      price: 380,
      cat: "grill",
      emoji: "🍢",
      color: "#a33c10",
      img: IMG.grill,
      desc: "Charcoal-grilled, yogurt-marinated, smoky & juicy.",
      spicy: 2,
      popular: true,
    },
    {
      id: "seekh-kebab",
      name: "Beef Seekh Kebab",
      bn: "বিফ কাবাব",
      price: 450,
      cat: "grill",
      emoji: "🥩",
      color: "#6e2a0e",
      img: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=1100&q=85",
      desc: "Hand-minced beef kebab straight off the charcoal, with green chutney.",
      spicy: 2,
    },
    {
      id: "sizzling-platter",
      name: "Sizzling Platter",
      bn: "সিজলিং",
      price: 1200,
      cat: "grill",
      emoji: "🔥",
      color: "#991f0a",
      img: IMG.mixedGrill,
      generated: true,
      desc: "Mixed grill for the table — tikka, kebab & wings on a hot iron plate.",
      popular: true,
    },
    {
      id: "fried-rice",
      name: "Chicken Fried Rice",
      bn: "ফ্রাইড রাইস",
      price: 260,
      cat: "asian",
      emoji: "🍜",
      color: "#3d6b1f",
      img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1100&q=85",
      desc: "Wok-fried rice with egg, veggies & soy glaze.",
      spicy: 1,
    },
    {
      id: "chowmein",
      name: "Chowmein",
      bn: "নুডলস",
      price: 280,
      cat: "asian",
      emoji: "🥡",
      color: "#556b1f",
      img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1100&q=85",
      desc: "Stir-fried noodles with chicken & crunchy vegetables.",
    },
    {
      id: "thai-curry",
      name: "Thai Green Curry",
      bn: "থাই কারি",
      price: 520,
      cat: "asian",
      emoji: "🥥",
      color: "#2f6e46",
      img: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1100&q=85",
      desc: "Coconut curry with basil, bamboo shoots & your choice of protein.",
      spicy: 2,
    },
    {
      id: "firni",
      name: "Firni",
      bn: "ফিরনি",
      price: 120,
      cat: "sweet",
      emoji: "🍮",
      color: "#8a6d3f",
      img: IMG.firni,
      generated: true,
      desc: "Creamy rice-pudding dessert, chilled & lightly sweet.",
    },
    {
      id: "borhani",
      name: "Borhani & Juices",
      bn: "বোরহানি ও জুস",
      price: 60,
      cat: "sweet",
      emoji: "🥤",
      color: "#1f6e5e",
      img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1100&q=85",
      desc: "Spiced mint yogurt drink & fresh juices — the perfect cool-down after spice.",
    },
  ];

  var CATS = [
    { id: "all", label: "All dishes", emoji: "⭐" },
    { id: "grill", label: "Grill", emoji: "🔥" },
    { id: "curry", label: "Curries & Roasts", emoji: "🍛" },
    { id: "rice", label: "Rice & Biryani", emoji: "🍚" },
    { id: "asian", label: "Chinese & Thai", emoji: "🥡" },
    { id: "sweet", label: "Sweets & Drinks", emoji: "🍰" },
  ];

  /* Delivery prices, discounts and payment must be confirmed by Hawa. */

  /* ---------- Cart store ---------- */
  var CART_KEY = "hawa_cart_v1",
    memoryCart = null;
  function getCart() {
    try {
      var data = memoryCart || JSON.parse(localStorage.getItem(CART_KEY)) || [];
      return Array.isArray(data)
        ? data
            .filter(function (i) {
              return (
                i &&
                MENU.some(function (m) {
                  return m.id === i.id;
                }) &&
                Number.isInteger(i.qty) &&
                i.qty > 0
              );
            })
            .map(function (i) {
              return { id: i.id, qty: Math.min(i.qty, 50) };
            })
        : [];
    } catch (e) {
      return [];
    }
  }
  function saveCart(c) {
    memoryCart = c;
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(c));
    } catch (e) {
      toast(
        "Selection saved for this page only; browser storage is unavailable.",
      );
    }
    window.dispatchEvent(new CustomEvent("hawa:cart"));
  }
  function addToCart(id) {
    var c = getCart(),
      found = c.find(function (i) {
        return i.id === id;
      });
    if (!getItem(id) || !getItem(id).price) return c;
    if (found) found.qty = Math.min(found.qty + 1, 50);
    else c.push({ id: id, qty: 1 });
    saveCart(c);
    return c;
  }
  function setQty(id, qty) {
    var c = getCart()
      .map(function (i) {
        return i.id === id ? { id: id, qty: Math.min(qty, 50) } : i;
      })
      .filter(function (i) {
        return i.qty > 0;
      });
    saveCart(c);
  }
  function removeFromCart(id) {
    saveCart(
      getCart().filter(function (i) {
        return i.id !== id;
      }),
    );
  }
  function cartCount() {
    return getCart().reduce(function (s, i) {
      return s + i.qty;
    }, 0);
  }
  function cartSubtotal() {
    return getCart().reduce(function (s, i) {
      var m = MENU.find(function (x) {
        return x.id === i.id;
      });
      return s + (m ? m.price * i.qty : 0);
    }, 0);
  }
  function getItem(id) {
    return MENU.find(function (x) {
      return x.id === id;
    });
  }
  function money(n) {
    return "৳" + n.toLocaleString("en-BD");
  }

  /* ---------- Toast ---------- */
  var toastEl = null,
    toastTimer = null;
  function toast(msg) {
    if (!toastEl) toastEl = document.getElementById("toast");
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove("show");
    }, 2200);
  }

  /* ---------- Cart badge (all pages) ---------- */
  function updateBadge() {
    var b = document.getElementById("cartCount");
    if (b) {
      var n = cartCount();
      b.textContent = n;
      b.style.display = "inline-flex";
      b.setAttribute("aria-label", n + " selected items");
      var trigger = document.getElementById("drawerBtn");
      if (trigger)
        trigger.setAttribute(
          "aria-label",
          "Selection " + n + " — open your selection",
        );
    }
    var bar = document.getElementById("cartBar");
    if (bar) {
      var n2 = cartCount();
      if (n2) {
        bar.classList.add("show");
        bar.querySelector(".total").textContent = money(cartSubtotal());
        bar.querySelector(".cnt").textContent =
          n2 + (n2 === 1 ? " item" : " items");
      } else bar.classList.remove("show");
    }
  }
  window.addEventListener("hawa:cart", updateBadge);

  /* ---------- Cart drawer (menu page) ---------- */
  function openDrawer() {
    var d = document.getElementById("cartDrawer");
    if (d) {
      renderDrawer();
      if (!d.open) d.showModal();
      document.getElementById("drawerClose").focus();
    }
  }
  function closeDrawer() {
    var d = document.getElementById("cartDrawer");
    if (d && d.open) d.close();
  }
  function renderDrawer() {
    var body = document.getElementById("drawerBody"),
      foot = document.getElementById("drawerFoot");
    var c = getCart();
    if (!c.length) {
      body.innerHTML =
        '<div class="cart-empty"><div class="big">A place to start.</div><p>Your selection is empty.</p><a class="button button--dark" href="menu.html">Explore the menu ↗</a></div>';
      foot.style.display = "none";
      return;
    }
    foot.style.display = "block";
    body.innerHTML = c
      .map(function (i) {
        var m = getItem(i.id);
        if (!m) return "";
        return (
          '<div class="cart-item">' +
          '<div class="ci-emoji"><span>H</span></div>' +
          '<div class="ci-info"><h3>' +
          m.name +
          '</h3><div class="ci-price">' +
          (m.price ? money(m.price) : "Seasonal") +
          " each</div>" +
          '<div class="ci-controls"><button class="qty-btn" data-dec="' +
          m.id +
          '" aria-label="Remove one ' +
          m.name +
          '">−</button><span class="qty-val">' +
          i.qty +
          '</span><button class="qty-btn" data-inc="' +
          m.id +
          '" aria-label="Add one ' +
          m.name +
          '">+</button></div></div>' +
          '<button class="ci-remove" data-rm="' +
          m.id +
          '" aria-label="Remove ' +
          m.name +
          '">Remove</button></div>'
        );
      })
      .join("");
    var sub = cartSubtotal();
    document.getElementById("sumSub").textContent = money(sub);
    document.getElementById("sumFee").textContent = "Ask Hawa";
    document.getElementById("sumTotal").textContent =
      money(sub) + " + delivery";
    body.querySelectorAll("[data-inc]").forEach(function (b) {
      b.onclick = function () {
        var it = getCart().find(function (i) {
          return i.id === b.dataset.inc;
        });
        setQty(b.dataset.inc, it.qty + 1);
        renderDrawer();
        var next = body.querySelector('[data-inc="' + b.dataset.inc + '"]');
        if (next) next.focus();
      };
    });
    body.querySelectorAll("[data-dec]").forEach(function (b) {
      b.onclick = function () {
        var it = getCart().find(function (i) {
          return i.id === b.dataset.dec;
        });
        setQty(b.dataset.dec, it.qty - 1);
        renderDrawer();
        var next =
          body.querySelector('[data-dec="' + b.dataset.dec + '"]') ||
          document.getElementById("drawerClose");
        next.focus();
      };
    });
    body.querySelectorAll("[data-rm]").forEach(function (b) {
      b.onclick = function () {
        removeFromCart(b.dataset.rm);
        renderDrawer();
        document.getElementById("drawerClose").focus();
      };
    });
  }

  /* ---------- Menu page rendering ---------- */
  var queryCategory = new URLSearchParams(window.location.search).get("cat");
  var activeCat = CATS.some(function (c) {
      return c.id === queryCategory;
    })
      ? queryCategory
      : "all",
    query = new URLSearchParams(location.search).get("q") || "";
  function renderCats() {
    var el = document.getElementById("catList");
    if (!el) return;
    el.innerHTML = CATS.map(function (c) {
      return (
        '<button class="cat-btn' +
        (c.id === activeCat ? " active" : "") +
        '" aria-pressed="' +
        (c.id === activeCat) +
        '" data-cat="' +
        c.id +
        '">' +
        c.label +
        "</button>"
      );
    }).join("");
    el.querySelectorAll(".cat-btn").forEach(function (b) {
      b.onclick = function () {
        activeCat = b.dataset.cat;
        var url = new URL(location.href);
        if (activeCat === "all") url.searchParams.delete("cat");
        else url.searchParams.set("cat", activeCat);
        history.replaceState({}, "", url);
        renderCats();
        renderMenu();
        updateSelectionStatus();
        el.querySelector('[data-cat="' + activeCat + '"]').focus();
      };
    });
  }
  function renderMenu() {
    var grid = document.getElementById("dishGrid");
    if (!grid) return;
    var q = query.trim().toLowerCase();
    var items = MENU.filter(function (m) {
      var inCat = activeCat === "all" || m.cat === activeCat;
      var inQ =
        !q ||
        m.name.toLowerCase().indexOf(q) > -1 ||
        (m.bn && m.bn.toLowerCase().indexOf(q) > -1);
      return inCat && inQ;
    });
    document.getElementById("resultCount").textContent =
      items.length + (items.length === 1 ? " dish" : " dishes");
    if (!items.length) {
      grid.innerHTML =
        '<div class="panel" style="grid-column:1/-1;text-align:center"><h2 class="display h-md">No dishes match that search.</h2><p>Try another search or browse all categories.</p><button type="button" class="btn btn-ghost" id="clearSearch" style="margin-top:20px">Show all dishes</button></div>';
      document.getElementById("clearSearch").onclick = function () {
        query = "";
        activeCat = "all";
        var clear = document.getElementById("searchClear");
        if (clear) clear.hidden = true;
        var url = new URL(location.href);
        url.searchParams.delete("cat");
        url.searchParams.delete("q");
        history.replaceState({}, "", url);
        var input = document.getElementById("searchInput");
        if (input) {
          input.value = "";
          input.focus();
        }
        renderCats();
        renderMenu();
      };
      return;
    }
    function renderDish(m) {
      var categories = {
        rice: "RICE & BIRYANI",
        grill: "FROM THE GRILL",
        curry: "CURRIES & ROASTS",
        asian: "CHINESE & THAI",
        sweet: "SWEETS & DRINKS",
      };
      var category = categories[m.cat] || "FROM THE MENU";
      var image = m.img
        ? '<div class="dish-thumb"><img src="' +
          (m.generated ? m.img.replace(".webp", "-small.webp") : m.img) +
          '" width="700" height="467" loading="lazy" decoding="async" alt="' +
          m.name +
          (m.generated
            ? " — AI-created food illustration"
            : " — illustrative food image") +
          '"></div>'
        : "";
      var action = m.price
        ? '<button type="button" class="add-btn" data-add="' +
          m.id +
          '">Add to request +</button>'
        : '<a class="add-btn" href="https://wa.me/8801705036161?text=' +
          encodeURIComponent(
            "Hello Hawa! Could you confirm the price and availability of " +
              m.name +
              "?",
          ) +
          '" target="_blank" rel="noopener">Ask for market price ↗</a>';
      return (
        '<article class="dish-card ' +
        (m.img ? "dish-card--pictured" : "dish-card--text") +
        '">' +
        image +
        '<div class="dish-body"><p class="dish-category">' +
        category +
        '</p><div class="dish-top"><h3>' +
        m.name +
        '</h3><span class="dish-price">' +
        (m.price ? money(m.price) : "Market price") +
        '</span></div><p class="dish-desc">' +
        m.desc +
        '</p>' +
        (m.id === "chicken-biryani" ? '<p style="font-size:10px;line-height:1.5;margin:0 0 8px;opacity:.65">Photo: <a href="https://commons.wikimedia.org/wiki/File:Chicken_Biryani_(01).jpg" target="_blank" rel="noopener">Nahid Sultan</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener">CC BY-SA 4.0</a></p>' : '') +
        '<div class="dish-actions">' +
        action +
        '<span class="selection-status" data-selected="' +
        m.id +
        '"></span></div></div></article>'
      );
    }
    var pictured = items.filter(function (m) {
      return !!m.img;
    });
    var textDishes = items.filter(function (m) {
      return !m.img;
    });
    grid.innerHTML =
      (pictured.length
        ? '<div class="menu-picture-grid">' +
          pictured.map(renderDish).join("") +
          "</div>"
        : "") +
      (textDishes.length
        ? (pictured.length
            ? '<h2 class="menu-more-title">More for your table.</h2>'
            : "") +
          '<div class="menu-text-grid">' +
          textDishes.map(renderDish).join("") +
          "</div>"
        : "");
    updateSelectionStatus();
    grid.querySelectorAll("[data-add]").forEach(function (b) {
      b.onclick = function () {
        addToCart(b.dataset.add);
        var m = getItem(b.dataset.add);
        updateSelectionStatus();
        toast(m.name + " added to your request");
        b.textContent = "✓ Added";
        b.classList.add("added");
        setTimeout(function () {
          b.textContent = "Add to request +";
          b.classList.remove("added");
        }, 1200);
      };
    });
  }

  /* ---------- WhatsApp order request: human confirmation required ---------- */
  function initCheckout() {
    var form = document.getElementById("checkoutForm");
    if (!form) return;
    var cart = [],
      subtotal = 0;
    function refreshSummary() {
      cart = getCart();
      subtotal = cartSubtotal();
      document.getElementById("coEmpty").style.display = cart.length
        ? "none"
        : "block";
      form.style.display = cart.length ? "block" : "none";
      document.getElementById("coSummary").style.display = cart.length
        ? "block"
        : "none";
      document.getElementById("coItems").innerHTML = cart
        .map(function (i) {
          var m = getItem(i.id);
          return (
            '<div class="sum-row"><span>' +
            m.name +
            " × " +
            i.qty +
            "</span><span>" +
            money(m.price * i.qty) +
            "</span></div>"
          );
        })
        .join("");
      document.getElementById("coSub").textContent = money(subtotal);
      document.getElementById("coDisc").textContent = "Confirm";
      document.getElementById("coFee").textContent = "Confirm";
      document.getElementById("coTotal").textContent =
        money(subtotal) + " + delivery";
      document.getElementById("requestPreview").hidden = true;
    }
    refreshSummary();
    window.addEventListener("hawa:cart", refreshSummary);
    window.addEventListener("storage", function (e) {
      if (e.key === CART_KEY) {
        memoryCart = null;
        refreshSummary();
      }
    });
    document.querySelectorAll(".pay-opt").forEach(function (option) {
      option.addEventListener("click", function () {
        document.querySelectorAll(".pay-opt").forEach(function (node) {
          node.classList.remove("selected");
          node.setAttribute("aria-pressed", "false");
        });
        option.classList.add("selected");
        option.setAttribute("aria-pressed", "true");
        document.getElementById("payMethod").value = option.dataset.pay;
        document.getElementById("requestPreview").hidden = true;
      });
    });
    form.addEventListener("input", function () {
      document.getElementById("requestPreview").hidden = true;
    });
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var invalid = [];
      form.querySelectorAll("[required]").forEach(function (input) {
        var error = document.getElementById(input.id + "Error");
        if (!error) {
          error = document.createElement("p");
          error.id = input.id + "Error";
          error.className = "field-error";
          input.after(error);
          input.setAttribute("aria-describedby", error.id);
        }
        var good = !!input.value.trim() && input.checkValidity();
        input.setAttribute("aria-invalid", String(!good));
        error.textContent = good
          ? ""
          : input.name === "phone"
            ? "Enter a valid phone number, including the area code."
            : "Please complete this field.";
        if (!good) invalid.push(input);
      });
      if (invalid.length) {
        invalid[0].focus();
        return;
      }
      cart = getCart();
      subtotal = cartSubtotal();
      var fields = new FormData(form);
      var rows = ["Hello Hawa! I would like to request these dishes:", ""];
      cart.forEach(function (i) {
        var item = getItem(i.id);
        if (item)
          rows.push(
            "• " +
              item.name +
              " × " +
              i.qty +
              (item.price
                ? " (listed: " + money(item.price * i.qty) + ")"
                : " (please quote)"),
          );
      });
      rows.push(
        "",
        "Listed item subtotal: " +
          money(subtotal) +
          " (subject to confirmation; delivery extra)",
        "",
        "Name: " + String(fields.get("name") || "").trim(),
        "Phone: " + String(fields.get("phone") || "").trim(),
        "Address: " + String(fields.get("address") || "").trim(),
        "Area: " + String(fields.get("area") || "").trim(),
        "Payment preference: " +
          String(fields.get("pay") || "Cash on Delivery"),
        "Notes: " + String(fields.get("note") || "").trim(),
        "",
        "Please confirm availability, final total, delivery and payment before I pay.",
      );
      var preview = document.getElementById("requestPreview");
      document.getElementById("requestText").textContent = rows.join("\n");
      document.getElementById("whatsappLink").href =
        "https://wa.me/8801705036161?text=" +
        encodeURIComponent(rows.join("\n"));
      preview.hidden = false;
      document.getElementById("whatsappLink").focus();
    });
  }

  /* ---------- Boot ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    renderCats();
    renderMenu();
    updateBadge();
    initCheckout();
    var db = document.getElementById("drawerBtn"),
      bb = document.getElementById("cartBar");
    if (db) db.onclick = openDrawer;
    if (bb) {
      var toCheckout = openDrawer;
      bb.onclick = toCheckout;
      bb.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toCheckout();
        }
      });
    }
    var cb = document.getElementById("cartBtn");
    if (cb) cb.onclick = openDrawer;
    var dclose = document.getElementById("drawerClose");
    if (dclose) dclose.onclick = closeDrawer;
    var dback = document.getElementById("drawerBackdrop");
    if (dback) dback.onclick = closeDrawer;
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeDrawer();
    });
    var search = document.getElementById("searchInput");
    if (search) {
      var clear = document.getElementById("searchClear");
      search.value = query;
      clear.hidden = !query;
      function searchNow() {
        query = search.value;
        var url = new URL(location.href);
        if (query) url.searchParams.set("q", query);
        else url.searchParams.delete("q");
        history.replaceState({}, "", url);
        clear.hidden = !query;
        renderMenu();
        updateSelectionStatus();
      }
      search.addEventListener("input", function (e) {
        if (!e.isComposing) searchNow();
      });
      search.addEventListener("compositionend", searchNow);
      clear.onclick = function () {
        search.value = "";
        searchNow();
        search.focus();
      };
    }
    updateSelectionStatus();
  });

  function updateSelectionStatus() {
    document.querySelectorAll("[data-selected]").forEach(function (el) {
      var i = getCart().find(function (x) {
        return x.id === el.dataset.selected;
      });
      el.textContent = i ? i.qty + " in your selection" : "";
    });
  }
  window.addEventListener("hawa:cart", updateSelectionStatus);
  window.addEventListener("storage", function (e) {
    if (e.key === CART_KEY) {
      memoryCart = null;
      updateBadge();
      updateSelectionStatus();
      var d = document.getElementById("cartDrawer");
      if (d && d.open) renderDrawer();
    }
  });
  /* expose shared state to homepage details */
  window.HAWA = {
    MENU: MENU,
    getCart: getCart,
    addToCart: addToCart,
    toast: toast,
    openDrawer: openDrawer,
  };
})();
