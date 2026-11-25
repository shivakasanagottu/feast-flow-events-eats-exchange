/**
 * FeastFlow: EventEats Exchange
 * Modern Tabbed Interactive Catering Marketplace & Quote Calculator
 */

// ==========================================
// 1. DATASETS: Caterers, Dishes, Reviews
// ==========================================

const CATERERS = [
  {
    id: "royal-feast",
    name: "Royal Feast Caterers",
    rating: 4.8,
    reviewsCount: 185,
    minPax: 50,
    hygieneGrade: "A+ (FSSAI Verified)",
    specialty: "North Indian, Royal Awadhi & Live Counters",
    tagline: "Premier choice for university banquets and grand college fests.",
    rateMultiplier: 1.0, // Benchmark: ₹450/plate for 100 pax standard menu
    icon: "fa-crown",
    color: "#059669"
  },
  {
    id: "spice-symphony",
    name: "Spice Symphony",
    rating: 4.5,
    reviewsCount: 142,
    minPax: 30,
    hygieneGrade: "A (Audit Certified)",
    specialty: "Multi-Cuisine, Continental & Fusion Street Stalls",
    tagline: "Budget-friendly, high energy catering perfect for club farewells.",
    rateMultiplier: 0.933, // ~ ₹420 vs ₹450
    icon: "fa-pepper-hot",
    color: "#d97706"
  },
  {
    id: "annapurna-grand",
    name: "Annapurna Grand Caterers",
    rating: 4.7,
    reviewsCount: 210,
    minPax: 75,
    hygieneGrade: "A+ (FSSAI Verified)",
    specialty: "100% Pure Vegetarian & Strict Jain Specialists",
    tagline: "Dedicated brassware and zero-cross-contamination guarantee.",
    rateMultiplier: 0.88,
    icon: "fa-leaf",
    color: "#16a34a"
  },
  {
    id: "coastal-charcoal",
    name: "Coastal & Charcoal Grillers",
    rating: 4.6,
    reviewsCount: 98,
    minPax: 40,
    hygieneGrade: "A (Audit Certified)",
    specialty: "Live Tandoor, Mangalorean & Continental BBQ",
    tagline: "Interactive charcoal grills and open fire tandoor setups.",
    rateMultiplier: 1.06,
    icon: "fa-fire-burner",
    color: "#ea580c"
  },
  {
    id: "elite-banquets",
    name: "Elite Corporate Banquets",
    rating: 4.9,
    reviewsCount: 320,
    minPax: 100,
    hygieneGrade: "A+ (Five Star Certified)",
    specialty: "Gourmet Plating, High-Profile Convocations & Galas",
    tagline: "White-glove service staff and premium bespoke chafing sets.",
    rateMultiplier: 1.15,
    icon: "fa-champagne-glasses",
    color: "#2563eb"
  }
];

