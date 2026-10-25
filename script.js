// ==================== Mobile Navigation ====================
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const siteHeader = document.querySelector('.site-header');

const updateHeaderState = () => {
  siteHeader.classList.toggle('is-scrolled', window.scrollY > 0);
};

updateHeaderState();
window.addEventListener('scroll', updateHeaderState, { passive: true });

// ==================== Hero Typing Effect ====================
const heroTitle = document.querySelector('#intro-title');
const initialHeroText = "I'm Christopher.";
const finalHeroText = 'Christopher Balana';
const typingSpeed = 85;
const deletingSpeed = 65;

const typeText = (text, speed, onComplete) => {
  let index = 0;
  const typeNextCharacter = () => {
    heroTitle.textContent = text.slice(0, index + 1);
    index += 1;
    if (index < text.length) {
      window.setTimeout(typeNextCharacter, speed);
    } else if (onComplete) {
      onComplete();
    }
  };
  typeNextCharacter();
};

const deleteText = (onComplete) => {
  const deleteNextCharacter = () => {
    heroTitle.textContent = heroTitle.textContent.slice(0, -1);
    if (heroTitle.textContent) {
      window.setTimeout(deleteNextCharacter, deletingSpeed);
    } else {
      onComplete();
    }
  };
  deleteNextCharacter();
};

if (heroTitle) {
  heroTitle.textContent = '';
  const cycleHeroText = (text, nextText) => {
    typeText(text, typingSpeed, () => {
      window.setTimeout(() => {
        deleteText(() => cycleHeroText(nextText, text));
      }, 2000);
    });
  };

  cycleHeroText(initialHeroText, finalHeroText);
}

menuToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    if (link.getAttribute('href') === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    siteNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// ==================== Project Preview Modal ====================
const projectModal = document.querySelector('#project-modal');
const projectModalTitle = document.querySelector('#project-modal-title');
const projectModalFrame = projectModal.querySelector('iframe');
const projectModalImage = projectModal.querySelector('.project-modal-image');
const projectModalLink = projectModal.querySelector('.project-modal-link');
const projectModalClose = projectModal.querySelector('.project-modal-close');
let lastFocusedProject = null;

const closeProjectModal = () => {
  if (!projectModal.open) return;
  projectModal.close();
  document.body.classList.remove('modal-open');
  projectModalFrame.src = '';
  projectModalImage.src = '';
  projectModalImage.alt = '';
  lastFocusedProject?.focus();
};

document.querySelectorAll('.project-card').forEach((project) => {
  project.addEventListener('click', (event) => {
    event.preventDefault();
    lastFocusedProject = project;
    const projectUrl = project.href;
    const projectImage = project.dataset.projectImage;
    projectModalTitle.textContent = project.dataset.projectTitle;
    if (projectImage) {
      projectModalFrame.src = '';
      projectModalFrame.style.display = 'none';
      projectModalImage.src = projectImage;
      projectModalImage.alt = `${project.dataset.projectTitle} poster`;
      projectModalImage.style.display = 'block';
    } else {
      projectModalImage.src = '';
      projectModalImage.style.display = 'none';
      projectModalFrame.title = `${project.dataset.projectTitle} preview`;
      projectModalFrame.src = projectUrl;
      projectModalFrame.style.display = 'block';
    }
    projectModalLink.href = projectUrl;
    projectModal.showModal();
    document.body.classList.add('modal-open');
    projectModalClose.focus();
  });
});

projectModalClose.addEventListener('click', closeProjectModal);
projectModal.addEventListener('cancel', (event) => {
  event.preventDefault();
  closeProjectModal();
});
projectModal.addEventListener('click', (event) => {
  if (event.target === projectModal) closeProjectModal();
});

// ==================== Scroll Reveal ====================
const revealElements = document.querySelectorAll(
  '.reveal, .content-section > *, .about-detail, .timeline-item, .project-card, .contact-section > *'
);
revealElements.forEach((element) => element.classList.add('reveal'));
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach((element) => revealObserver.observe(element));

// ==================== Footer Year ====================
document.querySelector('#current-year').textContent = new Date().getFullYear();
