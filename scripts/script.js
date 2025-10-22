
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavigation();
    initAnimations();
    initSkillsAnimation();
    initTypewriter();
    initParticles();
    initSmoothScrolling();
});

// Navigation function
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
            const isActive = navLinks.style.display === 'flex';
            
            if (isActive) {
                navLinks.style.display = 'none';
                resetToggleAnimation();
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'var(--primary-bg)';
                navLinks.style.padding = '2rem';
                navLinks.style.borderTop = '1px solid var(--border-color)';
                navLinks.style.boxShadow = 'var(--box-shadow)';
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
}

// Animate on scroll
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
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatableElements = document.querySelectorAll(
        '.skill-item, .project-card, .goal-item, .highlight-card, .contact-method'
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
                setTimeout(typeChar, 50);
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
                typeLine(0);
                terminalObserver.unobserve(entry.target);
            }
        });
    });

    terminalObserver.observe(terminalContent);
}

// Particle background
function initParticles() {
    const hero = document.querySelector('.hero-particles');
    if (!hero) return;

    for (let i = 0; i < 15; i++) {
        createParticle(hero);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;

    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: var(--accent-color);
        border-radius: 50%;
        opacity: ${Math.random() * 0.3};
        top: ${posY}%;
        left: ${posX}%;
        animation: floatParticle ${duration}s linear ${delay}s infinite;
    `;

    const style = document.createElement('style');
    if (!document.querySelector('#particle-animation')) {
        style.id = 'particle-animation';
        style.textContent = `
            @keyframes floatParticle {
                0% {
                    transform: translateY(0) translateX(0);
                    opacity: 0;
                }
                10% {
                    opacity: ${Math.random() * 0.3};
                }
                90% {
                    opacity: ${Math.random() * 0.1};
                }
                100% {
                    transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
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
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    const navLinks = document.querySelector('.nav-links');
                    const navToggle = document.querySelector('.nav-toggle');
                    navLinks.style.display = 'none';
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
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'row';
        navLinks.style.position = 'static';
        navLinks.style.background = 'transparent';
        navLinks.style.padding = '0';
        navLinks.style.borderTop = 'none';
        navLinks.style.boxShadow = 'none';
    } else {
        navLinks.style.display = 'none';
    }
});