const DISHES = [
  // --- STARTERS ---
  {
    id: "s1",
    name: "Paneer Malai Tikka",
    course: "starters",
    diet: "veg",
    jainFriendly: true,
    priceWeight: 75,
    desc: "Tender cottage cheese marinated in hung curd, green cardamom & clotted cream."
  },
  {
    id: "s2",
    name: "Crispy Chilli Babycorn",
    course: "starters",
    diet: "veg",
    jainFriendly: false,
    priceWeight: 65,
    desc: "Golden tossed babycorn infused with bell peppers, spring onions & soy glaze."
  },
  {
    id: "s3",
    name: "Dahi Ke Kebab",
    course: "starters",
    diet: "veg",
    jainFriendly: true,
    priceWeight: 70,
    desc: "Melt-in-mouth spiced hung curd patties with a crunchy outer crust."
  },
  {
    id: "s4",
    name: "Hara Bhara Kebab",
    course: "starters",
    diet: "veg",
    jainFriendly: true,
    priceWeight: 60,
    desc: "Spinach, green peas & potato cutlets shallow fried with cashew crowning."
  },
  {
    id: "s5",
    name: "Chicken Tikka Angara",
    course: "starters",
    diet: "nonveg",
    jainFriendly: false,
    priceWeight: 95,
    desc: "Clay-oven smoked boneless chicken chunks steeped in Kashmiri degi mirch."
  },
  {
    id: "s6",
    name: "Amritsari Fish Fry",
    course: "starters",
    diet: "nonveg",
    jainFriendly: false,
    priceWeight: 110,
    desc: "River sole goujons batter-fried with carom seeds and yellow chilli."
  },
  {
    id: "s7",
    name: "Tandoori Malai Soya Chaap",
    course: "starters",
    diet: "veg",
    jainFriendly: true,
    priceWeight: 65,
    desc: "Protein soya chaap tossed in roasted garlic cream and kasoori methi."
  },
  {
    id: "s8",
    name: "Mutton Seekh Kebab",
    course: "starters",
    diet: "nonveg",
    jainFriendly: false,
    priceWeight: 130,
    desc: "Finely minced spiced lamb skewered and broiled over fragrant embers."
  },

  // --- MAINS ---
  {
    id: "m1",
    name: "Dal Makhani Bukhara",
    course: "mains",
    diet: "veg",
    jainFriendly: true,
    priceWeight: 70,
    desc: "Slow-simmered black urad lentils stewed for 18 hours with white butter."
  },
  {
    id: "m2",
    name: "Paneer Butter Masala",
    course: "mains",
    diet: "veg",
    jainFriendly: true,
    priceWeight: 85,
    desc: "Velvety spiced tomato and cashew gravy with soft cottage cheese cubes."
  },
  {
    id: "m3",
    name: "Subz Diwani Handi",
    course: "mains",
    diet: "veg",
    jainFriendly: false,
    priceWeight: 65,
    desc: "Medley of seasonal farm vegetables simmered in an aromatic spinach gravy."
  },
  {
    id: "m4",
    name: "Butter Chicken Masala",
    course: "mains",
    diet: "nonveg",
    jainFriendly: false,
    priceWeight: 125,
    desc: "Shredded tandoori chicken cooked in rich silken tomato-honey-fenugreek reduction."
  },
  {
    id: "m5",
    name: "Mutton Rogan Josh Kashmiri",
    course: "mains",
    diet: "nonveg",
    jainFriendly: false,
    priceWeight: 155,
    desc: "Slow braised tender goat meat cooked with ratan jot and Kashmiri whole spices."
  },
  {
    id: "m6",
    name: "Awadhi Dum Veg Biryani",
    course: "mains",
    diet: "veg",
    jainFriendly: true,
    priceWeight: 75,
    desc: "Long grain basmati layered with saffron milk, seasonal veggies & fried onions."
  },
  {
    id: "m7",
    name: "Lucknowi Chicken Dum Biryani",
    course: "mains",
    diet: "nonveg",
    jainFriendly: false,
    priceWeight: 120,
    desc: "Marinated bone-in chicken slow steam-cooked with aged basmati in sealed deg."
  },
  {
    id: "m8",
    name: "Pindi Chole Masala",
    course: "mains",
    diet: "veg",
    jainFriendly: true,
    priceWeight: 60,
    desc: "Authentic dark rustic chickpeas cooked with dried pomegranate seeds."
  },

  // --- BREADS & RICE ---
  {
    id: "b1",
    name: "Butter Naan & Garlic Naan",
    course: "breadsRice",
    diet: "veg",
    jainFriendly: true,
    priceWeight: 40,
    desc: "Fresh live tandoor bread brushed with melted Amul butter and coriander."
  },
  {
    id: "b2",
    name: "Laccha Paratha & Missi Roti",
    course: "breadsRice",
    diet: "veg",
    jainFriendly: true,
    priceWeight: 35,
    desc: "Multi-layered flaky whole wheat parathas paired with spiced gram flour rotis."
  },
  {
    id: "b3",
    name: "Tandoori Roti Basket",
    course: "breadsRice",
    diet: "veg",
    jainFriendly: true,
    priceWeight: 25,
    desc: "Assortment of crisp plain and buttered wholesome whole wheat rotis."
  },
  {
    id: "b4",
    name: "Jeera Pulao & Peas Rice",
    course: "breadsRice",
    diet: "veg",
    jainFriendly: true,
    priceWeight: 45,
    desc: "Aromatic basmati rice tempered with golden cumin and desi ghee."
  },

  // --- DESSERTS ---
  {
    id: "d1",
    name: "Gulab Jamun with Rabdi",
    course: "desserts",
    diet: "veg",
    jainFriendly: true,
    priceWeight: 50,
    desc: "Hot warm khoya dumplings dunked in cardamom sugar syrup, topped with rabdi."
  },
  {
    id: "d2",
    name: "Angoori Rasmalai",
    course: "desserts",
    diet: "veg",
    jainFriendly: true,
    priceWeight: 65,
    desc: "Delicate cottage cheese patties immersed in saffron-infused chilled sweet milk."
  },
  {
    id: "d3",
    name: "Warm Chocolate Walnut Brownie",
    course: "desserts",
    diet: "veg",
    jainFriendly: true,
    priceWeight: 70,
    desc: "Fudgy Belgian chocolate square served with warm chocolate fudge sauce."
  },
  {
    id: "d4",
    name: "Moong Dal Halwa",
    course: "desserts",
    diet: "veg",
    jainFriendly: true,
    priceWeight: 60,
    desc: "Slow roasted yellow lentils cooked in pure desi ghee with slivered almonds."
  },
  {
    id: "d5",
    name: "Kesar Pista Kulfi Falooda",
    course: "desserts",
    diet: "veg",
    jainFriendly: true,
    priceWeight: 55,
    desc: "Traditional dense churned saffron kulfi slice served with rose falooda."
  },

  // --- LIVE COUNTERS (STRETCH FEATURE) ---
  {
    id: "l1",
    name: "Live Delhi Chaat Stall",
    course: "liveCounters",
    diet: "veg",
    jainFriendly: true,
    priceWeight: 50,
    setupFee: 3500,
    desc: "Live chef station serving Pani Puri, Dahi Bhalla, Papdi Chaat & Aloo Tikki."
  },
  {
    id: "l2",
    name: "Live Italian Pasta Station",
    course: "liveCounters",
    diet: "veg",
    jainFriendly: true,
    priceWeight: 65,
    setupFee: 4500,
    desc: "Custom penne and fusilli cooked live in Alfredo white sauce & Arrabbiata red sauce."
  },
  {
    id: "l3",
    name: "Ice Cream Teppanyaki Cold Stone",
    course: "liveCounters",
    diet: "veg",
    jainFriendly: true,
    priceWeight: 55,
    setupFee: 4000,
    desc: "Sub-zero chilled plate where chefs fold fresh fruits, brownies and toppings live."
  },
  {
    id: "l4",
    name: "South Indian Live Dosa & Chilla Bar",
    course: "liveCounters",
    diet: "veg",
    jainFriendly: true,
    priceWeight: 45,
    setupFee: 3000,
    desc: "Live crisp butter dosas, cheese corn uttapams and moong dal chillas on large tawas."
  }
];

const REVIEWS_DATA = [
  {
    caterer: "Royal Feast Caterers",
    event: "College Department Banquet 2025",
    rating: 5,
    title: "Exact ₹450 per plate match and zero food shortage!",
    review: "Organized our 120-person Mechanical Dept farewell. The paneer tikka and dal makhani tasted like a 5-star hotel banquet. Committee got exact PDF quote approved in 20 minutes.",
    author: "Rohan V., Secretary - SAC",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=500&auto=format&fit=crop&q=60"
  },
  {
    caterer: "Spice Symphony",
    event: "Tech Fest Hackathon Midnight Buffet",
    rating: 4.8,
    title: "Best live chaat & pasta station on campus",
    review: "Feeding 200 tired developers at 1 AM is tough, but Spice Symphony's live counters kept everyone hyped. The 10% volume discount gave us extra budget for morning coffee.",
    author: "Ananya S., Lead Organizer - HackCampus",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&auto=format&fit=crop&q=60"
  },
  {
    caterer: "Annapurna Grand Caterers",
    event: "Alumni Reunion & Golden Jubilee",
    rating: 5,
    title: "100% separate Jain catering without any mixup",
    review: "We had 40 strict Jain trustees attending. Annapurna provided color-coded insulated chafing units and dedicated serving staff. Complete peace of mind.",
    author: "Prof. K. Mehta, Alumni Relations Officer",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&auto=format&fit=crop&q=60"
  }
];

// ==========================================
// 2. APPLICATION STATE
// ==========================================

const state = {
  eventType: "College Fest",
  vegHeadcount: 70,
  nonvegHeadcount: 30,
  jainHeadcount: 0,
  totalHeadcount: 100,
  bufferPercentage: 10, // 10% cushion default
  selectedCatererId: "royal-feast",
  selectedDishes: new Set(["s1", "s2", "m1", "m2", "m3", "b1", "b4", "d1", "d2", "l1"]),
  currentTab: "starters",
  dietFilter: "all",
  searchQuery: "",
  activeMainTab: "tab-calculator",
  tastingRequests: []
};

// ==========================================
// 3. INITIALIZATION & TAB SWITCHER
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  initAuthStatus();
  loadSavedBookings();
  initTabsNavigation();
  initEventProfiler();
  initCourseTabs();
  initFilters();
  initDemoPresets();
  initTastingForm();
  renderDishes();
  renderCaterers();
  renderReviews();
  renderSelectedSummaryPills();
  renderComparisonMatrix();
  renderBookingsHistory();
  recalculateAll();
});

