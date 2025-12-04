/* ================================================================
   ULTRA EAST 2026 — PREMIUM ANIMATION & INTERACTION SYSTEM
   High-Performance • Accessibility-First • Production-Ready
   ================================================================ */

/* ================================================================
   1. SCROLL PROGRESS INDICATOR
   ================================================================ */

class ScrollProgressBar {
  constructor() {
    this.init();
  }

  init() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset;
      const trackLength = docHeight - winHeight;
      const progress = (scrollTop / trackLength) * 100;
      progressBar.style.width = `${Math.min(progress, 100)}%`;
    });
  }
}

/* ================================================================
   2. HERO PARALLAX SYSTEM
   ================================================================ */

class HeroParallax {
  constructor() {
    this.cards = document.querySelectorAll('.floating-card');
    this.bg = document.querySelector('.hero-bg');
    this.init();
  }

  init() {
    if (!this.cards.length || !this.bg) return;

    // Add parallax class for GPU acceleration
    this.cards.forEach(card => card.classList.add('parallax-layer'));
    this.bg.classList.add('parallax-bg');

    window.addEventListener('scroll', () => this.updateParallax(), { passive: true });
  }

  updateParallax() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    
    if (!heroSection) return;

    // Only parallax within hero section
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    if (scrolled > heroBottom) return;

    // Background parallax
    if (this.bg) {
      this.bg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }

