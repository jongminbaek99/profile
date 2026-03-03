document.addEventListener('DOMContentLoaded', function () {
  // Load content from .txt files
  const contentBase = 'content';
  async function loadText(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(url);
    return res.text();
  }
  async function loadContent() {
    try {
      const [heroSub, about, skills, proj1, proj2] = await Promise.all([
        loadText(contentBase + '/hero-subtitle.txt'),
        loadText(contentBase + '/about.txt'),
        loadText(contentBase + '/skills.txt'),
        loadText(contentBase + '/project1.txt'),
        loadText(contentBase + '/project2.txt'),
      ]);
      const heroEl = document.getElementById('hero-subtitle');
      const aboutEl = document.getElementById('about-text');
      const skillsList = document.getElementById('skills-list');
      const project1 = document.getElementById('project1');
      const project2 = document.getElementById('project2');
      if (heroEl) heroEl.textContent = heroSub.trim();
      if (aboutEl) aboutEl.textContent = about.trim();
      if (skillsList) {
        const items = skills.trim().split('\n').filter(Boolean);
        skillsList.innerHTML = items.map(function (s) {
          return '<li>' + s.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</li>';
        }).join('');
      }
      if (project1) {
        const lines = proj1.trim().split('\n');
        const title = lines[0] || '';
        const desc = lines.slice(1).join('\n').trim();
        const h3 = project1.querySelector('h3');
        const p = project1.querySelector('p');
        if (h3) h3.textContent = title;
        if (p) p.textContent = desc;
      }
      if (project2) {
        const lines = proj2.trim().split('\n');
        const title = lines[0] || '';
        const desc = lines.slice(1).join('\n').trim();
        const h3 = project2.querySelector('h3');
        const p = project2.querySelector('p');
        if (h3) h3.textContent = title;
        if (p) p.textContent = desc;
      }
    } catch (err) {
      console.warn('Content load failed:', err.message);
    }
  }
  loadContent();

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