// Tab Switcher function
function switchTab(tabId) {
  state.activeMainTab = tabId;

  // Update tabs buttons
  const tabButtons = document.querySelectorAll("#mainTabsBar .tab-btn");
  tabButtons.forEach(btn => {
    if (btn.getAttribute("data-tab") === tabId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Update tab panels
  const panels = document.querySelectorAll(".tab-panel");
  panels.forEach(panel => {
    if (panel.id === tabId) {
      panel.classList.add("active");
    } else {
      panel.classList.remove("active");
    }
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function initTabsNavigation() {
  const tabButtons = document.querySelectorAll("#mainTabsBar .tab-btn");
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-tab");
      switchTab(targetTab);
    });
  });

  // Top nav action
  const topExportBtn = document.getElementById("topExportQuoteBtn");
  if (topExportBtn) {
    topExportBtn.addEventListener("click", () => {
      switchTab("tab-escrow");
      const target = document.getElementById("printableQuotation");
      if (target) {
        setTimeout(() => target.scrollIntoView({ behavior: "smooth" }), 200);
      }
    });
  }
}

// Load stored tasting bookings from LocalStorage
function loadSavedBookings() {
  try {
    const saved = localStorage.getItem("feastflow_tastings");
    if (saved) {
      state.tastingRequests = JSON.parse(saved);
      updateBookingBadges();
    }
  } catch (e) {
    console.error("Failed to load tastings", e);
  }
}

function updateBookingBadges() {
  const count = state.tastingRequests.length;
  const badge = document.getElementById("tabTastingCountBadge");
  if (badge) badge.textContent = count;
}

// ==========================================
// 4. EVENT PROFILER & HEADCOUNT LOGIC
// ==========================================

function initEventProfiler() {
  // Occasion selector
  const radioPills = document.querySelectorAll("#eventTypeGroup .pill-radio");
  radioPills.forEach(pill => {
    pill.addEventListener("click", () => {
      radioPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      const input = pill.querySelector("input");
      if (input) {
        input.checked = true;
        state.eventType = input.value;
        recalculateAll();
      }
    });
  });

  // Headcount range slider
  const slider = document.getElementById("headcountSlider");
  const vegInput = document.getElementById("vegHeadcount");
  const nonvegInput = document.getElementById("nonvegHeadcount");
  const jainInput = document.getElementById("jainHeadcount");

  slider.addEventListener("input", (e) => {
    const newTotal = parseInt(e.target.value, 10);
    const oldTotal = state.vegHeadcount + state.nonvegHeadcount;
    const vegRatio = oldTotal > 0 ? (state.vegHeadcount / oldTotal) : 0.7;
    state.vegHeadcount = Math.round(newTotal * vegRatio);
    state.nonvegHeadcount = newTotal - state.vegHeadcount;
    vegInput.value = state.vegHeadcount;
    nonvegInput.value = state.nonvegHeadcount;
    state.totalHeadcount = newTotal;
    recalculateAll();
  });

  // Plus / Minus counters
  document.getElementById("vegMinusBtn").addEventListener("click", () => adjustDietCount("veg", -5));
  document.getElementById("vegPlusBtn").addEventListener("click", () => adjustDietCount("veg", +5));
  document.getElementById("nonvegMinusBtn").addEventListener("click", () => adjustDietCount("nonveg", -5));
  document.getElementById("nonvegPlusBtn").addEventListener("click", () => adjustDietCount("nonveg", +5));
  document.getElementById("jainMinusBtn").addEventListener("click", () => adjustDietCount("jain", -5));
  document.getElementById("jainPlusBtn").addEventListener("click", () => adjustDietCount("jain", +5));

  vegInput.addEventListener("change", (e) => {
    state.vegHeadcount = Math.max(0, parseInt(e.target.value, 10) || 0);
    syncTotalHeadcount();
  });
  nonvegInput.addEventListener("change", (e) => {
    state.nonvegHeadcount = Math.max(0, parseInt(e.target.value, 10) || 0);
    syncTotalHeadcount();
  });
  jainInput.addEventListener("change", (e) => {
    state.jainHeadcount = Math.max(0, parseInt(e.target.value, 10) || 0);
    syncTotalHeadcount();
  });

  // Food Security Buffer Pills
  const bufferPills = document.querySelectorAll("#bufferPills .buffer-btn");
  bufferPills.forEach(pill => {
    pill.addEventListener("click", () => {
      bufferPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      state.bufferPercentage = parseInt(pill.getAttribute("data-buffer"), 10);
      recalculateAll();
    });
  });
}

function adjustDietCount(diet, delta) {
  if (diet === "veg") {
    state.vegHeadcount = Math.max(0, state.vegHeadcount + delta);
    document.getElementById("vegHeadcount").value = state.vegHeadcount;
  } else if (diet === "nonveg") {
    state.nonvegHeadcount = Math.max(0, state.nonvegHeadcount + delta);
    document.getElementById("nonvegHeadcount").value = state.nonvegHeadcount;
  } else if (diet === "jain") {
    state.jainHeadcount = Math.max(0, state.jainHeadcount + delta);
    document.getElementById("jainHeadcount").value = state.jainHeadcount;
  }
  syncTotalHeadcount();
}

function syncTotalHeadcount() {
  state.totalHeadcount = state.vegHeadcount + state.nonvegHeadcount;
  const slider = document.getElementById("headcountSlider");
  slider.value = Math.min(500, Math.max(25, state.totalHeadcount));
  recalculateAll();
}

// ==========================================
// 5. COURSE TABS & MENU SELECTION
// ==========================================

function initCourseTabs() {
  const tabs = document.querySelectorAll("#courseTabs .course-subtab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      state.currentTab = tab.getAttribute("data-target");
      renderDishes();
    });
  });
}

function initFilters() {
  const searchInput = document.getElementById("dishSearchInput");
  searchInput.addEventListener("input", (e) => {
    state.searchQuery = e.target.value.toLowerCase().trim();
    renderDishes();
  });

  const filterBtns = document.querySelectorAll("#dietFilterGroup .diet-toggle-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.dietFilter = btn.getAttribute("data-diet");
      renderDishes();
    });
  });
}

