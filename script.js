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
