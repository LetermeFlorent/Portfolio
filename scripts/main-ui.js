document.addEventListener("DOMContentLoaded", () => {
    
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // --- 0.1 SMOOTH SCROLL NAV ---
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

    // --- 0.2 NAVBAR SCROLL EFFECT ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    // --- 1. HERO REVEAL ---
    const tl = gsap.timeline();
    tl.to('.reveal-text', { 
        y: 0, 
        duration: 1.2, 
        ease: "power4.out", 
        stagger: 0.15,
        force3D: true, 
        onComplete: () => { gsap.set('.reveal-text', { clearProps: "will-change" }); }
    })
    .to('.reveal', { 
        opacity: 1, y: 0, duration: 1, stagger: 0.1, force3D: true 
    }, "-=0.8");


    // --- 2. CONFIGURATION & DONNÉES ---
    const languageColors = {
        'JavaScript': '#f7df1e', 'TypeScript': '#3178c6', 'HTML': '#e34c26',
        'CSS': '#563d7c', 'Python': '#3572A5', 'Java': '#b07219',
        'PHP': '#4F5D95', 'Shell': '#89e051', 'Batchfile': '#C1F12E',
        'Vue': '#41b883', 'React': '#61dafb', 'C++': '#f34b7d', 'Node.js': '#6cc24a'
    };

    const languageUrls = {
        'JavaScript': 'https://developer.mozilla.org/fr/docs/Web/JavaScript',
        'TypeScript': 'https://www.typescriptlang.org/',
        'HTML': 'https://developer.mozilla.org/fr/docs/Web/HTML',
        'CSS': 'https://developer.mozilla.org/fr/docs/Web/CSS',
        'Python': 'https://www.python.org/',
        'Java': 'https://dev.java/',
        'PHP': 'https://www.php.net/',
        'Shell': 'https://www.gnu.org/software/bash/',
        'Batchfile': 'https://learn.microsoft.com/fr-fr/windows-server/administration/windows-commands/windows-commands',
        'Vue': 'https://vuejs.org/',
        'React': 'https://react.dev/',
        'C++': 'https://isocpp.org/',
        'Node.js': 'https://nodejs.org/'
    };

    const fallbackProjects = {
        'LetermeFlorent': [
            { name: 'Portfolio', html_url: 'https://github.com/LetermeFlorent/Portfolio', description: 'Code source de ce site portfolio interactif.', language: 'JavaScript' },
            { name: 'Vaccination', html_url: 'https://github.com/LetermeFlorent/Vaccination', description: 'Application de gestion de centre de vaccination.', language: 'PHP' },
            { name: 'systeme_de_reservation', html_url: 'https://github.com/LetermeFlorent/systeme_de_reservation', description: 'Système de réservation de créneaux en ligne.', language: 'PHP' },
            { name: 'simple_storage', html_url: 'https://github.com/LetermeFlorent/simple_storage', description: 'Solution légère de gestion de stock.', language: 'PHP' },
            { name: 'Guide-Docker', html_url: 'https://github.com/LetermeFlorent/Guide-Docker', description: 'Documentation et guide pour la conteneurisation.', language: 'HTML' },
            { name: 'AppBTS', html_url: 'https://github.com/LetermeFlorent/AppBTS', description: 'Projets et exercices pratiques Java (BTS SIO).', language: 'Java' }
        ],
        'Dreyka-Oas': [
            { name: 'SpaceWorld', html_url: 'https://github.com/Dreyka-Oas/SpaceWorld', description: 'Projet expérimental HTML/Web.', language: 'HTML' },
            { name: 'McreaHub', html_url: 'https://github.com/Dreyka-Oas/McreaHub', description: 'Hub de création et ressources JS.', language: 'JavaScript' },
            { name: 'Scripts', html_url: 'https://github.com/Dreyka-Oas/Scripts', description: 'Collection de scripts utilitaires et d\'automatisation.', language: 'Batchfile' },
            { name: 'LogoCreator', html_url: 'https://github.com/Dreyka-Oas/LogoCreator', description: 'Outil de génération de logos simple.', language: 'HTML' },
            { name: 'Kill-VM', html_url: 'https://github.com/Dreyka-Oas/Kill-VM', description: 'Script de gestion de machines virtuelles.', language: 'Shell' },
            { name: 'Clash-Sim', html_url: 'https://github.com/Dreyka-Oas/Clash-Sim', description: 'Simulateur de combat et stratégie.', language: 'PHP' },
            { name: 'Arclight-Web', html_url: 'https://github.com/Dreyka-Oas/Arclight-Web', description: 'Interface web pour le projet Arclight.', language: 'CSS' },
            { name: 'SpacePanel.js', html_url: 'https://github.com/Dreyka-Oas/SpacePanel', description: 'Dashboard admin temps réel via Sockets.', language: 'Node.js' }
        ]
    };

    // --- 3. FONCTIONS D'AFFICHAGE ---
    function createProjectCard(repo) {
        let iconClass = 'fa-regular fa-folder';
        const lang = repo.language || 'Code';
        
        if (lang === 'Python') iconClass = 'fa-brands fa-python';
        else if (lang === 'JavaScript' || lang === 'Node.js') iconClass = 'fa-brands fa-js';
        else if (lang === 'Java') iconClass = 'fa-brands fa-java';
        else if (lang === 'PHP') iconClass = 'fa-brands fa-php';
        else if (lang === 'HTML') iconClass = 'fa-brands fa-html5';
        else if (lang === 'CSS') iconClass = 'fa-brands fa-css3-alt';

        const color = languageColors[lang] || '#888';
        const langUrl = languageUrls[lang] || '#';
        const cursorStyle = languageUrls[lang] ? 'pointer' : 'default';

        const card = document.createElement('a');
        card.href = repo.html_url;
        card.target = "_blank";
        card.className = "project-box clean-box";
        card.style.display = 'none';

        const desc = repo.description ? repo.description : 'Projet en développement.';

        card.innerHTML = `
            <div class="box-top">
                <span class="folder-icon"><i class="${iconClass}"></i></span>
                <span class="arrow-icon">↗</span>
            </div>
            <div class="box-content">
                <h3>${repo.name}</h3>
                <p>${desc}</p>
            </div>
            <div class="box-footer">
                <div style="display:flex; align-items:center; gap:8px;">
                    <span class="lang-dot" style="background:${color}"></span>
                    <object>
                        <a href="${langUrl}" target="_blank" style="text-decoration:none; color:inherit; font-weight:600; cursor:${cursorStyle}; transition: color 0.2s;" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='inherit'">
                            ${lang}
                        </a>
                    </object>
                </div>
            </div>
        `;
        return card;
    }

    async function fetchAndRenderRepos(username, containerId, paginationId, countId) {
        const container = document.getElementById(containerId);
        const countSpan = document.getElementById(countId);
        if (!container) return;

        let reposToDisplay = [];

        try {
            const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
            if (!response.ok) throw new Error(`API Error ${response.status}`);
            const data = await response.json();
            reposToDisplay = data.filter(repo => !repo.fork); 
        } catch (error) {
            console.warn(`[GitHub] API Bloquée/Erreur. Fallback activé pour ${username}.`);
            if (fallbackProjects[username]) {
                reposToDisplay = fallbackProjects[username];
            }
        }

        container.innerHTML = ''; 
        
        if(countSpan) {
            countSpan.textContent = `${reposToDisplay.length} Projets`;
        }

        if (reposToDisplay.length === 0) {
            container.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color:#888;">Aucun projet à afficher.</p>';
            return;
        }

        reposToDisplay.forEach(repo => {
            const card = createProjectCard(repo);
            container.appendChild(card);
        });

        initPagination(containerId, paginationId, 4);
    }

    // --- 4. PAGINATION LOGIC ---
    function initPagination(gridId, controlsId, itemsPerPage = 4) {
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

            items.forEach((item, index) => {
                if (index < start || index >= end) {
                    item.style.display = 'none';
                }
            });

            const visibleItems = items.slice(start, end);
            
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

            pageInfo.textContent = `${currentPage} / ${totalPages}`;
            prevBtn.disabled = (currentPage === 1);
            nextBtn.disabled = (currentPage === totalPages);
        }

        const newPrev = prevBtn.cloneNode(true);
        const newNext = nextBtn.cloneNode(true);
        prevBtn.parentNode.replaceChild(newPrev, prevBtn);
        nextBtn.parentNode.replaceChild(newNext, nextBtn);

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

    fetchAndRenderRepos('LetermeFlorent', 'pro-grid', 'pro-pagination', 'pro-count');
    fetchAndRenderRepos('Dreyka-Oas', 'lab-grid', 'lab-pagination', 'lab-count');


    // --- 5. ANIMATION EMAIL FOOTER ---
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


    // --- 6. MODALE CV & PDF ---
    const modalWrapper = document.getElementById('cv-modal');
    const openBtn = document.getElementById('open-cv-btn');
    const closeBtn = document.getElementById('close-modal');
    const downloadBtn = document.getElementById('download-btn');
    const backdrop = document.querySelector('.modal-backdrop');
    const panel = document.querySelector('.modal-panel');

    if(openBtn && modalWrapper) {
        
        const openModal = () => {
            document.body.classList.add('no-scroll');
            
            // 1. Initialisation propre (Slide Up simple)
            gsap.set(modalWrapper, { display: 'flex' });
            gsap.set(backdrop, { opacity: 0 });
            gsap.set(panel, { opacity: 0, y: 30 }); 

            // 2. Animation (Fade + Slide)
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
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalWrapper.style.display === 'flex') {
                closeModal();
            }
        });
    }

    // --- 7. TÉLÉCHARGEMENT PDF (CAPTURE DIRECTE) ---
    if(downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            
            const element = document.getElementById('cv-content');
            
            // FORCER LE LAYOUT DESKTOP POUR LE PDF
            element.classList.add('pdf-export-mode');
            
            const oldText = downloadBtn.innerHTML;
            downloadBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Génération...';
            downloadBtn.disabled = true;
            
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
                },
                pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
            };
            
            html2pdf().set(opt).from(element).save().then(() => {
                element.classList.remove('pdf-export-mode');
                downloadBtn.innerHTML = oldText;
                downloadBtn.disabled = false;
            }).catch(err => {
                console.error('Erreur PDF:', err);
                element.classList.remove('pdf-export-mode');
                downloadBtn.innerHTML = oldText;
                downloadBtn.disabled = false;
            });
        });
    }
});