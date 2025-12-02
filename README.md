# 🌐 Portfolio Immersif - Florent Leterme (Dreyka Oas)

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Tech](https://img.shields.io/badge/Three.js-3D-black)
![Style](https://img.shields.io/badge/Style-Liquid%20Glass-cyan)

> **Un portfolio interactif explorant la frontière entre la rigueur académique et l'expérimentation créative.**

Ce projet est une application web immersive mettant en scène un univers 3D réactif, une interface utilisateur en "Liquid Glass" et une identité double (Développeur Web / Expérimentateur).

---

## ✨ Fonctionnalités Clés

### 🌌 Expérience 3D (Three.js)
*   **Système Solaire Interactif :** Des nœuds (soleils) qui explosent en particules au clic avec des effets sonores 3D.
*   **Structure Centrale (Gyroscope) :** 4 anneaux animés avec des géométries et comportements uniques (Scanner, Particules, Cage Hexagonale).
*   **Effet de Tremblement (Glitch) :** La structure réagit aux explosions par des flashs lumineux et des vibrations.
*   **Étoiles Filantes :** Génération procédurale de météores traversant l'espace lointain.
*   **Parallaxe :** La scène suit subtilement les mouvements de la souris.

### 🎨 Interface & Design (UI/UX)
*   **Liquid Glassmorphism :** Des cartes avec effets de réfraction, volume et lumière pour imiter des gouttes d'eau épaisses.
*   **Hacker Text Effect :** Animation de décryptage sur le nom (Florent Leterme ↔ Dreyka Oas).
*   **Thèmes Distincts :**
    *   *Academic* (Bleu) : Dashboard structuré pour le parcours pro.
    *   *Creative* (Violet/Néon) : Style prototype pour les projets personnels.

### 🔊 Immersion Sonore
*   **Soundscape :** Ambiance spatiale en fond.
*   **SFX Réactifs :** Sons d'explosion au clic et effet "Flyby" lors du scroll rapide.
*   **Gestionnaire Audio :** Bouton Mute/Unmute avec gestion de l'autoplay des navigateurs.

---

## 🛠️ Stack Technique

*   **Langages :** HTML5, CSS3, JavaScript (ES6+).
*   **Librairies :**
    *   [Three.js](https://threejs.org/) (Rendu 3D WebGL).
    *   [GSAP](https://greensock.com/gsap/) (Animations, ScrollTrigger, Timeline).
    *   [Devicon](https://devicon.dev/) (Icônes de technologies).

---

## 📂 Structure du Projet

```bash
/
├── index.html              # Structure sémantique et contenu
├── style.css               # Styles, Responsive & Liquid Glass effects
├── cv.pdf                  # Fichier PDF du CV (à ajouter)
│
├── audios/                 # Assets sonores
│   ├── ambience.mp3
│   ├── explosion.mp3
│   └── flyby.mp3
│
└── scripts/
    ├── audio-manager.js    # Gestion AudioContext & Buffers
    ├── scene-3d.js         # Logique Three.js (Univers, Physique, Particules)
    └── main-ui.js          # Logique UI, Modales, GSAP & Hacker Effect
