// Enhanced Main JavaScript for My Solutions Website

// Load header and footer
document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch('header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Header not found');
            }
            return response.text();
        })
        .then(data => {
            const headerPlaceholder = document.getElementById('header-placeholder');
            if (headerPlaceholder) {
                headerPlaceholder.innerHTML = data;
                initializeNavigation();
            }
        })
        .catch(error => {
            console.error('Error loading header:', error);
            // Fallback header if includes/header.html is not found
            const headerPlaceholder = document.getElementById('header-placeholder');
            if (headerPlaceholder) {
                headerPlaceholder.innerHTML = `
                    <header class="header">
                        <nav class="nav">
                            <div class="logo">All Pro - Solutions, Training, Internship</div>
                            <button class="mobile-menu-btn">
                                <i class="fas fa-bars"></i>
                            </button>
                            <ul class="nav-links">
                                <li><a href="index.html">Home</a></li>
                                <li><a href="services.html">Services</a></li>
                                <li><a href="courses.html">Courses</a></li>
                                <li><a href="portfolio.html">Portfolio</a></li>
                                <li><a href="samples.html">Samples</a></li>
                                <li><a href="about.html">About</a></li>
                                <li><a href="contact.html">Contact</a></li>
                            </ul>
                        </nav>
                    </header>
                `;
                initializeNavigation();
            }
        });
    
    // Load footer
    fetch('footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Footer not found');
            }
            return response.text();
        })
        .then(data => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = data;
            }
        })
        .catch(error => {
            console.error('Error loading footer:', error);
            // Fallback footer if includes/footer.html is not found
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = `
                    <footer class="footer">
                        <div class="footer-content">
                            <div class="footer-section">
                                <h4>Services</h4>
                                <a href="services.html">Web Development</a>
                                <a href="services.html">Training Programs</a>
                                <a href="services.html">3D Modeling</a>
                                <a href="services.html">Consulting</a>
                            </div>
                            <div class="footer-section">
                                <h4>Courses</h4>
                                <a href="courses.html">Java & Spring Boot</a>
                                <a href="courses.html">MERN Stack</a>
                                <a href="courses.html">Database Design</a>
                                <a href="courses.html">3D Development</a>
                            </div>
                            <div class="footer-section">
                                <h4>Company</h4>
                                <a href="portfolio.html">Portfolio</a>
                                <a href="samples.html">Samples</a>
                                <a href="about.html">About Us</a>
                                <a href="contact.html">Contact</a>
                            </div>
                            <div class="footer-section">
                                <h4>Connect</h4>
                                <a href="#" onclick="showNotification('Follow us on LinkedIn!', 'info')">
                                    <i class="fab fa-linkedin"></i> LinkedIn
                                </a>
                                <a href="#" onclick="showNotification('Follow us on Twitter!', 'info')">
                                    <i class="fab fa-twitter"></i> Twitter
                                </a>
                                <a href="#" onclick="showNotification('Subscribe to our YouTube channel!', 'info')">
                                    <i class="fab fa-youtube"></i> YouTube
                                </a>
                                <a href="mailto:info@mysolutions.com">
                                    <i class="fas fa-envelope"></i> Email
                                </a>
                            </div>
                        </div>
                        <div class="footer-bottom">
                            <p>&copy; 2025 All Pro. All rights reserved. | Empowering businesses through technology</p>
                        </div>
                    </footer>
                `;
            }
        });

    // Initialize other features
    initializeAnimations();
    initializeFormHandling();
    initializePortfolioFilters();
});

// Enhanced Navigation
function initializeNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate hamburger icon
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Set active nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        // Add background blur when scrolled
        if (scrollTop > 50) {
            header.style.background = 'linear-gradient(135deg, rgba(79, 70, 229, 0.95) 0%, rgba(124, 58, 237, 0.95) 50%, rgba(236, 72, 153, 0.95) 100%)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%)';
            header.style.backdropFilter = 'blur(10px)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Animation on scroll
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Add fade-in class to cards and sections
    document.querySelectorAll('.service-card, .course-card, .portfolio-item, .pricing-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Enhanced Form Handling
function initializeFormHandling() {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                showNotification('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                this.reset();
            }
        });
    }
}

// Portfolio Filters
function initializePortfolioFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterBtns.length > 0 && portfolioItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const filter = this.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        item.style.opacity = '0';
                        setTimeout(() => {
                            item.style.opacity = '1';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

// FAQ Toggle
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('i');
    
    answer.classList.toggle('active');
    
    if (answer.classList.contains('active')) {
        icon.classList.remove('fa-plus');
        icon.classList.add('fa-minus');
    } else {
        icon.classList.remove('fa-minus');
        icon.classList.add('fa-plus');
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Course enrollment tracking
function trackCourseInterest(courseName) {
    // Analytics tracking (replace with your analytics code)
    console.log(`User interested in: ${courseName}`);
    
    // You can add Google Analytics, Facebook Pixel, or other tracking here
    if (typeof gtag !== 'undefined') {
        gtag('event', 'course_interest', {
            'course_name': courseName,
            'event_category': 'engagement'
        });
    }
}

// Service inquiry tracking
function trackServiceInquiry(serviceName) {
    console.log(`User inquired about: ${serviceName}`);
    
    if (typeof gtag !== 'undefined') {
        gtag('event', 'service_inquiry', {
            'service_name': serviceName,
            'event_category': 'lead'
        });
    }
}

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// Utility functions
const utils = {
    // Debounce function for performance
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },

    // Format currency
    formatCurrency: function(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    },

    // Validate email
    validateEmail: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
};

// Export for use in other scripts
window.MySolutions = {
    showNotification,
    toggleFAQ,
    trackCourseInterest,
    trackServiceInquiry,
    utils
};



