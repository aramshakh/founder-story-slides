const slides = Array.from(document.querySelectorAll('.slide'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const slideCounter = document.getElementById('slideCounter');

let current = 0;

function updateDeck(index) {
  current = Math.max(0, Math.min(index, slides.length - 1));

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === current);
    slide.setAttribute('aria-hidden', i === current ? 'false' : 'true');
  });

  const currentNum = String(current + 1).padStart(2, '0');
  const totalNum = String(slides.length).padStart(2, '0');
  slideCounter.textContent = `${currentNum} / ${totalNum}`;
  progressBar.style.width = `${((current + 1) / slides.length) * 100}%`;

  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === slides.length - 1;

  const slideTitle = slides[current].dataset.title || document.title;
  document.title = `${slideTitle} — A Founder Story`;
}

prevBtn.addEventListener('click', () => updateDeck(current - 1));
nextBtn.addEventListener('click', () => updateDeck(current + 1));

document.addEventListener('keydown', (event) => {
  if (['ArrowRight', 'PageDown', ' '].includes(event.key)) {
    event.preventDefault();
    updateDeck(current + 1);
  }

  if (['ArrowLeft', 'PageUp'].includes(event.key)) {
    event.preventDefault();
    updateDeck(current - 1);
  }

  if (event.key === 'Home') updateDeck(0);
  if (event.key === 'End') updateDeck(slides.length - 1);
});

let touchStartX = 0;

document.addEventListener('touchstart', (event) => {
  touchStartX = event.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', (event) => {
  const deltaX = event.changedTouches[0].screenX - touchStartX;
  if (Math.abs(deltaX) < 50) return;
  if (deltaX < 0) updateDeck(current + 1);
  if (deltaX > 0) updateDeck(current - 1);
}, { passive: true });

updateDeck(0);
