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

// YEAR
if (year) year.textContent = new Date().getFullYear();

// FORM SUCCESS MESSAGE
const urlParams = new URLSearchParams(window.location.search);
if (formSuccess && urlParams.get('sent') === '1') {
  formSuccess.textContent = 'Thanks! Your message was sent successfully.';
  urlParams.delete('sent');

  const nextQuery = urlParams.toString();
  const nextUrl = `${window.location.pathname}${nextQuery ? `?${nextQuery}` : ''}${window.location.hash}`;
  window.history.replaceState({}, '', nextUrl);
}

// MOBILE MENU
menuToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
});

// CLOSE MENU ON CLICK
navAnchors.forEach((anchor) => {
  anchor.addEventListener('click', () => {
    navLinks?.classList.remove('open');
  });
});

// ==========================
// 🔥 REVEAL OBSERVER (FIXED)
// ==========================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {

      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);

      // SKILL ANIMATION
      if (entry.target.id === 'skills') {
        skillEls.forEach((skill) => {
          const level = skill.dataset.level || 0;
          const bar = skill.querySelector('.bar i');
          if (bar) bar.style.width = `${level}%`;
        });
      }
    }
  });
}, {
  threshold: 0.05,
  rootMargin: '0px 0px -8% 0px'
});

// APPLY OBSERVER
revealEls.forEach((el) => revealObserver.observe(el));

const skillsSection = document.querySelector('#skills');
if (skillsSection) revealObserver.observe(skillsSection);

// ==========================
// ACTIVE NAV HIGHLIGHT
// ==========================
const sections = document.querySelectorAll('main section');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navAnchors.forEach((link) => link.classList.remove('active'));

      const active = document.querySelector(
        `.nav-links a[href="#${entry.target.id}"]`
      );

      active?.classList.add('active');
    }
  });
}, { threshold: 0.45 });

sections.forEach((sec) => activeObserver.observe(sec));

// ==========================
// SCROLL PARALLAX
// ==========================
window.addEventListener('scroll', () => {
  const y = window.scrollY * 0.18;
  if (hero) hero.style.backgroundPositionY = `${y}px`;
});

// POINTER PARALLAX
hero?.addEventListener('pointermove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 8;
  const y = (e.clientY / window.innerHeight - 0.5) * 8;

  parallaxItems.forEach((item, index) => {
    const factor = (index + 1) * 0.18;
    item.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});

// ==========================
// PROJECTS RENDER
// ==========================
const projects = [
  {
    title: 'RealtyHub',
    url: 'https://realtyhub.ph/',
    description: 'Real estate platform for property discovery.',
    stack: 'WordPress • SEO'
  },
  {
    title: 'ShopSmart',
    url: 'https://shopsmart.net.ph/',
    description: 'E-commerce website optimized for conversion.',
    stack: 'WooCommerce • UX'
  },
  {
    title: 'Singapore School Cebu',
    url: 'https://www.singaporeschoolcebu.com/',
    description: 'A school website with clear program information, enrollment pathways, and parent-friendly navigation.',
    stack: 'WordPress • Education Site • Performance'
  },
  {
    title: 'Dinnox IT',
    url: 'https://dinnoxit.com/',
    description: 'A corporate IT website presenting services, credibility, and lead-generation touchpoints for prospective clients.',
    stack: 'WordPress • Business Site • UI/UX'
  },
  {
    title: 'Ornata',
    url: 'https://ornata.ae/',
    description: 'A visually refined brand website highlighting offerings through modern layouts, elegant sections, and polished storytelling.',
    stack: 'WordPress • Branding • Responsive UI'
  },
  {
    title: 'Group Polar',
    url: 'https://www.grouppolar.com/',
    description: 'A professional group/company website built to communicate services, company strengths, and project readiness.',
    stack: 'WordPress • Corporate • SEO'
  },
  {
    title: 'Ben Bacon Author',
    url: 'https://benbaconauthor.com/',
    description: 'An author platform tailored for book promotion, personal branding, and reader engagement.',
    stack: 'WordPress • Author Site • Content'
  },
  {
    title: 'Explora Books',
    url: 'https://explorabooks.com/',
    description: 'A publishing/book-centric website with a structured catalog experience and clear calls-to-action for readers.',
    stack: 'WordPress • Books • Conversion'
  },
  {
    title: 'Travajjo',
    url: 'https://travajjo.com/',
    description: 'A brand-forward website blending modern visuals with straightforward navigation for service and product discovery.',
    stack: 'WordPress • Brand Site • UX'
  },
  {
    title: 'Tamara Lesley',
    url: 'https://tamaralesley.com/',
    description: 'A clean author/personal website focused on storytelling, audience trust, and content accessibility.',
    stack: 'WordPress • Personal Brand • SEO'
  },
  {
    title: 'Rosanna Author',
    url: 'https://rosanna-author.com/',
    description: 'An author website featuring books, about pages, and audience connection points in an elegant layout.',
    stack: 'WordPress • Author Portfolio • UI'
  },
  {
    title: 'Claudette McLennon Books',
    url: 'https://claudettemclennonbooks.com/',
    description: 'A dedicated book website built for discoverability, title promotion, and simplified reader journeys.',
    stack: 'WordPress • Books • Responsive'
  },
  {
    title: 'Books by Renee Servello',
    url: 'https://booksbyreneeservello.com/about/',
    description: 'An author-focused website section that strengthens credibility through biography, brand voice, and book context.',
    stack: 'WordPress • Author Bio • Content UX'
  }
];

if (projectGrid) {
  const cards = projects.map((project) => {
    const thumbUrl = `https://image.thum.io/get/width/900/crop/560/noanimate/${project.url}`;

    return `
      <article class="project glass">
        <div class="project-media image-wrap">
          <img loading="lazy" src="${thumbUrl}" alt="${project.title}" 
          onerror="this.style.display='none';this.parentElement.textContent='Preview unavailable';" />
        </div>

        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <p class="stack">${project.stack}</p>

        <a class="btn btn-secondary" href="${project.url}" target="_blank">Visit</a>
      </article>
    `;
  });

  projectGrid.innerHTML = cards.join('');
}

// ==========================
// TESTIMONIAL SLIDER
// ==========================
const testimonials = [
  {
    quote: 'Great work! Beyond expectations.',
    author: 'Client'
  },
  {
    quote: 'Clean, fast, professional.',
    author: 'Business Owner'
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

// AUTO SLIDE
setInterval(() => {
  current = (current + 1) % testimonials.length;
  renderSlide();
}, 6000);
