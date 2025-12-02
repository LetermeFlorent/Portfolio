<div align="center">

  <!-- TITRE ANIMÉ -->
  <a href="https://letermeflorent.github.io/Portfolio/">
    <img src="https://readme-typing-svg.herokuapp.com?font=Orbitron&weight=600&size=35&pause=1000&color=A855F7&center=true&vCenter=true&width=700&lines=PORTFOLIO+IMMERSIF;FLORENT+LETERME;WEB+%26+LOGICIEL;EXPERIENCE+THREE.JS" alt="Typing SVG" />
  </a>

  <br />

  <!-- BADGES DU PROJET -->
  <img src="https://img.shields.io/badge/VERSION-1.0.0-3b82f6?style=for-the-badge&logo=github" alt="Version" />
  <img src="https://img.shields.io/badge/TECH-THREE.JS-white?style=for-the-badge&logo=three.js&logoColor=black" alt="Three.js" />
  <img src="https://img.shields.io/badge/DESIGN-GLASSMORPHISM-a855f7?style=for-the-badge&logo=framer&logoColor=white" alt="Design" />

  <br /> <br />

  > **Une exploration interactive entre rigueur académique et expérimentation créative.**
  > <br> *Ce projet met en scène un univers 3D réactif, une interface Cyber-Glass et une identité double.*

  <br />

  <!-- BOUTON D'ACCÈS -->
  <a href="https://letermeflorent.github.io/Portfolio/">
    <img src="https://img.shields.io/badge/LANCER_L'EXPERIENCE_ONLINE-success?style=for-the-badge&logo=google-chrome&logoColor=white" />
  </a>

</div>

---

## ✨ Fonctionnalités & Immersion

<table>
  <tr>
    <td width="50%">
      <h3>🌌 Expérience 3D (Three.js)</h3>
      <ul>
        <li><b>Système Solaire Interactif :</b> Des nœuds (soleils) qui explosent en particules au clic.</li>
        <li><b>Gyroscope Cybernétique :</b> Une structure centrale composée de 4 anneaux aux comportements uniques (Scanner, Low-Poly, Particules).</li>
        <li><b>Effets Réactifs :</b> Flashs lumineux et vibrations ("Glitch") lors des interactions.</li>
        <li><b>Atmosphère :</b> Étoiles filantes procédurales traversant l'espace lointain.</li>
      </ul>
    </td>
    <td width="50%">
      <h3>🎨 UI & Design (Cyber-Glass)</h3>
      <ul>
        <li><b>Interface Glassmorphism :</b> Cartes translucides avec effets de profondeur, volume et réfraction de lumière.</li>
        <li><b>Hacker Text Effect :</b> Animation de décryptage dynamique sur le nom (Florent Leterme ↔ Dreyka Oas).</li>
        <li><b>Double Thème :</b>
          <ul>
            <li>🔵 <b>Academic :</b> Style "System Log" structuré.</li>
            <li>🟣 <b>Creative :</b> Style "Prototype Néon".</li>
          </ul>
        </li>
      </ul>
    </td>
  </tr>
</table>

### 🔊 Soundscape Audio
L'expérience est enrichie par un moteur audio gérant l'autoplay des navigateurs :
*   **Ambiance :** Nappe sonore spatiale en boucle.
*   **SFX 3D :** Sons d'explosion synchronisés avec l'onde de choc visuelle.
*   **Feedback UI :** Son "Flyby" lors du défilement rapide.

---

## 🛠️ Stack Technique

<div align="center">
  <img src="https://skillicons.dev/icons?i=html,css,js,threejs,git,vscode" />
  <br>
  <i>Propulsé par <b>Three.js</b> (WebGL) et <b>GSAP</b> (Animations).</i>
</div>

---

## 📂 Structure du Code

```bash
/
├── index.html              # Sémantique, Contenu & Structure DOM
├── style.css               # Design Responsive, Effets Glass & Néon
├── cv.pdf                  # Document téléchargeable
│
├── audios/                 # Assets sonores (MP3)
│   ├── ambience.mp3        # Background loop
│   ├── explosion.mp3       # Impact FX
│   └── flyby.mp3           # Scroll FX
│
└── scripts/
    ├── audio-manager.js    # Gestionnaire AudioContext (Mute/Unmute logic)
    ├── scene-3d.js         # Moteur Three.js (Rendu, Physique, Particules)
    └── main-ui.js          # Logique Interface, GSAP & Hacker Effect
