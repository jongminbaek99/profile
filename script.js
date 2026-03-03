document.addEventListener('DOMContentLoaded', function () {
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
  const emailBtn = document.getElementById('email-btn');
  const popup = document.getElementById('email-popup');
  const closeBtn = popup?.querySelector('.popup-close');
  const copyBtn = document.getElementById('copy-btn');
  const EMAIL = 'rootbaeck90@gmail.com';

  function openPopup() {
    if (popup) {
      popup.classList.add('is-open');
      popup.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closePopup() {
    if (popup) {
      popup.classList.remove('is-open');
      popup.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (emailBtn) {
    emailBtn.addEventListener('click', function (e) {
      e.preventDefault();
      openPopup();
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closePopup);

  if (popup) {
    popup.addEventListener('click', function (e) {
      if (e.target === popup) closePopup();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && popup?.classList.contains('is-open')) closePopup();
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', async function (e) {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(EMAIL);
      copyBtn.textContent = '복사됨!';
      copyBtn.classList.add('copied');
      setTimeout(() => {
        copyBtn.textContent = '복사하기';
        copyBtn.classList.remove('copied');
      }, 1500);
    } catch (err) {
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
  }
});
