const root = document.documentElement;
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.site-nav a');
const themeToggle = document.querySelector('.theme-toggle');
const year = document.querySelector('#year');

if (year) {
  year.textContent = new Date().getFullYear();
}

navToggle?.addEventListener('click', () => {
  const isOpen = document.body.classList.toggle('nav-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    document.body.classList.remove('nav-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

themeToggle?.addEventListener('click', () => {
  root.classList.toggle('dark');
  localStorage.setItem('uncut-theme', root.classList.contains('dark') ? 'dark' : 'light');
});

const savedTheme = localStorage.getItem('uncut-theme');
if (savedTheme === 'dark') {
  root.classList.add('dark');
}

const sections = document.querySelectorAll('[data-section], #work, #studio, #process, #contact');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = entry.target.getAttribute('id');
    if (!id) return;

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0.01 });

sections.forEach((section) => observer.observe(section));

const tickerTrack = document.querySelector('.ticker-track');
if (tickerTrack) {
  tickerTrack.innerHTML += tickerTrack.innerHTML;
}
