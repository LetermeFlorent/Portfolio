/* =========================================
   MODULE EXPORT PDF
   ========================================= */

/**
 * Initialise le téléchargement PDF du CV
 */
export function initPDFExport() {
    const downloadBtn = document.getElementById('download-btn');
    
    if(!downloadBtn) {
        console.error('[PDF Export] Bouton de téléchargement introuvable');
        return;
    }
    
    console.log('[PDF Export] Module initialisé');
    
    downloadBtn.addEventListener('click', () => {
        const element = document.getElementById('cv-content');
        
        if (!element) {
            console.error('[PDF Export] Élément cv-content introuvable');
            return;
        }
        
        console.log('[PDF Export] Début de la génération...');
        
        const oldText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Génération...';
        downloadBtn.disabled = true;
        
        // Appliquer directement les styles sur l'élément original temporairement
        const originalStyle = element.style.cssText;
        
        // Forcer les styles du header
        const header = element.querySelector('.cv-header-paper');
        const originalHeaderStyle = header ? header.style.cssText : '';
        if (header) {
            header.style.cssText = `
                display: flex !important;
                flex-direction: row !important;
                justify-content: space-between !important;
                margin-bottom: 10px !important;
                border-bottom: 2px solid #000 !important;
                padding-bottom: 8px !important;
            `;
        }
        
        const cvLeft = element.querySelector('.cv-left');
        const originalLeftStyle = cvLeft ? cvLeft.style.cssText : '';
        if (cvLeft) {
            cvLeft.style.cssText = 'width: 60% !important; text-align: left !important;';
        }
        
        const cvRight = element.querySelector('.cv-right');
        const originalRightStyle = cvRight ? cvRight.style.cssText : '';
        if (cvRight) {
            cvRight.style.cssText = 'width: 40% !important; text-align: right !important; margin-top: 0 !important;';
        }
        
        setTimeout(() => {
            const opt = {
                margin: [5, 5, 5, 5],
                filename: 'CV_Florent_Leterme.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2,
                    useCORS: true,
                    letterRendering: true,
                    logging: false,
                    backgroundColor: '#ffffff'
                },
                jsPDF: { 
                    unit: 'mm', 
                    format: 'a4', 
                    orientation: 'portrait'
                }
            };
            
            html2pdf().set(opt).from(element).save().then(() => {
                console.log('[PDF Export] PDF généré avec succès');
                // Restaurer les styles originaux
                element.style.cssText = originalStyle;
                if (header) header.style.cssText = originalHeaderStyle;
                if (cvLeft) cvLeft.style.cssText = originalLeftStyle;
                if (cvRight) cvRight.style.cssText = originalRightStyle;
                downloadBtn.innerHTML = oldText;
                downloadBtn.disabled = false;
            }).catch(err => {
                console.error('[PDF Export] Erreur:', err);
                // Restaurer les styles originaux
                element.style.cssText = originalStyle;
                if (header) header.style.cssText = originalHeaderStyle;
                if (cvLeft) cvLeft.style.cssText = originalLeftStyle;
                if (cvRight) cvRight.style.cssText = originalRightStyle;
                downloadBtn.innerHTML = oldText;
                downloadBtn.disabled = false;
            });
        }, 200);
    });
}
