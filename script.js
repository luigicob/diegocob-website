// Mobile nav toggle
const hamburger = document.querySelector('.nav__hamburger');
const menu = document.querySelector('.nav__menu');
const header = document.querySelector('.site-header');

if (hamburger && menu && header) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!isOpen));
    header.classList.toggle('nav--open');
    menu.classList.toggle('nav__menu--open');
  });

  // Close menu on nav link click (smooth scroll)
  menu.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', 'false');
      header.classList.remove('nav--open');
      menu.classList.remove('nav__menu--open');
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target) && header.classList.contains('nav--open')) {
      hamburger.setAttribute('aria-expanded', 'false');
      header.classList.remove('nav--open');
      menu.classList.remove('nav__menu--open');
    }
  });
}

// Scroll fade-in animation via IntersectionObserver
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

if (sections.length && navLinks.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'nav__link--active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => sectionObserver.observe(section));
}
