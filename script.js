const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navAnchors = document.querySelectorAll('.nav-links a');

const revealEls = document.querySelectorAll('.reveal');
const skillEls = document.querySelectorAll('.skill');

const hero = document.querySelector('.hero');
const parallaxItems = document.querySelectorAll('.hero-parallax span');

const year = document.getElementById('year');

const projectGrid = document.getElementById('project-grid');

const formSuccess = document.getElementById('form-success');

if (year) {
  year.textContent = new Date().getFullYear();
}

const urlParams = new URLSearchParams(window.location.search);

if (formSuccess && urlParams.get('sent') === '1') {

  formSuccess.textContent =
    'Thanks! Your message was sent successfully.';

  urlParams.delete('sent');

  const nextQuery = urlParams.toString();

  const nextUrl =
    `${window.location.pathname}` +
    `${nextQuery ? `?${nextQuery}` : ''}` +
    `${window.location.hash}`;

  window.history.replaceState({}, '', nextUrl);
}

menuToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
});

navAnchors.forEach((anchor) => {

  anchor.addEventListener('click', () => {
    navLinks?.classList.remove('open');
  });

});

const revealObserver = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {

    if (entry.isIntersecting) {

      entry.target.classList.add('visible');

      revealObserver.unobserve(entry.target);

      if (entry.target.id === 'skills') {

        skillEls.forEach((skill) => {

          const level = skill.dataset.level || 0;

          const bar = skill.querySelector('.bar i');

          if (bar) {
            bar.style.width = `${level}%`;
          }

        });

      }

    }

  });

}, {
  threshold: 0.05,
  rootMargin: '0px 0px -8% 0px'
});

revealEls.forEach((el) => {
  revealObserver.observe(el);
});

const skillsSection = document.querySelector('#skills');

if (skillsSection) {
  revealObserver.observe(skillsSection);
}
