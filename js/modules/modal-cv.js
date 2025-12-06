/* =========================================
   MODULE MODALE CV
   ========================================= */

/**
 * Initialise la modale CV
 */
export function initModalCV() {
    const modalWrapper = document.getElementById('cv-modal');
    const openBtn = document.getElementById('open-cv-btn');
    const closeBtn = document.getElementById('close-modal');
    const backdrop = document.querySelector('.modal-backdrop');
    const panel = document.querySelector('.modal-panel');

    if(!openBtn || !modalWrapper) return;
    
    const openModal = () => {
        document.body.classList.add('no-scroll');
        
        // Initialisation propre (Slide Up simple)
        gsap.set(modalWrapper, { display: 'flex' });
        gsap.set(backdrop, { opacity: 0 });
        gsap.set(panel, { opacity: 0, y: 30 }); 

        // Animation (Fade + Slide)
        gsap.to(backdrop, { opacity: 1, duration: 0.3 });
        gsap.to(panel, { 
            opacity: 1, 
            y: 0, 
            duration: 0.3, 
            ease: "power3.out",
            onComplete: () => {
                gsap.set(panel, { clearProps: "transform" });
            }
        });
    };

    const closeModal = () => {
        gsap.to(backdrop, { opacity: 0, duration: 0.2 });
        gsap.to(panel, { 
            opacity: 0, 
            y: 30, 
            duration: 0.2, 
            onComplete: () => {
                gsap.set(modalWrapper, { display: 'none' });
                document.body.classList.remove('no-scroll');
            }
        });
    };

    openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    
    // Fermeture avec Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalWrapper.style.display === 'flex') {
            closeModal();
        }
    });
}
