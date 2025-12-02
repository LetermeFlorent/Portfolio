/* ==========================================================================
   GESTIONNAIRE AUDIO
   Gère l'AudioContext, le chargement des buffers et la lecture des sons.
   ========================================================================== */

// MODIFICATION ICI : On attache directement à window pour que main-ui.js puisse le voir
window.soundManager = {
    enabled: false,
    context: null,
    sounds: {},
    muted: true, // Muet par défaut
    buffers: {},
    
    // Initialisation du contexte Audio
    init: function() {
        if (this.context) return true;
        
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.context = new AudioContext();
            this.loadAudioFiles();
            console.log("🔊 Système audio initialisé (Context created)");
            return true;
        } catch (e) {
            console.warn("❌ Audio API non supportée:", e);
            return false;
        }
    },
    
    // Chargement asynchrone des fichiers MP3
    loadAudioFiles: function() {
        const audioFiles = {
            ambience: 'audios/ambience.mp3',
            explosion: 'audios/explosion.mp3',
            flyby: 'audios/flyby.mp3'
        };

        const loadAudio = (name, url) => {
            return fetch(url)
                .then(response => {
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                    return response.arrayBuffer();
                })
                .then(arrayBuffer => this.context.decodeAudioData(arrayBuffer))
                .then(audioBuffer => {
                    this.buffers[name] = audioBuffer;
                    console.log(`✅ Audio chargé: ${name}`);
                })
                .catch(error => console.warn(`⚠️ Erreur chargement audio ${name} (Vérifiez le dossier 'audios'):`, error));
        };

        Promise.all([
            loadAudio('ambience', audioFiles.ambience),
            loadAudio('explosion', audioFiles.explosion),
            loadAudio('flyby', audioFiles.flyby)
        ]);
    },
    
    // Lecture d'un son spécifique
    playSound: function(name, loop = false, volume = 1.0) {
        if (!this.enabled || this.muted || !this.buffers[name]) return null;
        
        try {
            const source = this.context.createBufferSource();
            const gainNode = this.context.createGain();
            
            source.buffer = this.buffers[name];
            source.loop = loop;
            gainNode.gain.value = volume;
            
            source.connect(gainNode);
            gainNode.connect(this.context.destination);
            
            source.start(0);
            return { source, gainNode };
        } catch (e) {
            console.error("Erreur lecture audio:", e);
            return null;
        }
    },
    
    // Méthodes spécifiques
    playAmbience: function() {
        if (this.sounds.ambience) {
            try { this.sounds.ambience.source.stop(); } catch(e){}
        }
        this.sounds.ambience = this.playSound('ambience', true, 0.3);
    },
    
    playExplosion: function() {
        this.playSound('explosion', false, 0.7);
    },
    
    playFlyby: function() {
        this.playSound('flyby', false, 0.5);
    },
    
    // Activation du son (nécessite interaction utilisateur)
    enable: function() {
        if (!this.context) {
            if (!this.init()) return false;
        }
        
        // Reprendre le contexte s'il est suspendu
        if (this.context.state === 'suspended') {
            this.context.resume();
        }
        
        this.enabled = true;
        this.muted = false;
        
        // Démarrer l'ambiance si chargée
        if (this.buffers.ambience) {
            this.playAmbience();
        } else {
            // Réessayer plus tard si le chargement est en cours
            setTimeout(() => {
                if (this.buffers.ambience && this.enabled && !this.muted) {
                    this.playAmbience();
                }
            }, 1000);
        }
        return true;
    },
    
    // Basculer Mute/Unmute
    toggleMute: function() {
        console.log("🖱️ Clic détecté sur le bouton audio"); // Debug log

        // Premier clic active le moteur audio
        if (!this.enabled || !this.context) {
            const success = this.enable();
            return !success; // Si activé (true), on renvoie false pour dire "pas muet"
        }
        
        this.muted = !this.muted;
        
        if (this.muted) {
            if (this.sounds.ambience) {
                try { this.sounds.ambience.source.stop(); } catch(e){}
                this.sounds.ambience = null;
            }
        } else {
            if (this.buffers.ambience) {
                this.playAmbience();
            }
        }
        return this.muted;
    }
};