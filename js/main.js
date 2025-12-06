/* =========================================
   PORTFOLIO - FLORENT LETERME
   Point d'entrée principal
   ========================================= */

import { initAnimations } from './modules/animations.js';
import { fetchAndRenderRepos } from './modules/github-api.js';
import { initPagination } from './modules/pagination.js';
import { initModalCV } from './modules/modal-cv.js';
import { initPDFExport } from './modules/pdf-export.js';

document.addEventListener("DOMContentLoaded", async () => {
    console.log('[Main] Démarrage du portfolio...');
    
    // 1. Initialiser les animations GSAP
    console.log('[Main] Initialisation des animations...');
    initAnimations();

    // 2. Charger et afficher les projets GitHub
    console.log('[Main] Chargement des projets GitHub...');
    await fetchAndRenderRepos('LetermeFlorent', 'pro-grid', 'pro-pagination', 'pro-count');
    initPagination('pro-grid', 'pro-pagination', 4);
    
    await fetchAndRenderRepos('Dreyka-Oas', 'lab-grid', 'lab-pagination', 'lab-count');
    initPagination('lab-grid', 'lab-pagination', 4);

    // 3. Initialiser la modale CV
    console.log('[Main] Initialisation de la modale CV...');
    initModalCV();

    // 4. Initialiser l'export PDF
    console.log('[Main] Initialisation de l\'export PDF...');
    initPDFExport();
    
    console.log('[Main] Portfolio chargé avec succès !');
});
