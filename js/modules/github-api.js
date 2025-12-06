/* =========================================
   MODULE GITHUB API
   ========================================= */

import { languageColors, languageUrls, fallbackProjects } from '../config/constants.js';

/**
 * Crée une carte de projet
 */
export function createProjectCard(repo) {
    let iconClass = 'fa-regular fa-folder';
    const lang = repo.language || 'Code';
    
    // Icônes spécifiques selon le langage
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

/**
 * Récupère et affiche les repos GitHub
 */
export async function fetchAndRenderRepos(username, containerId, paginationId, countId) {
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

    // Initialiser la pagination (module externe)
    return reposToDisplay;
}
