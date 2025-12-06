# 🎨 Portfolio - Florent Leterme

Portfolio personnel moderne et interactif avec animations GSAP et intégration GitHub API.

## 📁 Structure du Projet

```
Portfolio/
├── assets/              # Ressources statiques
│   └── audios/         # Fichiers audio
│
├── css/                # Styles CSS modulaires
│   ├── base/           # Styles de base
│   │   ├── variables.css    # Variables CSS (couleurs, espacements, etc.)
│   │   ├── reset.css        # Reset et styles globaux
│   │   └── typography.css   # Typographie et textes
│   │
│   ├── components/     # Composants UI
│   │   ├── navbar.css       # Navigation
│   │   ├── hero.css         # Section hero
│   │   ├── projects.css     # Grille de projets GitHub
│   │   ├── tech-stack.css   # Stack technique
│   │   ├── footer.css       # Footer et contact
│   │   └── modal-cv.css     # Modale et CV
│   │
│   ├── layout/         # Mise en page
│   │   ├── sections.css     # Sections et conteneurs
│   │   └── responsive.css   # Media queries
│   │
│   └── main.css        # Point d'entrée CSS (imports)
│
├── js/                 # JavaScript modulaire
│   ├── config/         # Configuration
│   │   └── constants.js     # Constantes et configuration
│   │
│   ├── modules/        # Modules fonctionnels
│   │   ├── animations.js    # Animations GSAP
│   │   ├── github-api.js    # API GitHub
│   │   ├── pagination.js    # Pagination des projets
│   │   ├── modal-cv.js      # Gestion modale CV
│   │   └── pdf-export.js    # Export PDF du CV
│   │
│   └── main.js         # Point d'entrée JS
│
├── index.html          # Page principale
└── README.md          # Documentation
```

## 🚀 Fonctionnalités

### 🎭 Animations
- Animations GSAP fluides et performantes
- Scroll smooth personnalisé
- Effets de révélation au scroll
- Transitions entre les pages de projets

### 💼 Projets GitHub
- Récupération automatique via l'API GitHub
- Fallback en cas d'échec de l'API
- Pagination intelligente (4 projets par page)
- Couleurs et icônes par langage

### 📄 CV Interactif
- Modale élégante et responsive
- Export PDF optimisé (1 page A4)
- Même rendu sur mobile/desktop
- Layout forcé en mode desktop pour l'export

### 📱 Responsive Design
- Mobile-first
- Breakpoints : 480px, 768px, 1024px
- Navigation adaptative
- Grilles fluides

## 🛠️ Technologies

- **HTML5** - Structure sémantique
- **CSS3** - Styles modulaires avec variables CSS
- **JavaScript ES6+** - Modules natifs
- **GSAP 3** - Animations
- **GitHub API** - Récupération des projets
- **html2pdf.js** - Export PDF

## 📦 Installation

1. Cloner le projet
```bash
git clone https://github.com/LetermeFlorent/Portfolio.git
cd Portfolio
```

2. Ouvrir avec un serveur local (nécessaire pour les modules ES6)
```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js (http-server)
npx http-server

# Avec PHP
php -S localhost:8000
```

3. Ouvrir dans le navigateur
```
http://localhost:8000
```

## 🎨 Personnalisation

### Variables CSS
Modifier les couleurs et espacements dans `css/base/variables.css`

```css
:root {
    --bg-color: #f8f8f8;
    --accent: #2563eb;
    --spacing-md: 40px;
    /* ... */
}
```

### Projets de secours
Modifier les projets fallback dans `js/config/constants.js`

```javascript
export const fallbackProjects = {
    'VotreUsername': [
        { name: 'Projet', url: '...', description: '...', language: 'PHP' }
    ]
};
```

## 📝 Modules JavaScript

### animations.js
Gère toutes les animations GSAP (hero, navbar, footer)

### github-api.js
Récupération et affichage des projets GitHub

### pagination.js
Système de pagination réutilisable avec animations

### modal-cv.js
Ouverture/fermeture de la modale avec GSAP

### pdf-export.js
Export PDF optimisé du CV

## 🌐 Navigateurs supportés

- Chrome/Edge (dernières versions)
- Firefox (dernières versions)
- Safari 14+
- Mobile iOS/Android

## 📄 Licence

© 2025 Florent Leterme - Tous droits réservés

## 📧 Contact

- **Email** : letermeflorent@gmail.com
- **GitHub** : [@LetermeFlorent](https://github.com/LetermeFlorent)
- **LinkedIn** : [Votre profil](https://www.linkedin.com)