function renderDishes() {
  const container = document.getElementById("dishesGrid");
  container.innerHTML = "";

  const filtered = DISHES.filter(dish => {
    const matchesTab = dish.course === state.currentTab;
    const matchesSearch = !state.searchQuery || dish.name.toLowerCase().includes(state.searchQuery) || dish.desc.toLowerCase().includes(state.searchQuery);
    let matchesDiet = true;
    if (state.dietFilter === "veg") matchesDiet = dish.diet === "veg";
    if (state.dietFilter === "nonveg") matchesDiet = dish.diet === "nonveg";
    if (state.dietFilter === "jain") matchesDiet = dish.jainFriendly;

    return matchesTab && matchesSearch && matchesDiet;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 2.5rem; color: var(--slate-400);">
        <i class="fa-solid fa-utensils" style="font-size: 2rem; margin-bottom: 0.5rem; display: block;"></i>
        No dishes found matching your current search or diet filter.
      </div>
    `;
    return;
  }

  filtered.forEach(dish => {
    const isSelected = state.selectedDishes.has(dish.id);
    const card = document.createElement("div");
    card.className = `dish-card ${isSelected ? 'selected' : ''}`;
    
    let dietBadgeClass = "tag-veg";
    let dietSymbol = "●";
    let dietLabel = "Veg";
    if (dish.diet === "nonveg") {
      dietBadgeClass = "tag-nonveg";
      dietSymbol = "▲";
      dietLabel = "Non-Veg";
    }
    if (dish.course === "liveCounters") {
      dietBadgeClass = "tag-live";
      dietSymbol = "★";
      dietLabel = "Live Stall";
    }

    card.innerHTML = `
      <div>
        <div class="dish-top-row">
          <div class="dish-title">
            <span class="diet-symbol ${dish.diet === 'veg' ? 'veg-symbol' : 'nonveg-symbol'}">${dietSymbol}</span>
            <span>${dish.name}</span>
          </div>
          <div class="dish-check">
            <i class="fa-solid fa-check"></i>
          </div>
        </div>
        <p class="dish-desc">${dish.desc}</p>
      </div>
      <div class="dish-bottom-row">
        <span class="dish-weight-price">₹${dish.priceWeight} <small style="font-weight: normal; color: var(--slate-500); font-size: 0.72rem;">/plate weight</small></span>
        <span class="dish-diet-pill ${dietBadgeClass}">${dish.jainFriendly && dish.diet === 'veg' ? 'Jain Ready' : dietLabel}</span>
      </div>
    `;

    card.addEventListener("click", () => {
      toggleDishSelection(dish.id);
    });

    container.appendChild(card);
  });

  updateTabCounts();
}

function toggleDishSelection(dishId) {
  if (state.selectedDishes.has(dishId)) {
    state.selectedDishes.delete(dishId);
  } else {
    state.selectedDishes.add(dishId);
  }
  renderDishes();
  renderSelectedSummaryPills();
  recalculateAll();
}

function updateTabCounts() {
  const counts = {
    starters: 0,
    mains: 0,
    breadsRice: 0,
    desserts: 0,
    liveCounters: 0
  };

  state.selectedDishes.forEach(id => {
    const dish = DISHES.find(d => d.id === id);
    if (dish && counts[dish.course] !== undefined) {
      counts[dish.course]++;
    }
  });

  document.getElementById("count-starters").textContent = counts.starters;
  document.getElementById("count-mains").textContent = counts.mains;
  document.getElementById("count-breadsRice").textContent = counts.breadsRice;
  document.getElementById("count-desserts").textContent = counts.desserts;
  document.getElementById("count-liveCounters").textContent = counts.liveCounters;
  document.getElementById("tabMenuCountBadge").textContent = state.selectedDishes.size;
  document.getElementById("totalSelectedMenuCount").textContent = `${state.selectedDishes.size} Items`;
}

function renderSelectedSummaryPills() {
  const container = document.getElementById("selectedSummaryPills");
  container.innerHTML = "";

  if (state.selectedDishes.size === 0) {
    container.innerHTML = `<span style="font-size: 0.8rem; color: var(--slate-400);">No dishes selected yet. Select items from the list above.</span>`;
    return;
  }

  state.selectedDishes.forEach(id => {
    const dish = DISHES.find(d => d.id === id);
    if (!dish) return;

    const bubble = document.createElement("span");
    bubble.className = "tag-bubble";
    bubble.innerHTML = `
      <span>${dish.name}</span>
      <button type="button" class="remove-bubble-btn" title="Remove">&times;</button>
    `;

    bubble.querySelector(".remove-bubble-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDishSelection(dish.id);
    });

    container.appendChild(bubble);
  });
}

// ==========================================
// 6. PRICING & VOLUME DISCOUNT CALCULATION
// ==========================================

function getVolumeDiscount(guests) {
  if (guests >= 350) return { percent: 15, label: "15% Mega Gathering Tier" };
  if (guests >= 200) return { percent: 10, label: "10% Scale Economy Tier" };
  if (guests >= 100) return { percent: 5, label: "5% Mid-Volume Tier" };
  return { percent: 0, label: "Standard Rate (Below 100)" };
}

function calculateQuoteForCaterer(caterer) {
  const totalGuests = Math.max(1, state.totalHeadcount);
  const vegGuests = state.vegHeadcount;
  const nonvegGuests = state.nonvegHeadcount;
  const bufferPercent = state.bufferPercentage;
  const bufferMultiplier = 1 + (bufferPercent / 100);

  let foodItemsSum = 0;
  let liveCountersEquipmentFee = 0;
  let starterCount = 0;
  let mainCount = 0;
  let dessertCount = 0;

  state.selectedDishes.forEach(dishId => {
    const dish = DISHES.find(d => d.id === dishId);
    if (!dish) return;

    if (dish.course === "starters") starterCount++;
    if (dish.course === "mains") mainCount++;
    if (dish.course === "desserts") dessertCount++;

    if (dish.course === "liveCounters") {
      liveCountersEquipmentFee += (dish.setupFee || 3500);
      foodItemsSum += dish.priceWeight;
    } else if (dish.diet === "nonveg") {
      const nonvegRatio = nonvegGuests / totalGuests;
      foodItemsSum += (dish.priceWeight * nonvegRatio);
    } else {
      foodItemsSum += dish.priceWeight;
    }
  });

  const adjustedFoodRate = foodItemsSum * caterer.rateMultiplier;
  const baseFoodSubtotal = Math.round(adjustedFoodRate * totalGuests * bufferMultiplier);

  const volumeDiscount = getVolumeDiscount(totalGuests);
  const discountMultiplier = volumeDiscount.percent / 100;
  const discountAmount = Math.round(baseFoodSubtotal * discountMultiplier);
  const discountedFoodTotal = baseFoodSubtotal - discountAmount;

  // Equipment & Staff service charges (8%)
  const serviceCharge = Math.round((discountedFoodTotal + liveCountersEquipmentFee) * 0.08);

  // GST 5% for catering services
  const taxableTotal = discountedFoodTotal + liveCountersEquipmentFee + serviceCharge;
  const gst = Math.round(taxableTotal * 0.05);

  const grandTotal = taxableTotal + gst;
  const perPlateCost = Math.round(grandTotal / totalGuests);

  // 3-tier Escrow milestone payment simulator (20% - 50% - 30%)
  const advanceEscrow = Math.round(grandTotal * 0.20);
  const eventDayEscrow = Math.round(grandTotal * 0.50);
  const settlementEscrow = grandTotal - advanceEscrow - eventDayEscrow;

  return {
    caterer,
    totalGuests,
    bufferMultiplier,
    bufferPercent,
    effectivePlatesPrepared: Math.ceil(totalGuests * bufferMultiplier),
    baseFoodSubtotal,
    volumeDiscount,
    discountAmount,
    liveCountersEquipmentFee,
    serviceCharge,
    gst,
    grandTotal,
    perPlateCost,
    advanceEscrow,
    eventDayEscrow,
    settlementEscrow,
    starterCount,
    mainCount,
    dessertCount
  };
}

function recalculateAll() {
  const activeCaterer = CATERERS.find(c => c.id === state.selectedCatererId) || CATERERS[0];
  const quote = calculateQuoteForCaterer(activeCaterer);

  // Top Nav Live Quote Pill
  document.getElementById("navPerPlateVal").textContent = `₹${quote.perPlateCost}`;
  document.getElementById("navTotalVal").textContent = `Total: ₹${quote.grandTotal.toLocaleString("en-IN")}`;

  // Banner tags
  document.getElementById("bannerPaxTag").textContent = `${quote.totalGuests} Guests (${state.vegHeadcount} Veg + ${state.nonvegHeadcount} Non-Veg)`;
  document.getElementById("bannerBufferTag").textContent = `+${quote.bufferPercent}% Buffer Cushion`;
  document.getElementById("bannerVendorTag").textContent = activeCaterer.name;

  // Tab 1 Headcount & Volume Discount UI
  document.getElementById("totalGuestsDisplay").textContent = `${quote.totalGuests} Guests`;
  document.getElementById("bufferPercentDisplay").textContent = quote.bufferPercent;
  document.getElementById("bufferPlatesDisplay").textContent = `${quote.effectivePlatesPrepared} Plates`;
  document.getElementById("bufferGuestCount").textContent = `${quote.effectivePlatesPrepared - quote.totalGuests} extra guests`;

  const volumeDiscountBadge = document.getElementById("volumeDiscountBadge");
  if (quote.volumeDiscount.percent > 0) {
    volumeDiscountBadge.innerHTML = `<i class="fa-solid fa-tag"></i> ${quote.volumeDiscount.label}`;
  } else {
    volumeDiscountBadge.innerHTML = `<i class="fa-solid fa-info-circle"></i> Standard Rate (100+ gets 5% off)`;
  }

  // Right Mini Preview Card (Tab 1)
  document.getElementById("miniActiveCaterer").textContent = activeCaterer.name;
  document.getElementById("miniPerPlateCost").textContent = `₹${quote.perPlateCost}`;
  document.getElementById("miniTotalEventCost").textContent = `₹${quote.grandTotal.toLocaleString("en-IN")}`;
  document.getElementById("miniGuestNote").textContent = `For ${quote.totalGuests} Guests`;
  document.getElementById("miniItemCount").textContent = state.selectedDishes.size;
  document.getElementById("miniFoodSubtotal").textContent = `₹${quote.baseFoodSubtotal.toLocaleString("en-IN")}`;
  document.getElementById("miniDiscountPct").textContent = `${quote.volumeDiscount.percent}%`;
  document.getElementById("miniDiscountAmt").textContent = `-₹${quote.discountAmount.toLocaleString("en-IN")}`;
  document.getElementById("miniLiveFee").textContent = `₹${quote.liveCountersEquipmentFee.toLocaleString("en-IN")}`;
  document.getElementById("miniServiceFee").textContent = `₹${quote.serviceCharge.toLocaleString("en-IN")}`;
  document.getElementById("miniGstFee").textContent = `₹${quote.gst.toLocaleString("en-IN")}`;
  document.getElementById("miniGrandTotal").textContent = `₹${quote.grandTotal.toLocaleString("en-IN")}`;

  if (quote.volumeDiscount.percent > 0) {
    document.getElementById("miniSavingsNote").textContent = `Saved ₹${Math.round(quote.discountAmount / quote.totalGuests)}/plate`;
    document.getElementById("miniDiscountLine").style.display = "flex";
  } else {
    document.getElementById("miniSavingsNote").textContent = "100+ guests gets 5% discount";
    document.getElementById("miniDiscountLine").style.display = "none";
  }

  // Tab 6 Escrow Milestones
  document.getElementById("escrowAdvanceVal").textContent = `₹${quote.advanceEscrow.toLocaleString("en-IN")}`;
  document.getElementById("escrowEventDayVal").textContent = `₹${quote.eventDayEscrow.toLocaleString("en-IN")}`;
  document.getElementById("escrowSettlementVal").textContent = `₹${quote.settlementEscrow.toLocaleString("en-IN")}`;

  renderCaterers();
  renderComparisonMatrix();
  updatePdfQuotation(quote);
}

// ==========================================
// 7. CATERERS DIRECTORY & COMPARISON MATRIX
// ==========================================

function renderCaterers() {
  const container = document.getElementById("caterersList");
  if (!container) return;
  container.innerHTML = "";

  CATERERS.forEach(caterer => {
    const quote = calculateQuoteForCaterer(caterer);
    const isSelected = caterer.id === state.selectedCatererId;

    const card = document.createElement("div");
    card.className = `caterer-item-card ${isSelected ? 'active-selected' : ''}`;
    
    card.innerHTML = `
      <div class="caterer-avatar">
        <i class="fa-solid ${caterer.icon}"></i>
      </div>
      <div class="caterer-details">
        <h3>
          ${caterer.name} 
          <i class="fa-solid fa-circle-check" style="color:var(--primary); font-size:0.9rem;" title="Verified"></i>
          ${isSelected ? '<span class="tab-pill-badge badge-green">Active Selection</span>' : ''}
        </h3>
        <div class="rating-row">
          <span class="gold-star"><i class="fa-solid fa-star"></i> ${caterer.rating}</span>
          <span>(${caterer.reviewsCount} reviews)</span>
          <span>•</span>
          <span>Min ${caterer.minPax} Guests</span>
          <span>•</span>
          <span class="hygiene-badge"><i class="fa-solid fa-shield-virus"></i> ${caterer.hygieneGrade}</span>
        </div>
        <p style="font-size: 0.8rem; color: var(--slate-600); margin-bottom: 0.25rem;">${caterer.specialty}</p>
        <p style="font-size: 0.75rem; color: var(--slate-400);">${caterer.tagline}</p>
      </div>
      <div class="caterer-quote-box">
        <div class="caterer-per-plate">₹${quote.perPlateCost} <span>/ plate</span></div>
        <div style="font-size:0.82rem; color:var(--slate-500); margin-bottom:0.4rem;">Total: ₹${quote.grandTotal.toLocaleString("en-IN")}</div>
        <div style="display:flex; gap:0.4rem;">
          ${isSelected ? 
            `<button class="btn btn-outline btn-sm" disabled style="opacity:0.8;"><i class="fa-solid fa-check"></i> Selected</button>` : 
            `<button class="btn btn-primary btn-sm select-cat-btn" data-id="${caterer.id}"><i class="fa-solid fa-check"></i> Select</button>`
          }
          <button class="btn btn-secondary btn-sm tasting-cat-btn" data-id="${caterer.id}">
            <i class="fa-solid fa-utensils"></i> Book Tasting
          </button>
        </div>
      </div>
    `;

    const selectBtn = card.querySelector(".select-cat-btn");
    if (selectBtn) {
      selectBtn.addEventListener("click", () => {
        state.selectedCatererId = caterer.id;
        recalculateAll();
        showToast(`Selected ${caterer.name} as your event caterer!`);
      });
    }

    const tastingBtn = card.querySelector(".tasting-cat-btn");
    if (tastingBtn) {
      tastingBtn.addEventListener("click", () => {
        state.selectedCatererId = caterer.id;
        populateTastingSelect(caterer.id);
        switchTab("tab-tasting");
      });
    }

    container.appendChild(card);
  });
}

function renderComparisonMatrix() {
  const container = document.getElementById("comparisonTableWrapper");
  if (!container) return;

  const compareVendors = [
    CATERERS.find(c => c.id === "royal-feast"),
    CATERERS.find(c => c.id === "spice-symphony"),
    CATERERS.find(c => c.id === "annapurna-grand")
  ];

  const quotes = compareVendors.map(v => calculateQuoteForCaterer(v));

  let tableHtml = `
    <table class="matrix-table">
      <thead>
        <tr>
          <th style="width: 240px;">Feature / Criteria</th>
          ${quotes.map(q => `
            <th class="${q.caterer.id === state.selectedCatererId ? 'active-col' : ''}">
              <div class="matrix-vendor-head">
                <h4>${q.caterer.name}</h4>
                <div class="matrix-price">₹${q.perPlateCost} <span style="font-size:0.75rem; color:var(--slate-500); font-weight:normal;">/ plate</span></div>
                <div style="font-size:0.75rem; color:var(--slate-600);">Total: ₹${q.grandTotal.toLocaleString("en-IN")}</div>
                ${q.caterer.id === state.selectedCatererId ? '<span class="tab-pill-badge badge-green" style="margin-top:4px; display:inline-block;">Active Choice</span>' : ''}
              </div>
            </th>
          `).join('')}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Host Rating & Reviews</strong></td>
          ${compareVendors.map(v => `
            <td><strong style="color:#eab308;"><i class="fa-solid fa-star"></i> ${v.rating}</strong> (${v.reviewsCount} reviews)</td>
          `).join('')}
        </tr>
        <tr>
          <td><strong>Food Hygiene Audit Grade</strong></td>
          ${compareVendors.map(v => `
            <td><span class="badge-approved">${v.hygieneGrade}</span></td>
          `).join('')}
        </tr>
        <tr>
          <td><strong>Min Guest Capacity</strong></td>
          ${compareVendors.map(v => `
            <td>${v.minPax} Guests</td>
          `).join('')}
        </tr>
        <tr>
          <td><strong>Selected Menu Inclusions</strong></td>
          ${quotes.map(q => `
            <td>${q.starterCount} Starters, ${q.mainCount} Mains, ${q.dessertCount} Desserts + Live Stall</td>
          `).join('')}
        </tr>
        <tr>
          <td><strong>Volume Bulk Discount</strong></td>
          ${quotes.map(q => `
            <td style="color:#15803d; font-weight:700;">-${q.volumeDiscount.percent}% (-₹${q.discountAmount.toLocaleString("en-IN")})</td>
          `).join('')}
        </tr>
        <tr>
          <td><strong>3-Tier Escrow Milestones</strong></td>
          ${quotes.map(q => `
            <td>
              <div style="font-size:0.75rem;">
                <div>20% Advance: ₹${q.advanceEscrow.toLocaleString("en-IN")}</div>
                <div>50% Event Day: ₹${q.eventDayEscrow.toLocaleString("en-IN")}</div>
                <div>30% Post-Event: ₹${q.settlementEscrow.toLocaleString("en-IN")}</div>
              </div>
            </td>
          `).join('')}
        </tr>
        <tr>
          <td><strong>Decision Action</strong></td>
          ${quotes.map(q => `
            <td>
              <div style="display:flex; flex-direction:column; gap:0.4rem;">
                <button class="btn ${q.caterer.id === state.selectedCatererId ? 'btn-outline' : 'btn-primary'} btn-sm matrix-pick-btn" data-id="${q.caterer.id}">
                  ${q.caterer.id === state.selectedCatererId ? '<i class="fa-solid fa-check"></i> Selected' : 'Choose This Caterer'}
                </button>
                <button class="btn btn-secondary btn-sm matrix-taste-btn" data-id="${q.caterer.id}">
                  <i class="fa-solid fa-calendar-plus"></i> Book Tasting
                </button>
              </div>
            </td>
          `).join('')}
        </tr>
      </tbody>
    </table>
  `;

  container.innerHTML = tableHtml;

  container.querySelectorAll(".matrix-pick-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      state.selectedCatererId = id;
      recalculateAll();
      showToast(`Selected ${id} as your active caterer!`);
    });
  });

  container.querySelectorAll(".matrix-taste-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      state.selectedCatererId = id;
      populateTastingSelect(id);
      switchTab("tab-tasting");
    });
  });
}

// ==========================================
// 8. TASTING SESSION BOOKING (TAB 5)
// ==========================================

function populateTastingSelect(catererId) {
  const select = document.getElementById("tastingCatererSelect");
  if (!select) return;
  select.innerHTML = "";
  CATERERS.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = `${c.name} (${c.rating}★)`;
    if (c.id === catererId) opt.selected = true;
    select.appendChild(opt);
  });

  // Populate sample dishes selector
  const sampleDishesContainer = document.getElementById("tastingSampleDishes");
  if (!sampleDishesContainer) return;
  sampleDishesContainer.innerHTML = "";
  
  state.selectedDishes.forEach(id => {
    const dish = DISHES.find(d => d.id === id);
    if (!dish) return;

    const label = document.createElement("label");
    label.className = "tasting-checkbox-item";
    label.innerHTML = `
      <input type="checkbox" name="sampleDish" value="${dish.name}" checked>
      <span>${dish.name} (${dish.course})</span>
    `;
    sampleDishesContainer.appendChild(label);
  });
}

function initTastingForm() {
  populateTastingSelect(state.selectedCatererId);

  // Set default date to 2 days ahead
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 2);
  const dateInput = document.getElementById("tastingDate");
  if (dateInput) {
    dateInput.value = defaultDate.toISOString().split("T")[0];
  }

  const form = document.getElementById("tastingBookingForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const catererId = document.getElementById("tastingCatererSelect").value;
      const caterer = CATERERS.find(c => c.id === catererId);
      const date = document.getElementById("tastingDate").value;
      const slot = document.getElementById("tastingTimeSlot").value;
      const venue = document.getElementById("tastingVenueSelect").value;
      const organizer = document.getElementById("tastingOrganizerName").value;
      const phone = document.getElementById("tastingPhone").value;

      const selectedSamples = [];
      document.querySelectorAll('input[name="sampleDish"]:checked').forEach(cb => {
        selectedSamples.push(cb.value);
      });

      const newBooking = {
        bookingId: "TB-" + Math.floor(100000 + Math.random() * 900000),
        catererName: caterer ? caterer.name : "Caterer",
        catererId,
        date,
        slot,
        venue,
        organizer,
        phone,
        dishes: selectedSamples,
        status: "Confirmed (Chef Scheduled)",
        createdAt: new Date().toLocaleDateString("en-IN")
      };

      state.tastingRequests.unshift(newBooking);
      try {
        localStorage.setItem("feastflow_tastings", JSON.stringify(state.tastingRequests));
      } catch (err) {
        console.error(err);
      }

      updateBookingBadges();
      renderBookingsHistory();
      showToast(`Food tasting session booked with ${newBooking.catererName}!`);
    });
  }
}

function renderBookingsHistory() {
  const container = document.getElementById("bookingsHistoryList");
  if (!container) return;
  container.innerHTML = "";

  if (state.tastingRequests.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: var(--slate-400);">
        <i class="fa-solid fa-calendar-xmark" style="font-size: 2rem; margin-bottom: 0.5rem; display: block;"></i>
        No tasting sessions scheduled yet. Complete the form to request a session.
      </div>
    `;
    return;
  }

  state.tastingRequests.forEach(item => {
    const div = document.createElement("div");
    div.className = "tasting-card-item";
    div.innerHTML = `
      <div class="tasting-card-head">
        <strong>${item.catererName}</strong>
        <span class="badge-status-confirmed"><i class="fa-solid fa-check"></i> ${item.status}</span>
      </div>
      <p style="font-size: 0.82rem; margin-bottom: 0.25rem;">
        <strong>Booking Ref:</strong> ${item.bookingId} | <strong>Date:</strong> ${item.date} (${item.slot})
      </p>
      <p style="font-size: 0.8rem; color: var(--slate-600); margin-bottom: 0.25rem;">
        <strong>Venue:</strong> ${item.venue}
      </p>
      <p style="font-size: 0.8rem; color: var(--slate-600); margin-bottom: 0.25rem;">
        <strong>Sample Dishes:</strong> ${item.dishes.join(", ") || "Chef's Tasting Bento"}
      </p>
      <div style="font-size: 0.72rem; color: var(--slate-400); margin-top: 0.4rem;">
        Organizer: ${item.organizer} (${item.phone})
      </div>
    `;
    container.appendChild(div);
  });
}

// ==========================================
// 9. DIGITAL QUOTATION PDF EXPORT (TAB 6)
// ==========================================

function updatePdfQuotation(quote) {
  const quoteRef = document.getElementById("pdfQuoteRef");
  if (!quoteRef) return;

  quoteRef.textContent = "FF-CQ-" + Math.floor(1000 + Math.random() * 9000);
  document.getElementById("pdfQuoteDate").textContent = new Date().toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric"
  });
  document.getElementById("pdfOccasion").textContent = `${state.eventType} Banquet`;
  document.getElementById("pdfHeadcount").textContent = `${quote.totalGuests} Guests (${state.vegHeadcount} Veg, ${state.nonvegHeadcount} Non-Veg${state.jainHeadcount > 0 ? `, ${state.jainHeadcount} Jain` : ''})`;
  document.getElementById("pdfBuffer").textContent = `+${quote.bufferPercent}% Security Cushion (${quote.effectivePlatesPrepared} Total Prepared)`;
  document.getElementById("pdfCatererName").textContent = quote.caterer.name;

  const tbody = document.getElementById("pdfMenuTableBody");
  tbody.innerHTML = "";

  const courseNames = {
    starters: "Appetizers & Starters",
    mains: "Main Course Dishes",
    breadsRice: "Breads & Fragrant Rice",
    desserts: "Sweet Desserts",
    liveCounters: "Live Interactive Stalls"
  };

  ["starters", "mains", "breadsRice", "desserts", "liveCounters"].forEach(courseKey => {
    const items = [];
    state.selectedDishes.forEach(id => {
      const d = DISHES.find(dish => dish.id === id);
      if (d && d.course === courseKey) items.push(d);
    });

    if (items.length > 0) {
      items.forEach((item, idx) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${idx === 0 ? `<strong>${courseNames[courseKey]}</strong>` : ''}</td>
          <td>${item.name}</td>
          <td><span class="dish-diet-pill ${item.diet === 'veg' ? 'tag-veg' : 'tag-nonveg'}">${item.diet.toUpperCase()}</span></td>
          <td>₹${item.priceWeight} ${item.setupFee ? `(+₹${item.setupFee} setup)` : ''}</td>
        `;
        tbody.appendChild(tr);
      });
    }
  });

  // Sheet Financials
  document.getElementById("pdfBaseSubtotal").textContent = `₹${quote.baseFoodSubtotal.toLocaleString("en-IN")}`;
  document.getElementById("pdfDiscountPercent").textContent = `${quote.volumeDiscount.percent}%`;
  document.getElementById("pdfDiscountAmt").textContent = `-₹${quote.discountAmount.toLocaleString("en-IN")}`;
  document.getElementById("pdfLiveStallsAmt").textContent = `₹${quote.liveCountersEquipmentFee.toLocaleString("en-IN")}`;
  document.getElementById("pdfServiceChargeAmt").textContent = `₹${quote.serviceCharge.toLocaleString("en-IN")}`;
  document.getElementById("pdfGstAmt").textContent = `₹${quote.gst.toLocaleString("en-IN")}`;
  document.getElementById("pdfGrandTotalAmt").textContent = `₹${quote.grandTotal.toLocaleString("en-IN")}`;
  document.getElementById("pdfEffectivePerPlate").textContent = `₹${quote.perPlateCost} / Plate`;

  // Milestone Escrow
  document.getElementById("pdfAdvanceAmt").textContent = `₹${quote.advanceEscrow.toLocaleString("en-IN")}`;
  document.getElementById("pdfEventDayAmt").textContent = `₹${quote.eventDayEscrow.toLocaleString("en-IN")}`;
  document.getElementById("pdfSettlementAmt").textContent = `₹${quote.settlementEscrow.toLocaleString("en-IN")}`;
}

// ==========================================
// 10. REVIEWS & SHOWCASE SECTION (TAB 7)
// ==========================================

function renderReviews() {
  const container = document.getElementById("reviewsGrid");
  if (!container) return;
  container.innerHTML = "";

  REVIEWS_DATA.forEach(rev => {
    const card = document.createElement("div");
    card.className = "review-item-card";
    card.innerHTML = `
      <img src="${rev.image}" alt="${rev.event}" class="review-card-img" onerror="this.src='https://images.unsplash.com/photo-1555244162-803834f70033?w=500&auto=format&fit=crop&q=60'">
      <div class="review-card-body">
        <span class="review-event-pill">${rev.event}</span>
        <div style="color: #eab308; font-size: 0.8rem; margin: 0.2rem 0;">
          ${'<i class="fa-solid fa-star"></i>'.repeat(Math.floor(rev.rating))}
        </div>
        <h4 class="review-card-title">${rev.title}</h4>
        <p class="review-card-text">"${rev.review}"</p>
        <div class="review-card-author">
          <span>${rev.author}</span> • <span style="color: var(--primary);">${rev.caterer}</span>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// ==========================================
// 11. DEMO PRESETS (HACKATHON QUICK-LOAD)
// ==========================================

function initDemoPresets() {
  const banquetBtn = document.getElementById("demoBanquetBtn");
  const farewellBtn = document.getElementById("demoFarewellBtn");
  const corpBtn = document.getElementById("demoCorpBtn");

  const presetBtns = [banquetBtn, farewellBtn, corpBtn];

  // Preset 1: 100-Pax College Banquet (Exactly as specified in Problem Brief: 2 Starters, 3 Mains, 2 Desserts)
  banquetBtn.addEventListener("click", () => {
    setActivePresetBtn(banquetBtn);
    loadPreset({
      eventType: "College Fest",
      vegHeadcount: 70,
      nonvegHeadcount: 30,
      jainHeadcount: 0,
      bufferPercentage: 10,
      catererId: "royal-feast",
      dishes: ["s1", "s2", "m1", "m2", "m3", "b1", "b4", "d1", "d2", "l1"]
    });
    showToast("Loaded Problem Brief Demo: 100-Pax College Banquet (₹450/plate)");
  });

  // Preset 2: 150-Pax Farewell Dinner (Step 10 requirement in Brief)
  farewellBtn.addEventListener("click", () => {
    setActivePresetBtn(farewellBtn);
    loadPreset({
      eventType: "College Fest",
      vegHeadcount: 100,
      nonvegHeadcount: 50,
      jainHeadcount: 10,
      bufferPercentage: 10,
      catererId: "spice-symphony",
      dishes: ["s1", "s3", "s5", "m1", "m2", "m4", "b1", "b2", "d1", "d3", "l1", "l2"]
    });
    showToast("Loaded Step 10 Demo: 150-Pax College Farewell Dinner");
  });

  // Preset 3: 250-Pax Corporate Gala
  corpBtn.addEventListener("click", () => {
    setActivePresetBtn(corpBtn);
    loadPreset({
      eventType: "Corporate Banquet",
      vegHeadcount: 170,
      nonvegHeadcount: 80,
      jainHeadcount: 15,
      bufferPercentage: 15,
      catererId: "elite-banquets",
      dishes: ["s1", "s5", "s6", "s8", "m1", "m4", "m5", "m7", "b1", "b4", "d2", "d3", "l2", "l3"]
    });
    showToast("Loaded 250-Pax Corporate Gala with Live Stations");
  });

  function setActivePresetBtn(activeBtn) {
    presetBtns.forEach(b => b.classList.remove("active"));
    activeBtn.classList.add("active");
  }
}

function loadPreset(config) {
  state.eventType = config.eventType;
  state.vegHeadcount = config.vegHeadcount;
  state.nonvegHeadcount = config.nonvegHeadcount;
  state.jainHeadcount = config.jainHeadcount;
  state.totalHeadcount = config.vegHeadcount + config.nonvegHeadcount;
  state.bufferPercentage = config.bufferPercentage;
  state.selectedCatererId = config.catererId;
  state.selectedDishes = new Set(config.dishes);

  // Sync inputs
  document.getElementById("vegHeadcount").value = state.vegHeadcount;
  document.getElementById("nonvegHeadcount").value = state.nonvegHeadcount;
  document.getElementById("jainHeadcount").value = state.jainHeadcount;
  document.getElementById("headcountSlider").value = state.totalHeadcount;

  // Buffer pills
  document.querySelectorAll("#bufferPills .buffer-btn").forEach(p => {
    if (parseInt(p.getAttribute("data-buffer"), 10) === state.bufferPercentage) {
      p.classList.add("active");
    } else {
      p.classList.remove("active");
    }
  });

  populateTastingSelect(state.selectedCatererId);
  renderDishes();
  renderSelectedSummaryPills();
  recalculateAll();
}

// ==========================================
// 12. TOAST UTILITY
// ==========================================

function showToast(message) {
  const container = document.getElementById("toastContainer");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #34d399;"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ==========================================
// 13. USER AUTHENTICATION INTEGRATION
// ==========================================

function initAuthStatus() {
  const container = document.getElementById("navUserContainer");
  if (!container) return;

  // Check URL query parameters for login feedback
  const urlParams = new URLSearchParams(window.location.search);
  const loginState = urlParams.get("login");

  let savedUser = null;
  try {
    const raw = localStorage.getItem("feastflow_user");
    if (raw) savedUser = JSON.parse(raw);
  } catch (e) {
    console.warn("Could not parse auth state:", e);
  }

  if (savedUser) {
    container.innerHTML = `
      <div class="user-profile-badge" id="userProfileBadge" title="${savedUser.name} (${savedUser.role})">
        <div class="user-avatar"><i class="fa-solid ${savedUser.avatar || 'fa-user-check'}"></i></div>
        <div class="user-details hide-mobile">
          <span class="user-name">${savedUser.name}</span>
          <span class="user-role">${savedUser.role}</span>
        </div>
        <button class="user-logout-btn" id="navLogoutBtn" title="Logout">
          <i class="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>
    `;

    const logoutBtn = document.getElementById("navLogoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        try {
          localStorage.removeItem("feastflow_user");
        } catch (e) {}
        showToast("Logged out successfully.");
        initAuthStatus();
      });
    }

    if (loginState === "success") {
      showToast(`Welcome back, ${savedUser.name}! (${savedUser.role})`);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (loginState === "newuser") {
      showToast(`Welcome to FeastFlow, ${savedUser.name}! Your account is active.`);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (loginState === "sso") {
      showToast(`Signed in with SSO as ${savedUser.name}.`);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  } else {
    container.innerHTML = `
      <a href="login.html" class="btn btn-outline btn-sm nav-login-btn" id="navLoginBtn">
        <i class="fa-solid fa-arrow-right-to-bracket"></i> <span class="hide-mobile">Sign In</span>
      </a>
    `;
  }
}



