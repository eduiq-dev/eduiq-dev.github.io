document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.querySelector('.accordion-toggle');
    const content = document.querySelector('.accordion-content');
    toggle.addEventListener('click', () => {
        content.classList.toggle('active');
        toggle.textContent = content.classList.contains('active') ? 'Nuestras Apps ▴' : 'Nuestras Apps ▾';
    });
});