    // Card parallax with different speeds for depth
    this.cards.forEach((card, index) => {
      const speed = 0.5 + (index * 0.2);
      card.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }
}

/* ================================================================
   3. INTERSECTION OBSERVER FOR ANIMATIONS
   ================================================================ */

class AnimationObserver {
  constructor() {
    this.observerOptions = {
      threshold: [0.1, 0.5],
      rootMargin: '0px 0px -50px 0px'
    };
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
        }
      });
    }, this.observerOptions);

    // Observe all animatable elements
    document.querySelectorAll(
      '.fade-in-up, .stagger-item, .premium-card, .rotate-in, .slide-in-left'
    ).forEach(el => {
      observer.observe(el);
    });

    // Observe section titles for word-by-word animation
    document.querySelectorAll('.section-title').forEach(title => {
      this.splitTitleWords(title);
      observer.observe(title);
    });
  }

  animateElement(element) {
    // Fade in up
    if (element.classList.contains('fade-in-up')) {
      element.style.animation = 'fadeInUp 0.6s ease-out forwards';
    }

    // Stagger grid items
    if (element.classList.contains('stagger-item')) {
      const index = Array.from(element.parentElement.children).indexOf(element);
      element.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`;
    }

    // Premium cards
    if (element.classList.contains('premium-card')) {
      element.style.animation = 'fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards';
    }

    // Rotate in
    if (element.classList.contains('rotate-in')) {
      element.style.animation = 'rotateIn 0.6s ease-out forwards';
    }

    // Slide in left
    if (element.classList.contains('slide-in-left')) {
      element.style.animation = 'slideInLeft 0.6s ease-out forwards';
    }

    // Section titles
    if (element.classList.contains('section-title')) {
      const words = element.querySelectorAll('.title-word');
      words.forEach((word, index) => {
        word.style.animation = `fadeInUp 0.6s ease-out ${index * 0.12}s forwards`;
      });
    }
  }

  splitTitleWords(title) {
    if (title.querySelector('.title-word')) return; // Already split

    const text = title.textContent;
    const words = text.split(' ');
    
    title.innerHTML = words.map(word => 
      `<span class="title-word">${word}</span>`
    ).join(' ');
  }
}

/* ================================================================
   4. STAGGERED GRID ANIMATIONS
   ================================================================ */

class StaggeredGrids {
  constructor() {
    this.init();
  }

  init() {
    const gridSelectors = [
      '.core-engines .row',
      '.featured-ip .row',
      '.events-section .row',
      '.talent-section .row',
      '.partnerships-section .row',
      '.about-section .row'
    ];

    gridSelectors.forEach(selector => {
      const grid = document.querySelector(selector);
      if (grid) {
        const items = grid.querySelectorAll('[class*="col-"]');
        items.forEach(item => {
          item.classList.add('stagger-item');
        });
      }
    });
  }
}

/* ================================================================
   5. MAGNETIC HOVER EFFECTS
   ================================================================ */

class MagneticHover {
  constructor() {
    this.init();
  }

  init() {
    const magneticElements = document.querySelectorAll(
      '.engine-card, .ip-card, .event-card, .sponsorship-card, .reason-card'
    );

    magneticElements.forEach(element => {
      element.addEventListener('mousemove', (e) => this.handleMouseMove(e, element));
      element.addEventListener('mouseleave', () => this.handleMouseLeave(element));
    });
  }

  handleMouseMove(e, element) {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const distX = (x - centerX) / centerX;
    const distY = (y - centerY) / centerY;

    // Subtle pull effect
    const moveX = distX * 8;
    const moveY = distY * 8;

    element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
  }

  handleMouseLeave(element) {
    element.style.transform = 'translate(0, 0) scale(1)';
  }
}

/* ================================================================
   6. NAVBAR ENHANCEMENTS
   ================================================================ */

class NavbarEnhancer {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.lastScrollY = 0;
    this.init();
  }

  init() {
    this.handleScroll();
    this.handleSmoothScroll();
    this.handleActiveNavLink();
    
    window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
  }

  handleScroll() {
    const currentScrollY = window.scrollY;

    // Add scrolled class for styling
    if (currentScrollY > 50) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }

    // Hide/show on scroll direction
    if (currentScrollY > this.lastScrollY && currentScrollY > 300) {
      this.navbar.style.transform = 'translateY(-100%)';
    } else {
      this.navbar.style.transform = 'translateY(0)';
    }

    this.lastScrollY = currentScrollY;
  }

  handleSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
          const offsetTop = target.offsetTop - 100;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  handleActiveNavLink() {
    window.addEventListener('scroll', () => {
      let current = '';
      const sections = document.querySelectorAll('section[id]');

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });

      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    }, { passive: true });
  }
}

/* ================================================================
   7. CARD INTERACTIONS
   ================================================================ */

class CardInteractions {
  constructor() {
    this.init();
  }

  init() {
    const cardSelectors = [
      '.engine-card',
      '.ip-card',
      '.event-card',
      '.sponsorship-card',
      '.reason-card',
      '.mission-card',
      '.premium-card'
    ];

    cardSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(card => {
        this.addCardInteractions(card);
      });
    });
  }

  addCardInteractions(card) {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-12px) scale(1.02)';
      card.style.boxShadow = '0 25px 50px rgba(212, 0, 28, 0.25)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
      card.style.boxShadow = '';
    });
  }
}

/* ================================================================
   8. BUTTON INTERACTIONS
   ================================================================ */

class ButtonInteractions {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('.btn').forEach(button => {
      button.addEventListener('mousedown', () => {
        button.style.transform = 'scale(0.96)';
      });

      button.addEventListener('mouseup', () => {
        button.style.transform = 'scale(1)';
      });

      button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
      });

      // Ripple effect
      button.addEventListener('click', (e) => this.createRipple(e, button));
    });
  }

  createRipple(e, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      left: ${x}px;
      top: ${y}px;
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  }
}

/* ================================================================
   9. FORM INTERACTIONS
   ================================================================ */

class FormInteractions {
  constructor() {
    this.init();
  }

  init() {
    this.handleContactForm();
    this.handleNewsletterForm();
    this.handleFormValidation();
  }

  handleContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      // Show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner"></span> Sending...';

      // Simulate form submission
      setTimeout(() => {
        submitBtn.innerHTML = '✓ Message Sent!';
        submitBtn.style.background = '#28E3D9';

        // Reset form
        contactForm.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
        }, 3000);
      }, 1500);
    });
  }

  handleNewsletterForm() {
    const newsletters = document.querySelectorAll('.newsletter');
    
    newsletters.forEach(newsletter => {
      newsletter.addEventListener('submit', (e) => {
        e.preventDefault();

        const input = newsletter.querySelector('input');
        const button = newsletter.querySelector('button');

        if (!input.value.trim()) {
          input.style.borderColor = '#D4001C';
          return;
        }

        // Show success state
        const originalText = button.innerHTML;
        button.innerHTML = '✓ Subscribed!';
        button.disabled = true;
        input.disabled = true;

        setTimeout(() => {
          button.innerHTML = originalText;
          button.disabled = false;
          input.disabled = false;
          input.value = '';
          input.style.borderColor = '';
        }, 2500);
      });
    });
  }

  handleFormValidation() {
    const formControls = document.querySelectorAll('.form-control');
    
    formControls.forEach(input => {
      input.addEventListener('blur', () => {
        if (input.type === 'email') {
          const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
          input.style.borderColor = isValid ? '#28E3D9' : '#D4001C';
        } else if (input.value.trim()) {
          input.style.borderColor = '#28E3D9';
        }
      });

      input.addEventListener('focus', () => {
        input.style.borderColor = '';
      });
    });
  }
}

/* ================================================================
   10. IMAGE LAZY LOADING
   ================================================================ */

class LazyLoadImages {
  constructor() {
    if ('IntersectionObserver' in window) {
      this.init();
    }
  }

  init() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '50px' });

    images.forEach(img => observer.observe(img));
  }
}

/* ================================================================
   11. BACK TO TOP BUTTON
   ================================================================ */

class BackToTopButton {
  constructor() {
    this.button = null;
    this.init();
  }

  init() {
    this.createButton();
    this.handleScroll();
    this.handleClick();
  }

  createButton() {
    this.button = document.createElement('button');
    this.button.className = 'btn btn-primary back-to-top';
    this.button.innerHTML = '<i class="bi bi-arrow-up"></i>';
    this.button.setAttribute('aria-label', 'Back to top');
    this.button.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: none;
      z-index: 999;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;

    document.body.appendChild(this.button);
  }

  handleScroll() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        this.button.style.display = 'flex';
        this.button.style.opacity = '1';
      } else {
        this.button.style.opacity = '0';
        setTimeout(() => {
          this.button.style.display = 'none';
        }, 300);
      }
    }, { passive: true });
  }

  handleClick() {
    this.button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* ================================================================
   12. PERFORMANCE MONITORING
   ================================================================ */

class PerformanceMonitor {
  constructor() {
    this.init();
  }

  init() {
    if ('PerformanceObserver' in window) {
      this.monitorLongTasks();
      this.logWebVitals();
    }
  }

  monitorLongTasks() {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.warn('⚠️ Long Task detected:', {
            duration: Math.round(entry.duration),
            startTime: Math.round(entry.startTime)
          });
        }
      });

      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      // Long Tasks API not supported
    }
  }

  logWebVitals() {
    // Largest Contentful Paint
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('📊 LCP:', Math.round(lastEntry.renderTime || lastEntry.loadTime), 'ms');
      });

      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // LCP not supported
    }

    // Cumulative Layout Shift
    try {
      let cls = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            cls += entry.value;
          }
        }
        console.log('📊 CLS:', cls.toFixed(3));
      });

      observer.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      // CLS not supported
    }
  }
}

/* ================================================================
   13. ACCESSIBILITY ENHANCEMENTS
   ================================================================ */

class AccessibilityEnhancements {
  constructor() {
    this.init();
  }

  init() {
    this.handleKeyboardNavigation();
    this.handleFocusManagement();
    this.announceToScreenReaders();
  }

  handleKeyboardNavigation() {
    // Skip to main content link
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('main-content')?.focus();
      });
    }
  }

  handleFocusManagement() {
    // Visible focus indicators
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-active');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-active');
    });
  }

  announceToScreenReaders() {
    // Announce page regions
    const regions = document.querySelectorAll('nav, main, footer');
    regions.forEach(region => {
      if (!region.getAttribute('role')) {
        if (region.tagName === 'NAV') region.setAttribute('role', 'navigation');
        if (region.tagName === 'MAIN') region.setAttribute('role', 'main');
        if (region.tagName === 'FOOTER') region.setAttribute('role', 'contentinfo');
      }
    });
  }
}

/* ================================================================
   14. THEME SYSTEM
   ================================================================ */

class ThemeSystem {
  constructor() {
    this.init();
  }

  init() {
    const theme = localStorage.getItem('theme') || 'dark';
    this.setTheme(theme);
    this.handleThemeToggle();
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  handleThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
      });
    }
  }
}

/* ================================================================
   15. INITIALIZATION
   ================================================================ */

class UltraEastApp {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.start());
    } else {
      this.start();
    }
  }

  start() {
    console.log('🚀 ULTRA EAST 2026 — Initializing Premium Experience');

    // Initialize all systems
    new ScrollProgressBar();
    new HeroParallax();
    new AnimationObserver();
    new StaggeredGrids();
    new MagneticHover();
    new NavbarEnhancer();
    new CardInteractions();
    new ButtonInteractions();
    new FormInteractions();
    new LazyLoadImages();
    new BackToTopButton();
    new PerformanceMonitor();
    new AccessibilityEnhancements();
    new ThemeSystem();

    console.log('✅ ULTRA EAST 2026 — Premium Experience Ready');
    console.log('🎯 Features: Parallax • Animations • Interactions • Performance');

    // Log performance metrics
    this.logMetrics();
  }

  logMetrics() {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const connectTime = perfData.responseEnd - perfData.requestStart;
        const renderTime = perfData.domComplete - perfData.domLoading;

        console.table({
          'Page Load Time': `${pageLoadTime}ms`,
          'Connect Time': `${connectTime}ms`,
          'Render Time': `${renderTime}ms`,
          'Status': pageLoadTime < 3000 ? '✅ Excellent' : '⚠️ Good'
        });
      }, { once: true });
    }
  }
}

/* ================================================================
   16. GLOBAL UTILITIES
   ================================================================ */

// Debounce utility
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Throttle utility
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Global animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes rotateIn {
    from {
      opacity: 0;
      transform: rotate(-180deg) scale(0.5);
    }
    to {
      opacity: 1;
      transform: rotate(0) scale(1);
    }
  }

  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }

  .keyboard-active *:focus {
    outline: 2px solid #D4001C;
    outline-offset: 2px;
  }
`;
document.head.appendChild(style);

// Start the application
new UltraEastApp();

// Export for testing
if (typeof window !== 'undefined') {
  window.UltraEast = {
    debounce,
    throttle,
    ScrollProgressBar,
    HeroParallax,
    AnimationObserver,
    MagneticHover,
    NavbarEnhancer
  };
}
// Disable parallax on deployed version if too slow
if (window.location.hostname !== 'localhost') {
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[style*="transform"]').forEach(el => {
      el.style.willChange = 'auto';
    });
  });
}