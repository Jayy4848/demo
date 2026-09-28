const navbar = document.querySelector('.navbar');
const hero = document.querySelector('.hero');
const heroBackground = document.querySelector('.hero-background');
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

        if (!reducedMotion && hero && heroBackground && scrollTop < hero.offsetHeight) {
            heroBackground.style.setProperty('--hero-shift', `${scrollTop * 0.12}px`);
        }

        scrollQueued = false;
    });
}, { passive: true });

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const answer = item.querySelector('.faq-answer');
        const isOpen = item.classList.contains('is-open');

        document.querySelectorAll('.faq-item.is-open').forEach(openItem => {
            if (openItem !== item) {
                openItem.classList.remove('is-open');
                openItem.querySelector('.faq-answer').style.maxHeight = '0';
                openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            }
        });

        if (isOpen) {
            item.classList.remove('is-open');
            answer.style.maxHeight = '0';
            question.setAttribute('aria-expanded', 'false');
        } else {
            item.classList.add('is-open');
            answer.style.maxHeight = answer.scrollHeight + 'px';
            question.setAttribute('aria-expanded', 'true');
        }
    });
});

// Feature hotspots
const hotspotFeatures = [
    { title: 'High-Pressure Jetting and Sludge Agitation Nozzles', desc: 'Powerful nozzles break down and agitate compacted sludge, enabling efficient extraction without manual intervention.' },
    { title: 'Quick Tool Swapping with Plug-and-Play Interface', desc: 'Modular tool system allows rapid swapping of attachments on-site, minimizing downtime between operations.' },
    { title: 'Clear Vision Zone-0 Cameras with Automatic Self-Cleaning', desc: 'ATEX-certified cameras with self-cleaning lenses deliver continuous HD visibility in the harshest environments.' },
    { title: 'Compact 600 mm Manhole Entry with Ramp Deployment', desc: 'Designed to enter through standard 600mm manholes, deploying via ramp without tank modification.' },
    { title: 'Safe Emergency Retrieval from Confined Tanks', desc: 'Fail-safe retrieval system pulls the robot out of the tank in minutes, enabling immediate relaunch.' },
    { title: 'Stable Robotic Mobility with High Traction', desc: 'Heavy-duty track system ensures stable movement across sludge, uneven surfaces, and internal tank structures.' }
];

const hotspotInfo = document.getElementById('hotspotInfo');
const hotspotInfoInner = hotspotInfo.querySelector('.hotspot-info-inner');

document.querySelectorAll('.hotspot-dot').forEach(dot => {
    dot.addEventListener('click', () => {
        document.querySelectorAll('.hotspot-dot').forEach(d => d.classList.remove('active'));
        dot.classList.add('active');

        const feature = hotspotFeatures[parseInt(dot.dataset.feature)];
        if (!feature) return;

        hotspotInfoInner.style.opacity = '0';
        setTimeout(() => {
            hotspotInfoInner.innerHTML = `
                <h4 class="hotspot-title">${feature.title}</h4>
                <p class="hotspot-desc">${feature.desc}</p>
            `;
            hotspotInfoInner.style.opacity = '1';
        }, 200);
    });
});

// Video modal
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');

document.querySelectorAll('.play-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const src = btn.dataset.video;
        if (!src) return;
        modalVideo.src = src;
        modalVideo.load();
        videoModal.classList.add('is-open');
        videoModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    });
});

function closeVideoModal() {
    videoModal.classList.remove('is-open');
    videoModal.setAttribute('aria-hidden', 'true');
    modalVideo.pause();
    document.body.style.overflow = '';
}

document.querySelector('.video-modal-close')?.addEventListener('click', closeVideoModal);
document.querySelector('.video-modal-backdrop')?.addEventListener('click', closeVideoModal);
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && videoModal.classList.contains('is-open')) closeVideoModal();
});

// Contact form
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

    return `mailto:contact@robotechsolutions.com?subject=${subject}&body=${body}`;
}

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    window.location.href = buildMailtoDraft(new FormData(this));
});

// Scroll reveal animations
const revealTargets = document.querySelectorAll(
    '.section-header, .tech-grid, .product-card, .geometry-card, .nme-wrapper, .cert-card, .hotspot-wrapper, .pillar, .innovation-card, .rare-item, .pump-wrapper, .faq-item, .story-card, .application-card, .cta-content, .contact-info, .contact-form, .quote-text, .trusted-by'
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

// Floating demo button — hide when contact section is visible
if (floatingDemo && 'IntersectionObserver' in window) {
    const contactObserver = new IntersectionObserver(([entry]) => {
        floatingDemo.classList.toggle('is-hidden', entry.isIntersecting);
    }, { threshold: 0.12 });
    contactObserver.observe(document.querySelector('#contact'));
}

// Counter animation for stats (if present)
function animateCounter(element, target, duration = 2000) {
    const increment = target / (duration / 16);
    let current = 0;

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

if (statsSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                document.querySelectorAll('.stat-number').forEach((stat, index) => {
                    const text = stat.textContent;
                    if (!isNaN(text) && text !== 'Zone-0' && text !== 'Zero') {
                        const target = parseInt(text);
                        animateCounter(stat, target, 2000 + (index * 200));
                    }
                });
            }
        });
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
}

console.log('%cRoboTech Solutions — Hazardous Space Robotics', 'color: #ed8737; font-size: 16px; font-weight: bold;');
