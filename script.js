document.querySelectorAll('.mega-left .cat').forEach(cat => {
  cat.addEventListener('mouseenter', () => {
    const key = cat.dataset.cat;
    document.querySelectorAll('.mega-left .cat').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.cat-panel').forEach(p => p.classList.remove('active'));
    cat.classList.add('active');
    document.querySelector(`.cat-panel[data-panel="${key}"]`).classList.add('active');
  });
});
const regionBtn = document.getElementById('regionBtn');
const regionModal = document.getElementById('regionModal');
const modalClose = document.getElementById('modalClose');

regionBtn.addEventListener('click', () => regionModal.classList.add('open'));
modalClose.addEventListener('click', () => regionModal.classList.remove('open'));
regionModal.addEventListener('click', (e) => {
  if (e.target === regionModal) regionModal.classList.remove('open');
});
const burger = document.querySelector('.burger');
const navPanel = document.querySelector('header nav');
const overlay = document.querySelector('.nav-overlay');
const navClose = document.querySelector('.nav-close');

function openMenu() {
  navPanel.classList.add('open');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  navPanel.classList.remove('open');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

burger.addEventListener('click', openMenu);
navClose.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

// touch-friendly dropdown: tap "Products"/"Company" to expand instead of hover
document.querySelectorAll('.drop > span').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const parentLi = trigger.closest('.drop');
    const wasOpen = parentLi.classList.contains('open');
    document.querySelectorAll('.drop.open').forEach((el) => el.classList.remove('open'));
    if (!wasOpen) parentLi.classList.add('open');
  });
});