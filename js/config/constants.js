/* =========================================
   CONFIGURATION & CONSTANTES
   ========================================= */

// Couleurs des langages
export const languageColors = {
    'JavaScript': '#f7df1e',
    'TypeScript': '#3178c6',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Python': '#3572A5',
    'Java': '#b07219',
    'PHP': '#4F5D95',
    'Shell': '#89e051',
    'Batchfile': '#C1F12E',
    'Vue': '#41b883',
    'React': '#61dafb',
    'C++': '#f34b7d',
    'Node.js': '#6cc24a'
};

// URLs de documentation des langages
export const languageUrls = {
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

// Projets de secours en cas d'échec de l'API GitHub
export const fallbackProjects = {
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
