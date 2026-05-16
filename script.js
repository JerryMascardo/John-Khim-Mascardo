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

if (year) year.textContent = new Date().getFullYear();

const urlParams = new URLSearchParams(window.location.search);
if (formSuccess && urlParams.get('sent') === '1') {
  formSuccess.textContent = 'Thanks! Your message was sent successfully.';
  urlParams.delete('sent');
  const nextQuery = urlParams.toString();
  const nextUrl = `${window.location.pathname}${nextQuery ? `?${nextQuery}` : ''}${window.location.hash}`;
  window.history.replaceState({}, '', nextUrl);
}

menuToggle?.addEventListener('click', () => {
  const opened = navLinks?.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(Boolean(opened)));
});

navAnchors.forEach((anchor) => {
  anchor.addEventListener('click', () => {
    navLinks?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);

    if (entry.target.id === 'skills') {
      skillEls.forEach((skill) => {
        const level = Number(skill.dataset.level) || 0;
        const bar = skill.querySelector('.bar i');
        if (bar) bar.style.width = `${level}%`;
      });
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });

revealEls.forEach((el) => revealObserver.observe(el));
const skillsSection = document.querySelector('#skills');
if (skillsSection) revealObserver.observe(skillsSection);

const sections = document.querySelectorAll('main section');
const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    navAnchors.forEach((link) => link.classList.remove('active'));
    const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
    active?.classList.add('active');
  });
}, { threshold: 0.45 });
sections.forEach((sec) => activeObserver.observe(sec));

window.addEventListener('scroll', () => {
  const y = window.scrollY * 0.18;
  if (hero) hero.style.backgroundPositionY = `${y}px`;
});

hero?.addEventListener('pointermove', (event) => {
  const x = (event.clientX / window.innerWidth - 0.5) * 11;
  const y = (event.clientY / window.innerHeight - 0.5) * 11;

  parallaxItems.forEach((item, index) => {
    const factor = (index + 1) * 0.15;
    item.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});

const projects = [
  { title: 'Singapore School Cebu', url: 'https://www.singaporeschoolcebu.com/', description: 'A school website with clear program information, enrollment pathways, and parent-friendly navigation.', stack: 'WordPress • Education • Performance' },
  { title: 'Dinnox IT', url: 'https://dinnoxit.com/', description: 'A corporate IT website presenting services, credibility, and lead-generation touchpoints.', stack: 'WordPress • Corporate • UI/UX' },
  { title: 'Ornata', url: 'https://ornata.ae/', description: 'A visually refined brand website with polished storytelling and modern layouts.', stack: 'WordPress • Branding • Responsive UI' },
  { title: 'Explora Books', url: 'https://explorabooks.com/', description: 'A book-centric platform with structured discovery flow and clear call-to-actions.', stack: 'WordPress • Publishing • Conversion' },
  { title: 'Ben Bacon Author', url: 'https://benbaconauthor.com/', description: 'An author platform tailored for book promotion, personal branding, and reader engagement.', stack: 'WordPress • Author • SEO' },
  { title: 'Group Polar', url: 'https://www.grouppolar.com/', description: 'A professional company website communicating service depth and project readiness.', stack: 'WordPress • Business • Optimization' }
];

if (projectGrid) {
  projectGrid.innerHTML = projects.map((project) => {
    const thumbUrl = `https://image.thum.io/get/width/900/crop/560/noanimate/${project.url}`;
    return `
      <article class="project glass">
        <div class="project-media image-wrap">
          <img loading="lazy" src="${thumbUrl}" alt="Thumbnail preview of ${project.title}" onerror="this.style.display='none';this.parentElement.classList.add('thumb-fallback');this.parentElement.textContent='Preview unavailable';" />
        </div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <p class="stack">${project.stack}</p>
        <a class="btn btn-secondary" href="${project.url}" target="_blank" rel="noopener">Visit Site</a>
      </article>
    `;
  }).join('');
}

const testimonials = [
  { quote: '“John Khim did a very good job! It is even beyond what we imagined. The customization is easier than our current site. Kudos to him!”', author: 'Mik Y. – Singapore School Cebu (Client)' },
  { quote: '“Excellent communication and delivery. The final website was clean, fast, and exactly what our team needed.”', author: 'Business Owner – Client' },
  { quote: '“Reliable, creative, and professional from start to finish. Highly recommended for WordPress and UI/UX work.”', author: 'Marketing Team – Partner' }
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

renderSlide();
setInterval(() => {
  current = (current + 1) % testimonials.length;
  renderSlide();
}, 6000);
