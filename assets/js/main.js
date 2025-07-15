// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Mobile navigation toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', function () {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Navbar scroll effect
window.addEventListener('scroll', function () {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Active navigation link highlighting
window.addEventListener('scroll', function () {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// Particles animation
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particlesContainer.appendChild(particle);
  }
}

// Initialize particles
createParticles();

// Tab functionality
document.querySelectorAll('.tab-btn').forEach(button => {
  button.addEventListener('click', function () {
    const targetTab = this.getAttribute('data-tab');

    // Remove active class from all buttons and panes
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));

    // Add active class to clicked button and target pane
    this.classList.add('active');
    document.getElementById(targetTab).classList.add('active');
  });
});

// Portfolio slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  indicators.forEach(indicator => indicator.classList.remove('active'));

  slides[index].classList.add('active');
  indicators[index].classList.add('active');
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// Portfolio navigation
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Portfolio indicators
indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    currentSlide = index;
    showSlide(currentSlide);
  });
});

// Auto-play portfolio slider
setInterval(nextSlide, 5000);

// Contact form handling
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const submitBtn = document.querySelector('.submit-btn');
const btnText = document.querySelector('.btn-text');
const btnLoading = document.querySelector('.btn-loading');

const scriptURL = 'https://script.google.com/macros/s/AKfycbyvugMTarLpu6FF7toZ3EfmPReFzgJmcIcjZ1hf89o72oDUFYYUmRgXZu7lxHHMtEH2/exec';

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // Show loading state
  btnText.style.display = 'none';
  btnLoading.style.display = 'flex';
  submitBtn.disabled = true;

  // Submit form
  fetch(scriptURL, {
    method: 'POST',
    body: new FormData(contactForm)
  })
    .then(response => {
      showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
      contactForm.reset();
    })
    .catch(error => {
      showMessage('Something went wrong. Please try again.', 'error');
    })
    .finally(() => {
      // Reset button state
      btnText.style.display = 'inline';
      btnLoading.style.display = 'none';
      submitBtn.disabled = false;
    });
});

function showMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
  formMessage.style.display = 'block';

  setTimeout(() => {
    formMessage.style.display = 'none';
  }, 5000);
}

// Form validation
const inputs = document.querySelectorAll('input, textarea');
inputs.forEach(input => {
  input.addEventListener('blur', function () {
    if (this.hasAttribute('required') && !this.value.trim()) {
      this.style.borderColor = '#ef4444';
    } else {
      this.style.borderColor = 'var(--border-glass)';
    }
  });

  input.addEventListener('input', function () {
    if (this.style.borderColor === 'rgb(239, 68, 68)') {
      this.style.borderColor = 'var(--border-glass)';
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .portfolio-item, .skill-item, .contact-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.6s ease';
  observer.observe(el);
});

// Smooth reveal animations
window.addEventListener('load', function () {
  document.body.style.opacity = '1';
});

// Preloader (optional)
window.addEventListener('load', function () {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.style.display = 'none';
  }
});

// Keyboard navigation
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') {
    prevSlide();
  } else if (e.key === 'ArrowRight') {
    nextSlide();
  }
});

// Enhanced scroll behavior
let ticking = false;

function updateScrollPosition() {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector('.hero-background');

  if (parallax) {
    parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
  }

  ticking = false;
}

window.addEventListener('scroll', function () {
  if (!ticking) {
    requestAnimationFrame(updateScrollPosition);
    ticking = true;
  }
});

// Copy to clipboard functionality
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(function () {
    showMessage('Email copied to clipboard!', 'success');
  });
}

// Add click event to email
document.addEventListener('DOMContentLoaded', function () {
  const emailElements = document.querySelectorAll('[href^="mailto:"]');
  emailElements.forEach(element => {
    element.addEventListener('click', function (e) {
      e.preventDefault();
      const email = this.href.replace('mailto:', '');
      copyToClipboard(email);
    });
  });
});

// Performance optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll events
const debouncedScroll = debounce(function () {
  // Scroll-based animations can be added here
}, 10);

window.addEventListener('scroll', debouncedScroll);
