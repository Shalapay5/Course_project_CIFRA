const nav = document.querySelector('nav');
const burgerBtn = document.querySelector('.burger-menu');
const burgerCls = document.querySelector('.close-btn')
const body = document.body;

function toggleMenu() {
    nav.classList.toggle('active');
    
    if (nav.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = 'auto';
    }
}

burgerBtn.addEventListener('click', toggleMenu);
burgerCls.addEventListener('click', toggleMenu);

const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        body.style.overflow = 'auto';
    });
});