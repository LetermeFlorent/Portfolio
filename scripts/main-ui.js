/* ==========================================================================
   INTERFACE UTILISATEUR & ANIMATIONS
   Gère les modales, les boutons, le toggle audio, les ScrollTriggers
   ET l'animation du nom (Florent Leterme <-> Dreyka Oas).
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- Initialisation GSAP ---
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Variables UI
    const modal = document.getElementById('cv-modal');
    const body = document.body;
    const muteBtn = document.getElementById('audio-toggle');
    const openModalBtn = document.getElementById('open-modal-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const printBtn = document.getElementById('print-html-btn');

    // --- ANIMATION DU NOM (HACKER EFFECT) ---
    const nameElement = document.getElementById('dynamic-name');
    if (nameElement) {
        const names = ["Florent Leterme", "Dreyka Oas"];
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let currentNameIndex = 0;
        let interval = null;

        // Fonction d'animation de décryptage
        const animateText = (targetName) => {
            let iteration = 0;
            
            clearInterval(interval);
            
            interval = setInterval(() => {
                nameElement.innerText = targetName
                    .split("")
                    .map((letter, index) => {
                        // Si l'itération a dépassé l'index, on affiche la vraie lettre
                        if(index < iteration) {
                            return targetName[index];
                        }
                        // Sinon on affiche une lettre aléatoire
                        return letters[Math.floor(Math.random() * letters.length)];
                    })
                    .join("");
                
                // On arrête quand tout le mot est décrypté
                if(iteration >= targetName.length){ 
                    clearInterval(interval);
                }
                
                iteration += 1 / 3; // Vitesse de décryptage
            }, 30); // 30ms par frame
        };

        // Boucle infinie : Change toutes les 4 secondes
        const loopNames = () => {
            setTimeout(() => {
                // Change l'index
                currentNameIndex = (currentNameIndex + 1) % names.length;
                const nextName = names[currentNameIndex];
                
                // Change la couleur selon le nom
                if (nextName === "Dreyka Oas") {
                    nameElement.style.color = "#a855f7"; // Violet pour Dreyka
                    nameElement.style.textShadow = "0 0 15px rgba(168, 85, 247, 0.6)";
                } else {
                    nameElement.style.color = "#ffffff"; // Blanc pour Florent
                    nameElement.style.textShadow = "0 4px 20px rgba(0,0,0,1)";
                }

                // Lance l'effet
                animateText(nextName);
                
                // Relance la boucle
                loopNames();
            }, 4000); // Pause de 4 secondes entre chaque changement
        };

        // Démarrage de la boucle
        loopNames();
    }

    // --- Gestion Audio (Toggle UI) ---
    if (muteBtn) {
        muteBtn.addEventListener('click', () => {
            if (window.soundManager) {
                const isMuted = window.soundManager.toggleMute();
                muteBtn.innerHTML = isMuted ? '🔇' : '🔊';
                
                if (!isMuted) { 
                    muteBtn.classList.remove('muted'); 
                    gsap.fromTo(muteBtn, {scale: 1.2}, {scale: 1, duration: 0.2});
                } else { 
                    muteBtn.classList.add('muted'); 
                }
            } else {
                console.error("❌ Erreur : window.soundManager n'est pas trouvé.");
            }
        });
    }

    // --- Gestion Modale CV ---
    if (openModalBtn) {
        openModalBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
            body.style.overflow = 'hidden'; 
            gsap.to(modal, { opacity: 1, duration: 0.3 });
            gsap.fromTo(".cv-document-wrapper", 
                { scale: 0.95, y: 30 }, 
                { scale: 1, y: 0, duration: 0.4, ease: "back.out(1.2)" }
            );
        });
    }

    const closeModal = () => {
        gsap.to(modal, { 
            opacity: 0, 
            duration: 0.3, 
            onComplete: () => { 
                modal.style.display = 'none'; 
                body.style.overflow = 'auto'; 
            } 
        });
    };

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    // --- Fonction Impression ---
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            const content = document.getElementById('printable-area').innerHTML;
            const printWindow = window.open('', '', 'height=600,width=800');
            
            const printStyle = `
                @page { size: A4; margin: 10mm; }
                body { font-family: 'Helvetica', sans-serif; color: #000; padding: 10mm; font-size: 12pt; }
                h1 { font-size: 24pt; margin-bottom: 5px; }
                h2 { font-size: 14pt; color: #3b82f6; margin-top: 5px; }
                .cv-section-title { border-bottom: 2px solid #3b82f6; margin: 20px 0 10px; font-weight: bold; text-transform: uppercase; }
                .cv-entry-header { display: flex; justify-content: space-between; font-weight: bold; }
                .tag { border: 1px solid #333; padding: 2px 5px; border-radius: 4px; display: inline-block; margin: 2px; font-size: 9pt; }
                a { color: #000; text-decoration: none; }
                ul { padding-left: 20px; }
                .cv-contact { font-size: 10pt; color: #555; }
            `;
            
            printWindow.document.write(`<html><head><title>CV Florent Leterme</title><style>${printStyle}</style></head><body>${content}</body></html>`);
            printWindow.document.close();
            
            setTimeout(() => {
                printWindow.print();
                printWindow.close();
            }, 500);
        });
    }

    // --- Navigation Scroll Smooth ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); 
            const targetId = this.getAttribute('href'); 
            if(targetId === '#') return;
            gsap.to(window, { duration: 1.5, scrollTo: { y: targetId, autoKill: false }, ease: "power2.inOut" });
        });
    });

    // --- Animations GSAP ScrollTrigger ---
    let hasPlayedStructureSound = false;
    
    const tl3d = gsap.timeline({
        scrollTrigger: { 
            trigger: "body", 
            start: "top top", 
            end: "bottom bottom", 
            scrub: 1,
            onUpdate: (self) => {
                if (self.progress > 0.1 && !hasPlayedStructureSound && window.soundManager && window.soundManager.enabled && !window.soundManager.muted) {
                    window.soundManager.playFlyby();
                    hasPlayedStructureSound = true;
                }
                if (self.progress < 0.05) { hasPlayedStructureSound = false; }
                
                // Animation manuelle des objets 3D (Fallback si scene-3d n'a pas sa propre boucle ou pour synchroniser)
                if (window.spaceGroup) {
                    window.spaceGroup.rotation.x = self.progress * 0.2; // Rotation légère au scroll
                }
                if (window.camera3D) window.camera3D.position.z = 10 - (self.progress * 4);
                if (window.ring1) {
                    window.ring1.material.color.r = 0.23 + (self.progress * 0.42); 
                }
            }
        }
    });

    document.querySelectorAll('.glass-card').forEach(card => {
        gsap.fromTo(card, 
            { opacity: 0, scale: 0.95, y: 30 },
            { 
                scrollTrigger: { trigger: card, start: "top 90%", end: "top 60%", scrub: 1 }, 
                opacity: 1, scale: 1, y: 0, ease: "power2.out" 
            }
        );
    });

});