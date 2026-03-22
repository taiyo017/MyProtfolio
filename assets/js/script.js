// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
  // Initialize all functionality
  initNavigation();
  initPortfolioSlider();
  initTabs();
  initContactForm();
  initScrollEffects();
  initAnimations();
  initFloatingTechIcons();
  initBackToTop();
});

// Navigation functionality
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Mobile menu toggle
  navToggle.addEventListener('click', function () {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });

  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Navbar scroll effect and active link highlighting
  window.addEventListener('scroll', function () {
    const scrollPosition = window.scrollY;

    // Navbar background change
    if (scrollPosition > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active navigation highlighting
    const sections = document.querySelectorAll('section');
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.clientHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    // Update active nav link
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
}

// Portfolio slider functionality
function initPortfolioSlider() {
  const portfolioTrack = document.getElementById('portfolio-track');
  const slides = document.querySelectorAll('.portfolio-slide');
  const prevBtn = document.getElementById('portfolio-prev');
  const nextBtn = document.getElementById('portfolio-next');
  const dots = document.querySelectorAll('.dot');
  const portfolioSection = document.getElementById('portfolio');

  let currentSlide = 0;
  const totalSlides = slides.length;
  let autoPlayInterval;
  let isHovering = false;

  function updateSlider() {
    // Move the track
    const translateX = -currentSlide * 100;
    portfolioTrack.style.transform = `translateX(${translateX}%)`;

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
  }

  function startAutoPlay() {
    stopAutoPlay(); // Clear any existing interval
    autoPlayInterval = setInterval(() => {
      if (!isHovering) {
        nextSlide();
      }
    }, 5000);
  }

  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  }

  // Event listeners
  if (nextBtn) nextBtn.addEventListener('click', () => {
    nextSlide();
    startAutoPlay(); // Restart auto-play after manual navigation
  });

  if (prevBtn) prevBtn.addEventListener('click', () => {
    prevSlide();
    startAutoPlay(); // Restart auto-play after manual navigation
  });

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', function () {
      currentSlide = index;
      updateSlider();
      startAutoPlay(); // Restart auto-play after manual navigation
    });
  });

  // Pause auto-play when hovering over portfolio section
  if (portfolioSection) {
    portfolioSection.addEventListener('mouseenter', () => {
      isHovering = true;
    });

    portfolioSection.addEventListener('mouseleave', () => {
      isHovering = false;
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      startAutoPlay();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      startAutoPlay();
    }
  });

  // Start auto-play
  startAutoPlay();
}

// Tab functionality
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(button => {
    button.addEventListener('click', function () {
      const targetTab = this.getAttribute('data-tab');

      // Remove active class from all buttons and panes
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));

      // Add active class to clicked button and target pane
      this.classList.add('active');
      const targetPane = document.getElementById(targetTab);
      if (targetPane) {
        targetPane.classList.add('active');

        // If tools tab is activated, trigger floating animation
        if (targetTab === 'tools') {
          initToolsFloatingAnimation();
        }
      }
    });
  });
}

// Floating animation for tools tab
function initToolsFloatingAnimation() {
  const toolItems = document.querySelectorAll('.tool-float');

  toolItems.forEach((item, index) => {
    // Reset animation
    item.style.animation = 'none';

    // Trigger reflow
    void item.offsetWidth;

    // Re-apply animation with delay
    setTimeout(() => {
      item.style.animation = `toolFloat 6s ease-in-out infinite`;
      item.style.animationDelay = `${index * 0.5}s`;
    }, 50);

    // Add interactive hover effect
    item.addEventListener('mouseenter', function () {
      this.style.animationPlayState = 'paused';
    });

    item.addEventListener('mouseleave', function () {
      this.style.animationPlayState = 'running';
    });
  });
}

// Contact form functionality
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');

  const scriptURL = 'https://script.google.com/macros/s/AKfycbyvugMTarLpu6FF7toZ3EfmPReFzgJmcIcjZ1hf89o72oDUFYYUmRgXZu7lxHHMtEH2/exec';

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'flex';
    submitBtn.disabled = true;

    // Prepare form data
    const formData = new FormData(contactForm);

    // Submit form
    fetch(scriptURL, {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (response.ok) {
          showMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
          contactForm.reset();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        showMessage('Sorry, something went wrong. Please try again or contact me directly via email.', 'error');
      })
      .finally(() => {
        // Reset button state
        btnText.style.display = 'inline-flex';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
      });
  });

  // Form validation
  const inputs = contactForm.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearFieldError);
  });

  function validateField(e) {
    const field = e.target;
    const value = field.value.trim();

    if (field.hasAttribute('required') && !value) {
      showFieldError(field, 'This field is required');
      return false;
    }

    if (field.type === 'email' && value && !isValidEmail(value)) {
      showFieldError(field, 'Please enter a valid email address');
      return false;
    }

    clearFieldError(field);
    return true;
  }

  function showFieldError(field, message) {
    field.style.borderColor = '#ef4444';
    field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
  }

  function clearFieldError(field) {
    field.style.borderColor = '';
    field.style.boxShadow = '';
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';

    // Auto-hide message after 5 seconds
    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 5000);
  }
}

