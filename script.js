/* ============================================
   Portfolio Website - JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ====== THEME TOGGLE (DARK/LIGHT MODE) + RIPPLE EFFECT ======
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const body = document.body;

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Theme toggle click handler
    themeToggleBtn.addEventListener('click', (e) => {
        // Create Ripple Effect
        const ripple = document.createElement('div');
        ripple.classList.add('theme-ripple');
        document.body.appendChild(ripple);

        // Position ripple at click
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;

        // Use opposite theme color for ripple background
        const currentTheme = body.getAttribute('data-theme');
        ripple.style.backgroundColor = currentTheme === 'dark' ? '#ffffff' : '#0a0a0f';

        ripple.classList.add('animate');

        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        // Wait for ripple to cover screen before changing theme
        setTimeout(() => {
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        }, 400);

        // Remove Ripple
        setTimeout(() => {
            ripple.remove();
        }, 800);
    });

    function updateThemeIcon(theme) {
        if (theme === 'light') {
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }

    // ====== TYPING EFFECT ======
    const typedTextEl = document.getElementById('typed-text');
    const words = ['Fullstack Developer', 'Web Developer', 'Problem Solver', 'Tech Enthusiast'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typedTextEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typedTextEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 400; // Pause before next word
        }

        setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();

    // ====== NAVBAR SCROLL EFFECT ======
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ====== MOBILE NAV TOGGLE ======
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ====== ACTIVE NAV LINK ON SCROLL & SLIDING INDICATOR ======
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    // Create sliding indicator
    const navIndicator = document.createElement('div');
    navIndicator.classList.add('nav-indicator');
    navMenu.appendChild(navIndicator);

    function updateNavIndicator(activeLink) {
        if (activeLink) {
            navIndicator.style.width = `${activeLink.offsetWidth}px`;
            navIndicator.style.transform = `translateX(${activeLink.offsetLeft}px)`;
            navIndicator.style.opacity = '1';
        } else {
            navIndicator.style.opacity = '0';
        }
    }

    // Set initial indicator
    setTimeout(() => {
        const initialActive = document.querySelector('.nav-link.active');
        updateNavIndicator(initialActive);
    }, 100);

    function highlightNav() {
        const scrollY = window.scrollY + 100;
        let foundActive = false;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                        updateNavIndicator(link);
                        foundActive = true;
                    }
                });
            }
        });

        if (!foundActive && window.scrollY < 100) {
            updateNavIndicator(navLinks[0]);
        }
    }

    window.addEventListener('scroll', highlightNav);

    // Update indicator on window resize
    window.addEventListener('resize', () => {
        const activeItem = document.querySelector('.nav-link.active');
        if (activeItem) updateNavIndicator(activeItem);
    });

    // ====== SCROLL ANIMATIONS (Intersection Observer) ======
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animations slightly
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(el => observer.observe(el));

    // ====== SKILL BAR ANIMATION ======
    const skillBars = document.querySelectorAll('.skill-bar-fill');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // ====== PARTICLE BACKGROUND & INTERACTION ======
    const particlesContainer = document.getElementById('particles');
    const particlesArray = [];
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    function createParticles() {
        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            // Initial positioning properties
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;

            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.animationDuration = (Math.random() * 10 + 8) + 's';
            particle.style.animationDelay = (Math.random() * 5) + 's';
            particle.style.width = (Math.random() * 3 + 1) + 'px';
            particle.style.height = particle.style.width;

            particlesContainer.appendChild(particle);

            particlesArray.push({
                el: particle,
                x: x,
                y: y,
                baseX: x,
                baseY: y,
                density: (Math.random() * 5) + 1
            });
        }
    }

    createParticles();

    // Animate particles based on mouse position
    function animateParticles() {
        particlesArray.forEach(p => {
            // Calculate distance between mouse and particle
            let dx = mouseX - p.x;
            let dy = mouseY - p.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            // Interaction radius: 150px
            if (distance < 150) {
                // Push particles away
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (150 - distance) / 150;

                const pushX = forceDirectionX * force * p.density * 5;
                const pushY = forceDirectionY * force * p.density * 5;

                p.x -= pushX;
                p.y -= pushY;
            } else {
                // Return to base position slowly
                if (p.x !== p.baseX) {
                    p.x -= (p.x - p.baseX) / 10;
                }
                if (p.y !== p.baseY) {
                    p.y -= (p.y - p.baseY) / 10;
                }
            }

            p.el.style.transform = `translate(${p.x - p.baseX}px, ${p.y - p.baseY}px)`;
        });

        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // ====== CONTACT FORM ======
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('form-name').value;
        const email = document.getElementById('form-email').value;
        const message = document.getElementById('form-message').value;

        // Simple feedback (no backend)
        const btn = contactForm.querySelector('.btn-primary');
        const originalHTML = btn.innerHTML;

        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #00d4aa, #00b894)';

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            contactForm.reset();
        }, 3000);
    });

    // ====== SMOOTH REVEAL ON PAGE LOAD ======
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });

    // ====== CUSTOM CURSOR IMPLEMENTATION ======
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');

    const cursorFollower = document.createElement('div');
    cursorFollower.classList.add('custom-cursor-follower');

    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);

    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    let followerX = window.innerWidth / 2;
    let followerY = window.innerHeight / 2;

    window.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;

        // Update mouse position for particles
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Immediate position for the dot
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
    });

    // Smooth animation for the follower
    function animateCursorFollower() {
        followerX += (cursorX - followerX) * 0.15; // Smooth interpolation
        followerY += (cursorY - followerY) * 0.15;

        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';

        requestAnimationFrame(animateCursorFollower);
    }
    animateCursorFollower();

    // Add hover states to interactive elements
    const interactives = document.querySelectorAll('a, button, .custom-hover, .project-card, .btn');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });

});
