document.querySelectorAll(".mega-left .cat").forEach((cat) => {
  cat.addEventListener("mouseenter", () => {
    const key = cat.dataset.cat;
    document
      .querySelectorAll(".mega-left .cat")
      .forEach((c) => c.classList.remove("active"));
    document
      .querySelectorAll(".cat-panel")
      .forEach((p) => p.classList.remove("active"));
    cat.classList.add("active");
    document
      .querySelector(`.cat-panel[data-panel="${key}"]`)
      .classList.add("active");
  });
});

const regionBtn = document.getElementById("regionBtn");
const regionModal = document.getElementById("regionModal");
const modalClose = document.getElementById("modalClose");

regionBtn.addEventListener("click", () => regionModal.classList.add("open"));
modalClose.addEventListener("click", () =>
  regionModal.classList.remove("open"),
);
regionModal.addEventListener("click", (e) => {
  if (e.target === regionModal) regionModal.classList.remove("open");
});

const burger = document.querySelector(".burger");
const navPanel = document.querySelector("header nav");
const overlay = document.querySelector(".nav-overlay");
const navClose = document.querySelector(".nav-close");

function openMenu() {
  navPanel.classList.add("open");
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeMenu() {
  navPanel.classList.remove("open");
  overlay.classList.remove("open");
  document.body.style.overflow = "";
}

burger.addEventListener("click", openMenu);
navClose.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);

const options = {
  type: "slide",
  perPage: 1,
  arrows: false,
  pagination: false,
  drag: true,
};

const videoSlider = new Splide("#video-slider", options);
const textSlider = new Splide("#text-slider", { ...options, drag: false });
const textSliderMobile = new Splide("#text-slider-mobile", {
  ...options,
  drag: false,
});

videoSlider.sync(textSlider);
videoSlider.sync(textSliderMobile);

// Desktop buttons
document
  .getElementById("prev-btn")
  .addEventListener("click", () => videoSlider.go("<"));
document
  .getElementById("next-btn")
  .addEventListener("click", () => videoSlider.go(">"));

// Mobile buttons
document
  .getElementById("prev-btn-m")
  .addEventListener("click", () => videoSlider.go("<"));
document
  .getElementById("next-btn-m")
  .addEventListener("click", () => videoSlider.go(">"));

videoSlider.on("moved", (i) => {
  const isFirst = i === 0;
  const isLast = i === videoSlider.length - 1;
  ["prev-btn", "prev-btn-m"].forEach(
    (id) => (document.getElementById(id).disabled = isFirst),
  );
  ["next-btn", "next-btn-m"].forEach(
    (id) => (document.getElementById(id).disabled = isLast),
  );
});

videoSlider.mount();
textSlider.mount();
textSliderMobile.mount();

document.getElementById("prev-btn").disabled = true;
document.getElementById("prev-btn-m").disabled = true;

const totalSlides = 9;
const perPage = 3;
const totalPages = totalSlides; // 9 dots — one per slide

const splide = new Splide("#mpic-splide", {
  type: "slide",
  perPage: 3,
  perMove: 1,
  gap: "1.5rem",
  arrows: false,
  pagination: false,
  drag: true,
  breakpoints: {
    960: { perPage: 2 },
    600: {
      perPage: 1,
      gap: "1rem",
      padding: { left: "0rem", right: "3rem" },
    },
  },
});

// Build 9 dots
const dotsEl = document.getElementById("mpic-dots");
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement("button");
  dot.className = "mpic-dot" + (i === 0 ? " mpic-dot-active" : "");
  dot.setAttribute("aria-label", "Go to slide " + (i + 1));
  dot.addEventListener("click", () => splide.go(i));
  dotsEl.appendChild(dot);
}

function updateDots(index) {
  document.querySelectorAll(".mpic-dot").forEach((d, i) => {
    d.classList.toggle("mpic-dot-active", i === index);
  });
}

// Button controls
document
  .getElementById("mpic-prev")
  .addEventListener("click", () => splide.go("<"));
document
  .getElementById("mpic-next")
  .addEventListener("click", () => splide.go(">"));

splide.on("moved", (i) => {
  updateDots(i);
  document.getElementById("mpic-prev").disabled = i === 0;
  document.getElementById("mpic-next").disabled = i === totalSlides - 1;
});

splide.mount();

// Initial state
document.getElementById("mpic-prev").disabled = true;

const tabBar = document.getElementById('section-tabs');
const fullSection = document.querySelector('.full-section');

const tabBarObserver = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      // Still within (or above) the tabbed sections
      tabBar.classList.remove('tabs-hidden');
    } else if (entry.boundingClientRect.top < 0) {
      // Scrolled past the bottom of the sections
      tabBar.classList.add('tabs-hidden');
    }
    // if boundingClientRect.top > 0, section is below viewport (user scrolled
    // above it, e.g. back to the very top) — leave it visible, don't hide
  },
  { threshold: 0 }
);

tabBarObserver.observe(fullSection);