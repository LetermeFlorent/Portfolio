/* ==========================================================================
   SCÈNE 3D (THREE.JS) - SYSTEME SOLAIRE, STRUCTURE CYBER & VRAIES ETOILES FILANTES
   ========================================================================== */

(function() {
    // --- 1. CONFIGURATION DE BASE ---
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();
    
    // Brouillard noir pour fondre le lointain
    scene.fog = new THREE.FogExp2(0x000000, 0.001); 
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    // --- GESTION CAMERA RESPONSIVE ---
    // Sur mobile (portrait), on recule la caméra pour voir les anneaux en entier
    // sinon ils sont coupés par la largeur de l'écran.
    function updateCameraPosition() {
        const isMobile = window.innerWidth < 768;
        // PC : z=10 | Mobile : z=18 (plus de recul)
        return isMobile ? 18 : 10;
    }
    
    // Initialisation position
    camera.position.z = updateCameraPosition();

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const spaceGroup = new THREE.Group();
    scene.add(spaceGroup);
    
    // Ajustement de l'échelle sur mobile pour que ça soit "imposant"
    if (window.innerWidth < 768) {
        spaceGroup.scale.set(1.2, 1.2, 1.2);
    }

    // --- 2. FOND ETOILÉ (Fixe) ---
    const starsGeo = new THREE.BufferGeometry();
    const starsCnt = 1000; 
    const posArray = new Float32Array(starsCnt * 3);
    
    for(let i = 0; i < starsCnt * 3; i += 3) {
        // Etoiles réparties très loin autour
        posArray[i] = (Math.random() - 0.5) * 600;     
        posArray[i + 1] = (Math.random() - 0.5) * 600; 
        posArray[i + 2] = (Math.random() - 0.5) * 600 - 100; // Décalage vers le fond 
    }
    
    starsGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const starsMat = new THREE.PointsMaterial({ 
        color: 0xffffff, size: 0.2, transparent: true, opacity: 0.8, 
        blending: THREE.AdditiveBlending, sizeAttenuation: true 
    });
    const starMesh = new THREE.Points(starsGeo, starsMat);
    scene.add(starMesh);

    // --- 3. STRUCTURE CENTRALE (GYROSCOPE 4 ANNEAUX) ---
    // Ring 1
    const r1Geo = new THREE.TorusGeometry(12, 0.1, 16, 100); 
    const r1Mat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true, transparent: true, opacity: 0.2 });
    const ring1 = new THREE.Mesh(r1Geo, r1Mat);
    spaceGroup.add(ring1);

    // Ring 2
    const r2Geo = new THREE.TorusGeometry(9, 0.3, 16, 100);
    const r2Mat = new THREE.PointsMaterial({ color: 0x3b82f6, size: 0.05, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending });
    const ring2 = new THREE.Points(r2Geo, r2Mat);
    ring2.rotation.x = Math.PI / 1.5;
    spaceGroup.add(ring2);

    // Ring 3 (Scanner)
    const r3Geo = new THREE.RingGeometry(15.5, 15.6, 64);
    const r3Mat = new THREE.MeshBasicMaterial({ color: 0x60a5fa, side: THREE.DoubleSide, transparent: true, opacity: 0.3 });
    const ring3 = new THREE.Mesh(r3Geo, r3Mat);
    spaceGroup.add(ring3);

    // Ring 5 (Cage Violette)
    const r5Geo = new THREE.TorusGeometry(18, 0.1, 3, 6); 
    const r5Mat = new THREE.MeshBasicMaterial({ color: 0xa855f7, wireframe: true, transparent: true, opacity: 0.2 });
    const ring5 = new THREE.Mesh(r5Geo, r5Mat);
    spaceGroup.add(ring5);

    const allRings = [ring1, ring2, ring3, ring5];

    // --- 4. GESTION DES SOLEILS ---
    const suns = []; 
    const sunData = new Map(); 
    let explosionCounter = 0;
    let secondSunSpawned = false;

    function createSunTexture() {
        const c = document.createElement('canvas'); c.width = 64; c.height = 64;
        const ctx = c.getContext('2d');
        const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        g.addColorStop(0, 'rgba(255,255,255,1)'); 
        g.addColorStop(0.3, 'rgba(200,220,255,0.5)'); 
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g; ctx.fillRect(0,0,64,64);
        return new THREE.CanvasTexture(c);
    }

    function spawnSun(x, y, z, isMain) {
        const sunMat = new THREE.SpriteMaterial({ 
            map: createSunTexture(), color: 0xffffff, 
            blending: THREE.AdditiveBlending, depthWrite: false, transparent: true 
        });
        const sun = new THREE.Sprite(sunMat); 
        sun.scale.set(0.1, 0.1, 1); 
        sun.position.set(x, y, z);
        scene.add(sun);
        suns.push(sun);

        const sunLight = new THREE.PointLight(0xffffff, 0.1, 200); 
        sunLight.position.set(x, y, z + 10);
        scene.add(sunLight);

        const shockSphereGeo = new THREE.SphereGeometry(1, 32, 32);
        const shockSphereMat = new THREE.MeshBasicMaterial({ 
            color: 0xffffff, transparent: true, opacity: 0, 
            blending: THREE.AdditiveBlending, side: THREE.BackSide, depthWrite: false 
        });
        const shockSphere = new THREE.Mesh(shockSphereGeo, shockSphereMat);
        shockSphere.position.copy(sun.position);
        scene.add(shockSphere);

        const instability = {
            lightIntensity: 2, baseScale: 80, pulseSpeed: 0.5 + Math.random() * 1.5, 
            flickerSpeed: 2 + Math.random() * 3, colorShiftSpeed: 0.3 + Math.random() * 0.7, 
            timeOffset: Math.random() * Math.PI * 2
        };

        sunData.set(sun.uuid, {
            light: sunLight, shock: shockSphere, isExploding: false, isMain: isMain, 
            basePos: new THREE.Vector3(x, y, z), instability: instability, 
            material: sunMat, explosionSoundPlayed: false
        });

        gsap.to(sun.scale, { x: 80, y: 80, duration: 8, ease: "power2.out" });
        gsap.to(sunLight, { intensity: 2, duration: 8, ease: "power2.out" });
    }

    spawnSun(50, 20, -60, true);

    // --- 5. INTERACTIVITÉ ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function isEventOnInteractiveElement(event) {
        let target = event.target;
        if(event.changedTouches && event.changedTouches.length > 0) {
            target = document.elementFromPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
        }
        while (target && target !== document.body) {
            if (target.classList && (
                target.classList.contains('glass-card') || 
                target.classList.contains('btn-cv') || 
                target.classList.contains('tech-icon')
            )) { return true; }
            target = target.parentElement;
        }
        return false;
    }

    const updateMouse = (x, y) => {
        mouse.x = (x / window.innerWidth) * 2 - 1;
        mouse.y = - (y / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', (event) => {
        if (document.getElementById('cv-modal').style.display === 'flex') return;
        updateMouse(event.clientX, event.clientY);
        raycaster.setFromCamera(mouse, camera);
        const isHoveringCard = isEventOnInteractiveElement(event);
        const intersects = raycaster.intersectObjects(suns);
        if (intersects.length > 0 && !isHoveringCard) { document.body.style.cursor = 'pointer'; } else { document.body.style.cursor = 'default'; }
    });

    const handleInteraction = (event) => {
        if (document.getElementById('cv-modal').style.display === 'flex') return;
        if (isEventOnInteractiveElement(event)) return;
        let clientX, clientY;
        if (event.type === 'touchstart' || event.type === 'touchend') {
             clientX = event.changedTouches[0].clientX;
             clientY = event.changedTouches[0].clientY;
        } else {
             clientX = event.clientX;
             clientY = event.clientY;
        }
        updateMouse(clientX, clientY);
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(suns);

        if (intersects.length > 0) {
            const hitSun = intersects[0].object;
            const data = sunData.get(hitSun.uuid);

            if (data && !data.isExploding) {
                data.isExploding = true;
                explosionCounter++;
                const shakeTl = gsap.timeline();
                shakeTl.to(hitSun.scale, { x: 5, y: 5, duration: 1.5, ease: "power2.in" });
                shakeTl.to(hitSun.material.color, { r: 1, g: 0, b: 0, duration: 1.5 }, 0); 

                setTimeout(() => {
                    hitSun.scale.set(0,0,0);
                    hitSun.material.color.setHex(0xffffff); 
                    data.shock.material.opacity = 0.8;
                    data.shock.scale.set(1,1,1);
                    
                    gsap.to(data.shock.scale, { 
                        x: 200, y: 200, z: 200, duration: 2, ease: "power2.out", 
                        onUpdate: function() { 
                            const currentScale = data.shock.scale.x; 
                            if (currentScale > 90 && currentScale < 110 && !data.explosionSoundPlayed) { 
                                if (window.soundManager && window.soundManager.enabled && !window.soundManager.muted) { 
                                    window.soundManager.playExplosion(); 
                                    data.explosionSoundPlayed = true; 
                                } 
                            } 
                        } 
                    });
                    
                    gsap.to(data.shock.material, { opacity: 0, duration: 2, ease: "power2.out" });

                    allRings.forEach(ring => {
                        const originalColor = ring.material.color.getHex();
                        gsap.to(ring.material.color, { r: 1, g: 1, b: 1, duration: 0.1, yoyo: true, repeat: 3, onComplete: () => ring.material.color.setHex(originalColor) });
                        gsap.to(ring.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 0.08, yoyo: true, repeat: 5, ease: "power1.inOut" });
                        gsap.to(ring.rotation, { x: "+=" + (Math.random() * 0.4 - 0.2), y: "+=" + (Math.random() * 0.4 - 0.2), duration: 0.05, yoyo: true, repeat: 10 });
                    });

                    gsap.to(camera.position, { x: "+=0.8", y: "+=0.8", duration: 0.05, yoyo: true, repeat: 10, onComplete: () => { camera.position.x = 0; camera.position.y = 0; } });
                    const cards = document.querySelectorAll('.glass-card, .xp-item');
                    cards.forEach(card => {
                        gsap.to(card, { x: (Math.random()-0.5)*50, y: (Math.random()-0.5)*50, duration: 0.05, yoyo: true, repeat: 5, onComplete: () => { gsap.to(card, { x: 0, y: 0, duration: 0.2 }); } });
                    });

                    if (data.isMain && explosionCounter === 3 && !secondSunSpawned) { setTimeout(() => { spawnSun(-50, 30, -70, false); secondSunSpawned = true; }, 1000); }
                    setTimeout(() => { gsap.to(hitSun.scale, { x: 80, y: 80, duration: 6, ease: "elastic.out(1, 0.3)" }); data.isExploding = false; data.explosionSoundPlayed = false; }, 2500);
                }, 1500);
            }
        }
    };
    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction, {passive: true});

    // --- 6. LOGIQUE ETOILES FILANTES ---
    const clock = new THREE.Clock();
    const shootingStars = [];
    let lastShootingStarTime = 0;
    let nextShootingStarDelay = Math.random() * 1500 + 500; 

    function createShootingStar() {
        const startX = (Math.random() - 0.5) * 600;
        const startY = (Math.random() - 0.5) * 400;
        const startZ = -200 - Math.random() * 200; 
        
        const dirX = (Math.random() - 0.5);
        const dirY = (Math.random() - 0.5); 
        const dirZ = (Math.random() - 0.2); 
        const direction = new THREE.Vector3(dirX, dirY, dirZ).normalize();

        const starLen = 40; 
        const geometry = new THREE.BufferGeometry();
        
        const vertices = new Float32Array([
            0, 0, 0, 
            direction.x * starLen, direction.y * starLen, direction.z * starLen 
        ]);
        
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

        const material = new THREE.LineBasicMaterial({
            color: new THREE.Color().setHSL(0.6, 0.8, 0.8), 
            transparent: true,
            opacity: 0, 
            blending: THREE.AdditiveBlending
        });

        const star = new THREE.Line(geometry, material);
        star.position.set(startX, startY, startZ);
        scene.add(star);

        const speed = 100 + Math.random() * 100; 
        const duration = 2 + Math.random(); 

        gsap.to(material, { opacity: 0.8, duration: 0.3 });

        gsap.to(star.position, {
            x: startX + direction.x * speed * duration,
            y: startY + direction.y * speed * duration,
            z: startZ + direction.z * speed * duration,
            duration: duration,
            ease: "none",
            onComplete: () => {
                scene.remove(star);
                const idx = shootingStars.indexOf(star);
                if(idx > -1) shootingStars.splice(idx, 1);
            }
        });

        gsap.to(material, { opacity: 0, duration: 0.5, delay: duration - 0.5 });
        
        shootingStars.push(star);
    }

    // --- 7. BOUCLE D'ANIMATION ---
    function animate() {
        const t = clock.getElapsedTime();
        
        // Rotation Anneaux
        ring1.rotation.z = t * 0.05; 
        ring1.rotation.x = Math.sin(t * 0.1) * 0.2;
        ring2.rotation.y = t * 0.08; 
        ring2.rotation.z = -t * 0.02;
        ring3.rotation.z = -t * 0.2; 
        ring3.rotation.x = Math.sin(t * 0.2) * 0.1;
        ring5.rotation.z = t * 0.03;
        ring5.rotation.y = t * 0.03;

        // Rotation Ciel
        starMesh.rotation.y = t * 0.005;

        // Génération Etoiles Filantes
        const currentTime = performance.now();
        if (currentTime - lastShootingStarTime > nextShootingStarDelay) { 
            createShootingStar(); 
            lastShootingStarTime = currentTime;
            nextShootingStarDelay = Math.random() * 1500 + 500; 
        }

        // Animation Soleils
        suns.forEach(sun => {
            const data = sunData.get(sun.uuid);
            if (data && !data.isExploding) {
                const instab = data.instability;
                const time = t + instab.timeOffset;
                const scaleVariation = Math.sin(time * instab.pulseSpeed) * 3;
                sun.scale.x = instab.baseScale + scaleVariation;
                sun.scale.y = instab.baseScale + scaleVariation;
                const flicker = 0.7 + 0.3 * Math.sin(time * instab.flickerSpeed);
                data.light.intensity = instab.lightIntensity * flicker;
                const colorShift = 0.9 + 0.1 * Math.sin(time * instab.colorShiftSpeed);
                data.material.color.setRGB(colorShift, colorShift, 1);
            }
        });

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', () => { 
        camera.aspect = window.innerWidth / window.innerHeight; 
        camera.updateProjectionMatrix(); 
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        // Mise à jour de la position caméra Responsive
        // On remet la caméra à jour si on passe du mode portrait au mode paysage
        camera.position.z = updateCameraPosition();
        
        // Mise à jour de l'échelle des objets
        if (window.innerWidth < 768) {
            spaceGroup.scale.set(1.2, 1.2, 1.2);
        } else {
            spaceGroup.scale.set(1, 1, 1);
        }
    });

    window.spaceGroup = spaceGroup;
    window.camera3D = camera;
    window.ring1 = ring1;

})();