// Scroll effects
function initScrollEffects() {
  // Parallax effect for hero background
  const heroBackground = document.querySelector('.hero-background');

  window.addEventListener('scroll', throttle(function () {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;

    if (heroBackground) {
      heroBackground.style.transform = `translateY(${rate}px)`;
    }
  }, 10));

  // Scroll indicator for hero section
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function () {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

// Animation and intersection observer
function initAnimations() {
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

        // Special handling for staggered animations
        if (entry.target.classList.contains('stagger-animation')) {
          const children = entry.target.children;
          Array.from(children).forEach((child, index) => {
            setTimeout(() => {
              child.style.opacity = '1';
              child.style.transform = 'translateY(0)';
            }, index * 100);
          });
        }
      }
    });
  }, observerOptions);

  // Elements to animate
  const elementsToAnimate = document.querySelectorAll(
    '.service-card, .portfolio-item, .skill-card, .contact-card, .experience-card, .tool-item'
  );

  elementsToAnimate.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
  });

  // Staggered animations for grids
  const gridContainers = document.querySelectorAll('.skills-grid, .tools-grid, .services-grid');
  gridContainers.forEach(container => {
    container.classList.add('stagger-animation');
    observer.observe(container);
  });
}

// Utility functions
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

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

// Enhanced interactions
document.addEventListener('DOMContentLoaded', function () {
  // Copy email to clipboard functionality
  const emailElements = document.querySelectorAll('a[href^="mailto:"]');
  emailElements.forEach(element => {
    element.addEventListener('click', function (e) {
      e.preventDefault();
      const email = this.href.replace('mailto:', '');
      copyToClipboard(email);
    });
  });

  // Smooth reveal on page load
  window.addEventListener('load', function () {
    document.body.style.opacity = '1';

    // Remove any loading screens if they exist
    const loader = document.querySelector('.loader');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 300);
    }
  });

  // Add floating animation to hero elements
  createFloatingElements();

  // Initialize tooltips for social links
  initTooltips();

  // Add hover effects for service cards
  initServiceCardEffects();
});

// Copy to clipboard functionality
function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function () {
      showToast('Email copied to clipboard!', 'success');
    }).catch(function () {
      fallbackCopyTextToClipboard(text);
    });
  } else {
    fallbackCopyTextToClipboard(text);
  }
}

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    if (successful) {
      showToast('Email copied to clipboard!', 'success');
    } else {
      showToast('Failed to copy email. Please copy manually.', 'error');
    }
  } catch (err) {
    showToast('Failed to copy email. Please copy manually.', 'error');
  }

  document.body.removeChild(textArea);
}

// Toast notification system
function showToast(message, type = 'info') {
  // Remove existing toasts
  const existingToasts = document.querySelectorAll('.toast');
  existingToasts.forEach(toast => toast.remove());

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
        <div class="toast-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

  // Add toast styles
  toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(34, 197, 94, 0.9)' : type === 'error' ? 'rgba(239, 68, 68, 0.9)' : 'rgba(59, 130, 246, 0.9)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        backdrop-filter: blur(10px);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
    `;

  document.body.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
  }, 10);

  // Remove after 3 seconds
  setTimeout(() => {
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3000);
}

// Create floating background elements
function createFloatingElements() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const floatingContainer = document.querySelector('.floating-shapes');
  if (!floatingContainer) return;

  // Create additional floating elements
  for (let i = 0; i < 3; i++) {
    const element = document.createElement('div');
    element.className = 'floating-element';
    element.style.cssText = `
            position: absolute;
            width: ${50 + Math.random() * 100}px;
            height: ${50 + Math.random() * 100}px;
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${15 + Math.random() * 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
    floatingContainer.appendChild(element);
  }
}

// Initialize tooltips
function initTooltips() {
  const socialLinks = document.querySelectorAll('.social-link');

  socialLinks.forEach(link => {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';

    let tooltipText = '';
    if (link.href.includes('facebook')) tooltipText = 'Facebook';
    else if (link.href.includes('instagram')) tooltipText = 'Instagram';
    else if (link.href.includes('linkedin')) tooltipText = 'LinkedIn';
    else if (link.href.includes('github')) tooltipText = 'GitHub';
    else if (link.href.includes('twitter')) tooltipText = 'Twitter';

    tooltip.textContent = tooltipText;
    tooltip.style.cssText = `
            position: absolute;
            bottom: 120%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(15, 23, 42, 0.9);
            color: white;
            padding: 0.5rem;
            border-radius: 4px;
            font-size: 0.8rem;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(248, 250, 252, 0.1);
        `;

    link.style.position = 'relative';
    link.appendChild(tooltip);

    link.addEventListener('mouseenter', () => {
      tooltip.style.opacity = '1';
    });

    link.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
    });
  });
}

