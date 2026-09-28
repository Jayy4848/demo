const navbar = document.querySelector('.navbar');
const hero = document.querySelector('.hero');
const heroBg = document.querySelector('.hero-bg');
const floatingDemo = document.querySelector('.floating-demo');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;

        event.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight - 12;
        window.scrollTo({ top, behavior: reducedMotion ? 'auto' : 'smooth' });
    });
});

// Navbar scroll state + hero parallax
let scrollQueued = false;
window.addEventListener('scroll', () => {
    if (scrollQueued) return;
    scrollQueued = true;

    requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        navbar.classList.toggle('is-scrolled', scrollTop > 24);

        if (!reducedMotion && hero && heroBg && scrollTop < hero.offsetHeight) {
            heroBg.style.setProperty('--hero-shift', `${scrollTop * 0.12}px`);
        }

        scrollQueued = false;
    });
}, { passive: true });

// Viewer controls active state
document.querySelectorAll('.viewer-controls .view-btn').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelectorAll('.viewer-controls .view-btn').forEach(item => item.classList.remove('active'));
        link.classList.add('active');
    });
});

// Contact form — opens email client with prefilled draft
const contactForm = document.querySelector('.contact-form');

function buildMailtoDraft(formData) {
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const company = formData.get('company').trim();
    const message = formData.get('message').trim();
    const subject = encodeURIComponent(`Website inquiry from ${name}`);
    const body = encodeURIComponent([
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || 'Not provided'}`,
        '',
        message
    ].join('\n'));

    return `mailto:info@robotechsolutions.com?subject=${subject}&body=${body}`;
}

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    window.location.href = buildMailtoDraft(new FormData(this));
});

// Scroll reveal animations
const revealTargets = document.querySelectorAll(
    '.section-header, .feature-card, .application-card, .stat-item, .product-viewer, .specifications, .contact-info, .contact-form'
);

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

    revealTargets.forEach((element, index) => {
        element.classList.add('scroll-reveal');
        element.style.setProperty('--reveal-delay', `${(index % 3) * 90}ms`);
        revealObserver.observe(element);
    });
} else {
    revealTargets.forEach(element => element.classList.add('is-visible'));
}

// Hide floating demo button when contact section is visible
if (floatingDemo && 'IntersectionObserver' in window) {
    const contactObserver = new IntersectionObserver(([entry]) => {
        floatingDemo.classList.toggle('is-hidden', entry.isIntersecting);
    }, { threshold: 0.12 });
    contactObserver.observe(document.querySelector('#contact'));
}

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

const statsSection = document.querySelector('.stats');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;

            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach((stat, index) => {
                const text = stat.textContent;
                if (!isNaN(text) && text !== 'Zone-0' && text !== 'Zero') {
                    const target = parseInt(text);
                    animateCounter(stat, target, 2000 + (index * 200));
                }
            });
        }
    });
}, { threshold: 0.3 });

if (statsSection) {
    statsObserver.observe(statsSection);
}
