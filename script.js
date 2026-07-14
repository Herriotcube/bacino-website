(function () {
  "use strict";

  const state = {
    section: "food",
    tab: "pasta",
    faqOpen: 0,
    hlActive: null,
    flashDish: null
  };

  const sectionData = (key) => MENU_DATA[key];

  function slug(name) {
    return (name || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  /* ===== Nav scroll state ===== */
  const nav = document.getElementById("nav");
  const sentinel = document.getElementById("nav-sentinel");
  function updateNavHeight() {
    document.documentElement.style.setProperty("--nav-height", nav.offsetHeight + "px");
  }
  function updateNavScrolled() {
    const scrolled = sentinel ? sentinel.getBoundingClientRect().top <= 8 : window.scrollY > 60;
    nav.classList.toggle("scrolled", scrolled);
    updateNavHeight();
  }
  updateNavHeight();
  window.addEventListener("scroll", updateNavScrolled, true);
  window.addEventListener("resize", updateNavScrolled);
  if (sentinel && "IntersectionObserver" in window) {
    new IntersectionObserver(updateNavScrolled, { threshold: [0, 1] }).observe(sentinel);
  }
  updateNavScrolled();

  /* ===== Highlight cards ===== */
  const highlightCardsEl = document.getElementById("highlight-cards");
  const HIGHLIGHTS = [
    {
      accent: "#cf5030", bg: "#cf5030", img: "assets/sketch-pizza-t.png",
      eyebrow: "Pizzeria", title: "Authentic Italian Pizzas",
      desc: "Blistered, airy crusts topped with burrata, ’nduja and truffle — half or full.",
      ctaColor: "#fbf7ee", catKey: "pizza",
      overlayEyebrow: "Most loved · Pizza", overlayColor: "#f0a58c",
      dishes: [
        { name: "Bacino", cat: "pizza" },
        { name: "Roma", cat: "pizza" },
        { name: "Quattro Stagioni", cat: "pizza" }
      ]
    },
    {
      accent: "#3f8452", bg: "#4e9a63", img: "assets/card-pasta-t.png",
      eyebrow: "Pasta Fresca", title: "Hand-made Pastas",
      desc: "Carbonara, cacio e pepe and house gnocchi, rolled and cut fresh each morning.",
      ctaColor: "#fbf7ee", catKey: "pasta",
      overlayEyebrow: "Most loved · Pasta", overlayColor: "#9ed3ac",
      dishes: [
        { name: "Spaghetti alla Bottarga", cat: "specials", section: "specials" },
        { name: "Spaghetti Carbonara", cat: "pasta" },
        { name: "Spaghetti / Linguine Vongole", cat: "pasta" }
      ]
    },
    {
      accent: "#c68a12", bg: "#e0a52a", img: "assets/card-meatfish-t.png",
      eyebrow: "CARNE E PESCE", title: "Meat & Fish",
      desc: "Premium meats and delicious Italian seafood, prepared to honour classic traditional recipes.",
      ctaColor: "#3a2a08", catKey: "mains",
      overlayEyebrow: "Most loved · Meat & Fish", overlayColor: "#f0cf8a",
      dishes: [
        { name: "Branzino al Cartoccio", cat: "mains" },
        { name: "Filetto di Manzo", cat: "mains" },
        { name: "Costoletta d’Agnello", cat: "mains" }
      ]
    }
  ];

  function goToDish(catKey, name, sectionKey) {
    state.section = sectionKey || "food";
    state.tab = catKey;
    setActiveCard(null);
    const domId = "dish-" + slug(name);
    state.flashDish = domId;
    renderMenu();
    scrollToDish(name);
    clearTimeout(goToDish._t);
    goToDish._t = setTimeout(() => { state.flashDish = null; renderMenu(); }, 1900);
  }

  function scrollToDish(name) {
    const id = "dish-" + slug(name);
    let tries = 0;
    function attempt() {
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop || 0) - 110;
        window.scrollTo({ top: y, behavior: "smooth" });
      } else if (tries++ < 40) {
        requestAnimationFrame(attempt);
      } else {
        const menu = document.getElementById("menu");
        if (menu) window.scrollTo({ top: menu.getBoundingClientRect().top + (window.pageYOffset || 0) - 90, behavior: "smooth" });
      }
    }
    requestAnimationFrame(attempt);
  }

  const cardEls = [];

  function setActiveCard(i) {
    if (state.hlActive === i) return;
    if (state.hlActive !== null && cardEls[state.hlActive]) {
      cardEls[state.hlActive].classList.remove("active");
    }
    state.hlActive = i;
    if (i !== null && cardEls[i]) {
      cardEls[i].classList.add("active");
    }
  }

  function buildHighlights() {
    highlightCardsEl.innerHTML = "";
    HIGHLIGHTS.forEach((h, i) => {
      const card = document.createElement("div");
      card.className = "hl-card";

      card.innerHTML =
        '<img class="hl-card-img" style="background:' + h.bg + '" src="' + h.img + '" alt="' + h.title + '">' +
        '<div class="hl-card-body">' +
          '<div class="hl-card-eyebrow" style="color:' + h.accent + '">' + h.eyebrow + '</div>' +
          '<h3 class="hl-card-title">' + h.title + '</h3>' +
          '<p class="hl-card-desc">' + h.desc + '</p>' +
          '<a href="#menu" class="hl-card-cta" data-cat="' + h.catKey + '" style="background:' + h.bg + ';color:' + h.ctaColor + '">See the menu</a>' +
        '</div>' +
        '<div class="hl-overlay">' +
          '<div class="hl-overlay-eyebrow" style="color:' + h.overlayColor + '">' + h.overlayEyebrow + '</div>' +
          h.dishes.map((d, di) => '<div class="hl-overlay-dish" data-dish-idx="' + di + '" style="color:#fff">' + d.name + '</div>').join("") +
        '</div>';

      card.querySelector(".hl-card-cta").addEventListener("click", (e) => {
        e.preventDefault();
        state.section = "food";
        state.tab = h.catKey;
        renderMenu();
        document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
      });

      card.querySelectorAll(".hl-overlay-dish").forEach((dishEl) => {
        dishEl.style.cursor = "pointer";
        dishEl.addEventListener("mouseenter", () => { dishEl.style.color = h.overlayColor; dishEl.style.textDecoration = "underline"; });
        dishEl.addEventListener("mouseleave", () => { dishEl.style.color = "#fff"; dishEl.style.textDecoration = "none"; });
        dishEl.addEventListener("click", (e) => {
          e.stopPropagation();
          const d = h.dishes[Number(dishEl.dataset.dishIdx)];
          goToDish(d.cat, d.name, d.section);
        });
      });

      card.addEventListener("mouseenter", () => setActiveCard(i));
      card.addEventListener("mouseleave", () => setActiveCard(null));
      card.addEventListener("click", (e) => {
        if (e.target.closest(".hl-card-cta") || e.target.closest(".hl-overlay-dish")) return;
        setActiveCard(state.hlActive === i ? null : i);
      });

      cardEls[i] = card;
      highlightCardsEl.appendChild(card);
    });
  }

  /* ===== Menu ===== */
  const sectionSwitchEl = document.getElementById("section-switch");
  const catTabsEl = document.getElementById("cat-tabs");
  const catNoteEl = document.getElementById("cat-note");
  const menuItemsEl = document.getElementById("menu-items");

  const SECTIONS = [
    { label: "Set Lunch", key: "setlunch" },
    { label: "Alla Carta", key: "food" },
    { label: "Chef's Specials", key: "specials", special: true },
    { label: "Wine & Beverages", key: "drinks" }
  ];

  function renderSectionSwitch() {
    sectionSwitchEl.innerHTML = "";
    SECTIONS.forEach((s) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "sec-btn" + (s.key === state.section ? " active" : "");
      btn.innerHTML = s.label + (s.special ? '<img src="assets/chefs-special-small.png" alt="Chef\'s Special">' : "");
      btn.addEventListener("click", () => {
        state.section = s.key;
        state.tab = sectionData(s.key)[0].key;
        renderMenu();
      });
      sectionSwitchEl.appendChild(btn);
    });
  }

  function currentCategory() {
    const menu = sectionData(state.section);
    return menu.find((c) => c.key === state.tab) || menu[0];
  }

  function renderCatTabs() {
    catTabsEl.innerHTML = "";
    const cats = sectionData(state.section);
    catTabsEl.style.display = cats.length <= 1 ? "none" : "";
    if (cats.length <= 1) return;
    cats.forEach((c) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "cat-btn" + (c.key === state.tab ? " active" : "");
      btn.textContent = c.label;
      btn.addEventListener("click", () => {
        state.tab = c.key;
        renderMenu();
      });
      catTabsEl.appendChild(btn);
    });
  }

  function renderCatNote() {
    const cat = currentCategory();
    catNoteEl.innerHTML = "";
    if (!cat.note) return;
    const isSetlunch = state.section === "setlunch";
    const useHead = isSetlunch || state.section === "specials" || state.section === "drinks" || cat.key === "pizza";
    const altFrom = isSetlunch ? 1 : Infinity;
    cat.note.split("\n").filter((t) => t.length).forEach((text, i) => {
      const line = document.createElement("div");
      line.className = "cat-note-line " + (i >= altFrom ? "alt" : (useHead ? "head" : "base")) + (isSetlunch && i === 0 ? " setlunch-price" : "");
      line.textContent = text;
      catNoteEl.appendChild(line);
    });
  }

  function renderMenuItems() {
    const cat = currentCategory();
    menuItemsEl.innerHTML = "";
    cat.items.forEach((item) => {
      if (item.heading) {
        const heading = document.createElement("div");
        heading.className = "menu-group-heading";
        heading.textContent = item.heading;
        menuItemsEl.appendChild(heading);
      }
      if (item.orAlt) {
        const or = document.createElement("div");
        or.className = "menu-or-divider";
        or.textContent = "or";
        menuItemsEl.appendChild(or);
      }

      const domId = "dish-" + slug(item.name);
      const row = document.createElement("div");
      row.className = "menu-item" + (state.flashDish === domId ? " flash" : "");
      row.id = domId;

      const line = document.createElement("div");
      line.className = "menu-item-line";

      const name = document.createElement("span");
      name.className = "menu-item-name";
      name.textContent = item.name;
      line.appendChild(name);

      if (item.special) {
        const badge = document.createElement("img");
        badge.className = "menu-item-badge";
        badge.src = "assets/chefs-special-small.png";
        badge.alt = "Chef's Special";
        badge.title = "Chef's Special";
        line.appendChild(badge);
      }

      const leader = document.createElement("span");
      leader.className = "menu-item-leader";
      line.appendChild(leader);

      if (item.price) {
        const price = document.createElement("span");
        price.className = "menu-item-price";
        price.textContent = "$" + item.price;
        line.appendChild(price);
      }

      row.appendChild(line);

      const desc = document.createElement("div");
      desc.className = "menu-item-desc";
      desc.textContent = item.desc;
      row.appendChild(desc);

      menuItemsEl.appendChild(row);
    });
  }

  function renderMenu() {
    renderSectionSwitch();
    renderCatTabs();
    renderCatNote();
    renderMenuItems();
  }

  /* ===== FAQ ===== */
  const faqListEl = document.getElementById("faq-list");
  function renderFaq() {
    faqListEl.innerHTML = "";
    MENU_DATA.faqs.forEach((f, i) => {
      const item = document.createElement("div");
      item.className = "faq-item" + (state.faqOpen === i ? " open" : "");
      const answerHtml = f.a.split("\n").filter((t) => t.length).map((t) => "<p>" + t + "</p>").join("");
      const answerInner = f.reserveCta
        ? '<div class="faq-answer-row">' + answerHtml + '<a href="https://www.google.com/maps/reserve/v/dine/c/12nKE7lbdag?source=pa&opi=89978449&hl=en-SG&gei=eFdWau2KNPChseMPhNicCQ&sourceurl=https://www.google.com/search?gs_ssp%3DeJzj4tVP1zc0zDYxTsnOis81YLRSNagwNkxJNLQ0NkkzTjS2sDQ2tDKoMDNKskgxTUo2Tk5MM7EwSPFiS0pMzszLBwAXzhGl%26q%3Dbacino%26oq%3Dbacino%26pf%3Dop%26sourceid%3Dchrome%26source%3Dchrome.ob%26ie%3DUTF-8" target="_blank" rel="noopener" class="btn btn-fill reserve-btn faq-reserve-btn"><i class="fa-solid fa-utensils"></i>Reserve a Table</a></div>'
        : answerHtml;
      item.innerHTML =
        '<button type="button" class="faq-question"><span>' + f.q + '</span><span class="faq-icon">+</span></button>' +
        '<div class="faq-answer">' + answerInner + '</div>';
      item.querySelector(".faq-question").addEventListener("click", () => {
        state.faqOpen = state.faqOpen === i ? null : i;
        renderFaq();
      });
      faqListEl.appendChild(item);
    });
  }

  /* ===== Reservation modal ===== */
  const reserveOverlay = document.getElementById("reserve-overlay");
  const reserveModal = reserveOverlay.querySelector(".reserve-modal");
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".reserve-btn");
    if (!btn) return;
    e.preventDefault();
    reserveOverlay.hidden = false;
  });
  document.getElementById("reserve-close").addEventListener("click", () => { reserveOverlay.hidden = true; });
  reserveOverlay.addEventListener("click", () => { reserveOverlay.hidden = true; });
  reserveModal.addEventListener("click", (e) => e.stopPropagation());
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !reserveOverlay.hidden) reserveOverlay.hidden = true;
  });

  /* ===== Init ===== */
  buildHighlights();
  renderMenu();
  renderFaq();
})();