// Service card hover effects
function initServiceCardEffects() {
  const serviceCards = document.querySelectorAll('.service-card');

  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      // Add glow effect
      this.style.boxShadow = 'var(--shadow-glow)';

      // Animate service number
      const serviceNumber = this.querySelector('.service-number');
      if (serviceNumber) {
        serviceNumber.style.transform = 'scale(1.1)';
        serviceNumber.style.color = 'var(--accent-blue)';
      }
    });

    card.addEventListener('mouseleave', function () {
      this.style.boxShadow = '';

      const serviceNumber = this.querySelector('.service-number');
      if (serviceNumber) {
        serviceNumber.style.transform = 'scale(1)';
        serviceNumber.style.color = 'var(--glass-border)';
      }
    });
  });
}

// Enhanced scroll-based animations
function initEnhancedScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => {
    observer.observe(el);
  });
}

// Mouse cursor effect (optional enhancement)
function initCursorEffect() {
  const cursor = document.createElement('div');
  cursor.className = 'cursor-follower';
  cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--gradient-primary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
        mix-blend-mode: difference;
    `;

  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
    cursor.style.opacity = '0.5';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '0.5';
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });
}

// Performance optimization
function optimizeImages() {
  const images = document.querySelectorAll('img');

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      }
    });
  });

  images.forEach(img => {
    imageObserver.observe(img);
  });
}

// Error handling for external resources
function handleResourceErrors() {
  // Handle image loading errors
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('error', function () {
      this.style.display = 'none';
      console.warn('Failed to load image:', this.src);
    });
  });

  // Handle font loading errors
  document.fonts.ready.then(() => {
    console.log('All fonts loaded successfully');
  }).catch(() => {
    console.warn('Some fonts failed to load');
  });
}

// Initialize error handling
document.addEventListener('DOMContentLoaded', function () {
  handleResourceErrors();
  optimizeImages();

  // Optional: Add cursor effect (uncomment to enable)
  // initCursorEffect();

  // Console message for developers
  console.log('%c👨‍💻 Roshan Lama Portfolio', 'color: #3b82f6; font-size: 16px; font-weight: bold;');
  console.log('%cBuilt with modern web technologies', 'color: #9333ea; font-size: 12px;');
  console.log('%cInterested in the code? Let\'s connect!', 'color: #f8fafc; font-size: 12px;');
});

// Floating Tech Icons Interactive Animation
function initFloatingTechIcons() {
  const techIcons = document.querySelectorAll('.tech-icon-float');

  if (techIcons.length === 0) return;

  // Add interactive hover effect
  techIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function () {
      this.style.animationPlayState = 'paused';
      this.style.transform = 'scale(1.3) rotate(0deg)';
    });

    icon.addEventListener('mouseleave', function () {
      this.style.animationPlayState = 'running';
      this.style.transform = '';
    });

    // Add click effect with ripple
    icon.addEventListener('click', function (e) {
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: rgba(59, 130, 246, 0.5);
        top: 0;
        left: 0;
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
      `;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add CSS for ripple animation
  if (!document.getElementById('ripple-animation-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-animation-style';
    style.textContent = `
      @keyframes rippleEffect {
        0% {
          transform: scale(0);
          opacity: 1;
        }
        100% {
          transform: scale(2);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Mouse parallax effect for tech icons
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mousemove', function (e) {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      techIcons.forEach((icon, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed * 20;
        const y = (mouseY - 0.5) * speed * 20;

        icon.style.transform = `translate(${x}px, ${y}px)`;
      });
    });

    hero.addEventListener('mouseleave', function () {
      techIcons.forEach(icon => {
        icon.style.transform = '';
      });
    });
  }
}

// Enhanced Portfolio Item Interactions
function enhancePortfolioItems() {
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', function () {
      // Add tilt effect
      this.style.transform = 'translateY(-8px) rotateX(2deg)';
    });

    item.addEventListener('mouseleave', function () {
      this.style.transform = '';
    });

    // 3D tilt effect based on mouse position
    item.addEventListener('mousemove', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      this.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
  });
}

// Initialize enhanced interactions
document.addEventListener('DOMContentLoaded', function () {
  enhancePortfolioItems();

  // Add smooth reveal for featured badges
  const featuredBadges = document.querySelectorAll('.featured-badge');
  featuredBadges.forEach((badge, index) => {
    badge.style.opacity = '0';
    badge.style.transform = 'scale(0)';

    setTimeout(() => {
      badge.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      badge.style.opacity = '1';
      badge.style.transform = 'scale(1)';
    }, 500 + (index * 200));
  });
});


// Back to Top Button
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');

  if (!backToTopBtn) return;

  // Show/hide button based on scroll position
  window.addEventListener('scroll', throttle(function () {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, 100));

  // Scroll to top when clicked
  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Smooth scroll for footer links
document.addEventListener('DOMContentLoaded', function () {
  const footerLinks = document.querySelectorAll('.footer-link[href^="#"]');

  footerLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
});
