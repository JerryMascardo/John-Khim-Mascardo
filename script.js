const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navAnchors = document.querySelectorAll('.nav-links a');
const revealEls = document.querySelectorAll('.reveal');
const skillEls = document.querySelectorAll('.skill');
const hero = document.querySelector('.hero');
const parallaxItems = document.querySelectorAll('.hero-parallax span');
const year = document.getElementById('year');

if (year) year.textContent = new Date().getFullYear();

menuToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
});

navAnchors.forEach((anchor) => {
  anchor.addEventListener('click', () => navLinks?.classList.remove('open'));
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.id === 'skills') {
        skillEls.forEach((skill) => {
          const level = skill.dataset.level || 0;
          const bar = skill.querySelector('.bar i');
          if (bar) bar.style.width = `${level}%`;
        });
      }
    }
  });
}, { threshold: 0.2 });

revealEls.forEach((el) => revealObserver.observe(el));
const skillsSection = document.querySelector('#skills');
if (skillsSection) revealObserver.observe(skillsSection);

const sections = document.querySelectorAll('main section');
const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navAnchors.forEach((link) => link.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      active?.classList.add('active');
    }
  });
}, { threshold: 0.45 });
sections.forEach((sec) => activeObserver.observe(sec));

window.addEventListener('scroll', () => {
  const y = window.scrollY * 0.18;
  hero.style.backgroundPositionY = `${y}px`;
});

hero?.addEventListener('pointermove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 8;
  const y = (e.clientY / window.innerHeight - 0.5) * 8;
  parallaxItems.forEach((item, index) => {
    const factor = (index + 1) * 0.18;
    item.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});

const testimonials = [
  {
    quote: '“John Khim did a very good job! It is even beyond what we imagined. The customization of the site is even easier than our current site. Kudos to him!”',
    author: 'Mik Y. – Singapore School Cebu (Client)'
  },
  {
    quote: '“Excellent communication and delivery. The final website was clean, fast, and exactly what our team needed.”',
    author: 'Happy Client – Business Owner'
  },
  {
    quote: '“Reliable, creative, and professional from start to finish. Highly recommended for WordPress and UI/UX work.”',
    author: 'Project Partner – Marketing Team'
  }
];

const slider = document.querySelector('.testimonial-slider');
const quote = slider?.querySelector('blockquote');
const author = slider?.querySelector('.author');
const buttons = document.querySelectorAll('.slide-btn');
let current = 0;

function renderSlide() {
  if (!quote || !author) return;
  quote.textContent = testimonials[current].quote;
  author.textContent = testimonials[current].author;
}

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    current = (current + Number(btn.dataset.dir) + testimonials.length) % testimonials.length;
    renderSlide();
  });
});

setInterval(() => {
  current = (current + 1) % testimonials.length;
  renderSlide();
}, 6000);
