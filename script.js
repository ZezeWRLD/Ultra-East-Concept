// ULTRA EAST Website JavaScript - Fixed Version
document.addEventListener('DOMContentLoaded', function() {
    
    console.log('ULTRA EAST website initializing...');

    // Mobile Navigation Toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
    }
    
    // Smooth Scroll for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });
    
    // Navbar Background on Scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.backgroundColor = 'var(--ultra-black)';
                navbar.style.backdropFilter = 'none';
            }
        }
    });
    
    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            
            // Simulate form submission
            submitButton.innerHTML = 'Sending...';
            submitButton.classList.add('btn-loading');
            submitButton.disabled = true;
            
            // Simulate API call (replace with EmailJS integration)
            setTimeout(() => {
                alert('Thank you for your message! We\'ll get back to you soon.');
                contactForm.reset();
                submitButton.innerHTML = 'Send Message';
                submitButton.classList.remove('btn-loading');
                submitButton.disabled = false;
            }, 2000);
        });
    }
    
    // Safe Scroll Animations (Optional - commented out for stability)
    
    const fadeElements = document.querySelectorAll('.fade-in-up.enhanced');
    
    if (fadeElements.length > 0) {
        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        fadeElements.forEach(element => {
            fadeInObserver.observe(element);
        });
    }
    
    
    // Card Hover Effects
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Button Micro-interactions
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Newsletter Subscription
    const newsletterForm = document.querySelector('footer .input-group');
    
    if (newsletterForm) {
        const newsletterInput = newsletterForm.querySelector('input[type="email"]');
        const newsletterButton = newsletterForm.querySelector('button');
        
        newsletterButton.addEventListener('click', function() {
            const email = newsletterInput.value;
            
            if (email && isValidEmail(email)) {
                // Simulate subscription
                newsletterButton.innerHTML = 'Subscribed!';
                newsletterButton.disabled = true;
                newsletterInput.disabled = true;
                
                setTimeout(() => {
                    newsletterButton.innerHTML = 'Subscribe';
                    newsletterButton.disabled = false;
                    newsletterInput.disabled = false;
                    newsletterInput.value = '';
                }, 3000);
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Email Validation Helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Initialize Bootstrap Components
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    console.log('ULTRA EAST website initialized successfully');
});

// Fallback: Ensure content is visible even if JS fails
window.addEventListener('load', function() {
    document.body.style.visibility = 'visible';
    document.body.style.opacity = '1';
});