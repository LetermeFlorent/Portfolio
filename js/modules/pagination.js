/* =========================================
   MODULE PAGINATION
   ========================================= */

/**
 * Initialise la pagination pour une grille de projets
 */
export function initPagination(gridId, controlsId, itemsPerPage = 4) {
    const grid = document.getElementById(gridId);
    const controls = document.getElementById(controlsId);
    if(!grid || !controls) return;

    const items = Array.from(grid.children);
    const prevBtn = controls.querySelector('.prev-btn');
    const nextBtn = controls.querySelector('.next-btn');
    const pageInfo = controls.querySelector('.page-info');
    
    let currentPage = 1;
    let isAnimating = false;

    prevBtn.innerHTML = `<i class="fa-solid fa-arrow-left-long"></i> Précédent`;
    nextBtn.innerHTML = `Suivant <i class="fa-solid fa-arrow-right-long"></i>`;

    function render(direction = 'init') {
        if (isAnimating && direction !== 'init') return;
        
        const totalPages = Math.ceil(items.length / itemsPerPage);

        // Si une seule page, masquer les contrôles
        if (totalPages <= 1) {
            controls.style.display = 'none';
            items.forEach(item => {
                item.style.display = 'flex';
                item.style.opacity = 1;
                item.style.transform = 'translate(0,0)';
            });
            return;
        } else {
            controls.style.display = 'flex';
        }

        if (direction !== 'init') isAnimating = true;

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        // Masquer tous les items hors de la page actuelle
        items.forEach((item, index) => {
            if (index < start || index >= end) {
                item.style.display = 'none';
            }
        });

        const visibleItems = items.slice(start, end);
        
        // Animer les items visibles
        visibleItems.forEach((item, index) => {
            item.style.display = 'flex'; 
            
            if (direction !== 'init') {
                gsap.fromTo(item, 
                    { opacity: 0, y: 30, scale: 0.95 },
                    { 
                        opacity: 1, y: 0, scale: 1, 
                        duration: 0.5, 
                        stagger: 0.08, 
                        ease: "back.out(1.2)", 
                        clearProps: "all",
                        onComplete: () => {
                            if (index === visibleItems.length - 1) {
                                isAnimating = false;
                            }
                        }
                    }
                );
            } else {
                item.style.opacity = 1;
                item.style.transform = 'none';
            }
        });

        // Mettre à jour l'interface
        pageInfo.textContent = `${currentPage} / ${totalPages}`;
        prevBtn.disabled = (currentPage === 1);
        nextBtn.disabled = (currentPage === totalPages);
    }

    // Cloner les boutons pour supprimer les anciens listeners
    const newPrev = prevBtn.cloneNode(true);
    const newNext = nextBtn.cloneNode(true);
    prevBtn.parentNode.replaceChild(newPrev, prevBtn);
    nextBtn.parentNode.replaceChild(newNext, nextBtn);

    // Ajouter les nouveaux listeners
    newPrev.addEventListener('click', () => {
        if(currentPage > 1 && !isAnimating) { 
            currentPage--; 
            render('prev'); 
        }
    });

    newNext.addEventListener('click', () => {
        const totalPages = Math.ceil(items.length / itemsPerPage);
        if(currentPage < totalPages && !isAnimating) { 
            currentPage++; 
            render('next'); 
        }
    });

    render('init');
}
