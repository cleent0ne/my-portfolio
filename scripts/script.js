
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavigation();
    initAnimations();
    initSkillsAnimation();
    initTypewriter();
    initParticles();
    initSmoothScrolling();
    initProjectCards();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
    });

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const isActive = navLinks.classList.contains('active');
            
            if (isActive) {
                navLinks.classList.remove('active');
                resetToggleAnimation();
            } else {
                navLinks.classList.add('active');
                animateToggle();
            }
        });
    }

    function animateToggle() {
        const bars = navToggle.querySelectorAll('span');
        bars[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    }

    function resetToggleAnimation() {
        const bars = navToggle.querySelectorAll('span');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            resetToggleAnimation();
        });
    });
}

// Animations on scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatableElements = document.querySelectorAll(
        '.skill-item, .project-card, .goal-item, .highlight-card, .contact-method, .expertise-category'
    );

    animatableElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Skills level animation
function initSkillsAnimation() {
    const skillsCategories = document.querySelectorAll('.skills-category');
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Set skill levels with delay for visual effect
                const skillItems = entry.target.querySelectorAll('.skill-item');
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        const level = item.getAttribute('data-skill-level');
                        const levelBar = item.querySelector('.skill-level');
                        if (levelBar) {
                            levelBar.style.width = level + '%';
                        }
                    }, index * 200);
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });

    skillsCategories.forEach(category => {
        skillsObserver.observe(category);
    });
}

// Project cards interaction
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add click effect
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking on links
            if (e.target.closest('.project-link')) return;
            
            card.style.transform = 'translateY(-4px) scale(1.02)';
            setTimeout(() => {
                card.style.transform = 'translateY(-8px)';
            }, 150);
        });

        
        card.addEventListener('mouseenter', () => {
            card.style.zIndex = '10';
        });

        card.addEventListener('mouseleave', () => {
            card.style.zIndex = '1';
        });
    });
}


function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'project-toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        background: var(--accent-color);
        color: var(--primary-bg);
        padding: 12px 20px;
        border-radius: var(--border-radius);
        font-weight: 600;
        z-index: 1001;
        box-shadow: var(--box-shadow);
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(toast);

    if (!document.querySelector('#toast-animations')) {
        const style = document.createElement('style');
        style.id = 'toast-animations';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Terminal typewriter effect
function initTypewriter() {
    const terminalContent = document.querySelector('.terminal-content');
    if (!terminalContent) return;

    const lines = terminalContent.querySelectorAll('.terminal-line');
    let currentLine = 0;

    function typeLine(lineIndex) {
        if (lineIndex >= lines.length) return;

        const line = lines[lineIndex];
        const text = line.textContent;
        line.textContent = '';
        line.style.opacity = '1';

        let charIndex = 0;
        const typeChar = () => {
            if (charIndex < text.length) {
                line.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 30);
            } else {
                currentLine++;
                setTimeout(() => typeLine(currentLine), 500);
            }
        };

        typeChar();
    }

    // Start typing when terminal is in view
    const terminalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => typeLine(0), 1000);
                terminalObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    terminalObserver.observe(terminalContent);
}

// Particle background
function initParticles() {
    const hero = document.querySelector('.hero-particles');
    if (!hero) return;

    // Clear any existing particles
    hero.innerHTML = '';

    for (let i = 0; i < 20; i++) {
        createParticle(hero);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 1;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 5;

    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: var(--accent-color);
        border-radius: 50%;
        opacity: ${Math.random() * 0.4};
        top: ${posY}%;
        left: ${posX}%;
        animation: floatParticle ${duration}s linear ${delay}s infinite;
        pointer-events: none;
    `;

    const style = document.createElement('style');
    if (!document.querySelector('#particle-animation')) {
        style.id = 'particle-animation';
        style.textContent = `
            @keyframes floatParticle {
                0% {
                    transform: translateY(0) translateX(0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: ${Math.random() * 0.4};
                }
                90% {
                    opacity: ${Math.random() * 0.1};
                }
                100% {
                    transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    container.appendChild(particle);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    const navLinks = document.querySelector('.nav-links');
                    const navToggle = document.querySelector('.nav-toggle');
                    navLinks.classList.remove('active');
                    resetToggleAnimation();
                }
            }
        });
    });

    function resetToggleAnimation() {
        const bars = document.querySelectorAll('.nav-toggle span');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
}

// Handle resize events
window.addEventListener('resize', function() {
    const navLinks = document.querySelector('.nav-links');
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        resetToggleAnimation();
    }
});

// Performance optimization
window.addEventListener('load', function() {
    
    const criticalImages = [
        'images/profile.jpg'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    
    initLazyLoading();
});

// Lazy loading for images
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
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


document.addEventListener('DOMContentLoaded', function() {
    
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            .btn {
                position: relative;
                overflow: hidden;
            }
        `;
        document.head.appendChild(style);
    }
});
