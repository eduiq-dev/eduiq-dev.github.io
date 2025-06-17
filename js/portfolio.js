document.addEventListener("DOMContentLoaded", function () {
    // Mobile navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');

    const updateNavbarBackground = () => {
        const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark' ||
            (!document.documentElement.getAttribute('data-theme') &&
                window.matchMedia('(prefers-color-scheme: dark)').matches);

        if (window.scrollY > 100) {
            if (isDarkTheme) {
                navbar.style.background = 'rgba(15, 23, 42, 0.98)';
                navbar.style.borderBottom = '1px solid #334155';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.borderBottom = '1px solid #e2e8f0';
            }
        } else {
            if (isDarkTheme) {
                navbar.style.background = 'rgba(15, 23, 42, 0.95)';
                navbar.style.borderBottom = '1px solid transparent';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.borderBottom = '1px solid transparent';
            }
        }
    };

    window.addEventListener('scroll', updateNavbarBackground);

    // Update navbar when theme changes
    const originalApplyTheme = applyTheme;
    applyTheme = function (theme) {
        originalApplyTheme(theme);
        setTimeout(updateNavbarBackground, 50); // Small delay to ensure theme is applied
    };

    // Intersection Observer for active navigation
    const sections = document.querySelectorAll('section[id]');

    const observerOptions = {
        rootMargin: '-50% 0px -50% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // Add active class to current section's nav link
                const activeLink = document.querySelector(`a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.skill-category, .project-card, .contact-item');

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial setup for animation elements
    const setupAnimations = () => {
        const elements = document.querySelectorAll('.skill-category, .project-card, .contact-item');
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    };

    setupAnimations();
    animateOnScroll();

    window.addEventListener('scroll', animateOnScroll);

    // Typing effect for hero section
    const heroTitle = document.querySelector('.hero-content h1');
    const originalText = heroTitle.textContent;

    const typeText = (element, text, speed = 100) => {
        element.textContent = '';
        let i = 0;

        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    };

    // Start typing effect after a short delay
    setTimeout(() => {
        typeText(heroTitle, originalText, 150);
    }, 500);

    // Add scroll indicator
    const createScrollIndicator = () => {
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        scrollIndicator.innerHTML = '↓';
        scrollIndicator.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            color: var(--color-primary);
            font-size: 2rem;
            animation: bounce 2s infinite;
            cursor: pointer;
            z-index: 100;
        `;

        // Add bounce animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% {
                    transform: translateX(-50%) translateY(0);
                }
                40% {
                    transform: translateX(-50%) translateY(-10px);
                }
                60% {
                    transform: translateX(-50%) translateY(-5px);
                }
            }
        `;
        document.head.appendChild(style);

        scrollIndicator.addEventListener('click', () => {
            document.querySelector('#about').scrollIntoView({
                behavior: 'smooth'
            });
        });

        document.body.appendChild(scrollIndicator);

        // Hide scroll indicator when scrolling
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    };

    createScrollIndicator();

    // Theme management
    const themeOptions = document.querySelectorAll('.theme-option');
    const html = document.documentElement;

    // Get saved theme preference or default to 'system'
    const savedTheme = localStorage.getItem('theme') || 'system';

    // Apply theme on page load
    applyTheme(savedTheme);
    updateActiveTheme(savedTheme);

    // Theme switcher event listeners
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.getAttribute('data-theme');
            applyTheme(theme);
            updateActiveTheme(theme);
            localStorage.setItem('theme', theme);
        });
    });

    function applyTheme(theme) {
        if (theme === 'system') {
            html.removeAttribute('data-theme');
        } else {
            html.setAttribute('data-theme', theme);
        }
    }

    function updateActiveTheme(theme) {
        themeOptions.forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-theme') === theme) {
                option.classList.add('active');
            }
        });
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (localStorage.getItem('theme') === 'system' || !localStorage.getItem('theme')) {
            // Re-apply system theme if user hasn't manually selected a theme
            applyTheme('system');
        }
    });
});
