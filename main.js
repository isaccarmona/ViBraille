// Header effect on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const backToTop = document.querySelector('.back-to-top');

    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        backToTop.classList.add('visible');
    } else {
        header.classList.remove('scrolled');
        backToTop.classList.remove('visible');
    }
});

// Animate cards and elements when they appear in viewport using IntersectionObserver
const animateOnScroll = document.querySelectorAll('.card, .team-member, .mission-card');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

animateOnScroll.forEach(element => observer.observe(element));

// Mobile menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const closeMenuBtn = document.querySelector('.close-menu');
const mobileMenu = document.querySelector('.mobile-menu');
const overlay = document.querySelector('.overlay');
const mobileLinks = document.querySelectorAll('.mobile-links a');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

const closeMenu = () => {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
};

closeMenuBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;

        window.scrollTo({
            top: targetElement?.offsetTop - headerHeight,
            behavior: 'smooth'
        });
    });
});