/* =========================================
   MODULE ANIMATIONS
   ========================================= */

/**
 * Initialise toutes les animations GSAP du site
 */
export function initAnimations() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Smooth scroll pour les liens de navigation
    initSmoothScroll();

    // Effet de scroll sur la navbar
    initNavbarScroll();

    // Animation d'entrée du hero
    initHeroReveal();

    // Animation du footer email
    initFooterAnimation();
}

/**
 * Smooth scroll pour la navigation
 */
function initSmoothScroll() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            gsap.to(window, {
                duration: 1.5,
                scrollTo: { y: targetId, offsetY: 80 },
                ease: "power3.inOut"
            });
        });
    });
}

/**
 * Effet de scroll sur la navbar
 */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/**
 * Animation d'entrée du hero
 */
function initHeroReveal() {
    const tl = gsap.timeline();
    
    tl.to('.reveal-text', { 
        y: 0, 
        duration: 1.2, 
        ease: "power4.out", 
        stagger: 0.15,
        force3D: true, 
        onComplete: () => { 
            gsap.set('.reveal-text', { clearProps: "will-change" }); 
        }
    })
    .to('.reveal', { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        stagger: 0.1, 
        force3D: true 
    }, "-=0.8");
}

/**
 * Animation du footer email
 */
function initFooterAnimation() {
    gsap.from(".footer-cta .big-mail", {
        scrollTrigger: {
            trigger: ".footer",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
}
