// Smooth scroll for nav links (backup for browsers without scroll-behavior support)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#") return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Email popup
const emailBtn = document.querySelector('[data-email]');
const popup = document.getElementById('email-popup');
const closeBtn = popup?.querySelector('.popup-close');
const copyBtn = document.getElementById('copy-btn');
const emailText = document.getElementById('popup-email-text');
const EMAIL = 'rootbaeck90@gmail.com';

function openPopup() {
  popup?.classList.add('is-open');
  popup?.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closePopup() {
  popup?.classList.remove('is-open');
  popup?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

emailBtn?.addEventListener('click', (e) => {
  e.preventDefault();
  openPopup();
});

closeBtn?.addEventListener('click', closePopup);

popup?.addEventListener('click', (e) => {
  if (e.target === popup) closePopup();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && popup?.classList.contains('is-open')) closePopup();
});

copyBtn?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(EMAIL);
    copyBtn.textContent = '복사됨!';
    copyBtn.classList.add('copied');
    setTimeout(() => {
      copyBtn.textContent = '복사하기';
      copyBtn.classList.remove('copied');
    }, 1500);
  } catch (err) {
    // fallback for older browsers
    const input = document.createElement('input');
    input.value = EMAIL;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    copyBtn.textContent = '복사됨!';
    setTimeout(() => { copyBtn.textContent = '복사하기'; }, 1500);
  }
});
