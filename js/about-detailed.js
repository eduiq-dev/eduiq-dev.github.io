/* About Detailed Page JavaScript */

document.addEventListener("DOMContentLoaded", function () {
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

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
