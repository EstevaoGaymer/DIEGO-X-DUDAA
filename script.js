document.addEventListener('DOMContentLoaded', () => {

    /* =======================================================
       1. TYPEWRITER E ENTRADA TRIUNFAL
       ======================================================= */
    const typeText = document.getElementById('typewriter-text');
    const enterBtn = document.getElementById('enter-btn');
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    const heroSection = document.getElementById('hero');
    const bgAudio = document.getElementById('bg-audio');
    const musicPlayer = document.getElementById('music-player');

    const phrases = [
        "No meio de tanta gente...",
        "O destino escolheu cruzar perfeitamente os nossos caminhos.",
        "E desde então, a minha vida ganhou todas as cores.",
        "Duda..."
    ];

    let currentPhrase = 0;
    let currentChar = 0;
    let isDeleting = false;

    function typeWriterEffect() {
        const text = phrases[currentPhrase];
        
        if (isDeleting) {
            typeText.innerHTML = text.substring(0, currentChar - 1);
            currentChar--;
        } else {
            typeText.innerHTML = text.substring(0, currentChar + 1);
            currentChar++;
        }

        let speed = isDeleting ? 40 : 80;

        if (!isDeleting && currentChar === text.length) {
            if (currentPhrase === phrases.length - 1) {
                setTimeout(() => {
                    enterBtn.classList.remove('hidden');
                }, 500);
                return; 
            }
            speed = 1500;
            isDeleting = true;
        } else if (isDeleting && currentChar === 0) {
            isDeleting = false;
            currentPhrase++;
            speed = 500;
        }

        setTimeout(typeWriterEffect, speed);
    }

    setTimeout(typeWriterEffect, 1000);

    // Entrada Triunfal - A Mágica Acontece Aqui
    enterBtn.addEventListener('click', () => {
        bgAudio.volume = 0.6;
        bgAudio.play().catch(e => console.log("Áudio bloqueado pelo navegador", e));
        musicPlayer.classList.add('playing');
        musicPlayer.classList.remove('paused');

        preloader.style.opacity = '0';
        
        setTimeout(() => {
            preloader.style.display = 'none';
            mainContent.classList.remove('hidden');
            heroSection.classList.add('triumphant-entry'); // Mantido e Intacto!
            startHeartParticles();
        }, 2000); 
    });

    /* =======================================================
       2. CONTROLE DE ÁUDIO
       ======================================================= */
    musicPlayer.addEventListener('click', () => {
        if (bgAudio.paused) {
            bgAudio.play();
            musicPlayer.classList.add('playing');
            musicPlayer.classList.remove('paused');
        } else {
            bgAudio.pause();
            musicPlayer.classList.remove('playing');
            musicPlayer.classList.add('paused');
        }
    });

    /* =======================================================
       3. CONTADOR DE TEMPO (Desde 18/10/2024)
       ======================================================= */
    const startDate = new Date(2024, 9, 18, 0, 0, 0).getTime();
    
    const countDays = document.getElementById('count-days');
    const countHours = document.getElementById('count-hours');
    const countMins = document.getElementById('count-minutes');
    const countSecs = document.getElementById('count-seconds');

    function updateCounter() {
        const now = new Date().getTime();
        const diff = now - startDate;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        countDays.innerText = days < 100 ? (days < 10 ? '00' + days : '0' + days) : days;
        countHours.innerText = hours < 10 ? '0' + hours : hours;
        countMins.innerText = minutes < 10 ? '0' + minutes : minutes;
        countSecs.innerText = seconds < 10 ? '0' + seconds : seconds;
    }

    updateCounter();
    setInterval(updateCounter, 1000);

    /* =======================================================
       4. SCROLL REVEAL (OTIMIZADO)
       ======================================================= */
    const revealElements = document.querySelectorAll('.reveal-section');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(el => revealObserver.observe(el));

    /* =======================================================
       5. SISTEMA DE CORAÇÕES FLUTUANTES (LIMPO DA MEMÓRIA)
       ======================================================= */
    const particlesContainer = document.getElementById('particles-container');

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        
        const symbols = ['❤', '🤍', '✨'];
        heart.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 15 + 10) + 'px';
        
        const duration = Math.random() * 7 + 8;
        heart.style.animationDuration = duration + 's';
        
        particlesContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove(); // Limpeza crucial de memória
        }, duration * 1000);
    }

    function startHeartParticles() {
        for(let i=0; i<15; i++) {
            setTimeout(createHeart, Math.random() * 2000);
        }
        setInterval(createHeart, 600);
    }

    /* =======================================================
       6. EFEITO 3D NAS FOTOS (PERFORMANCE DE GPU)
       ======================================================= */
    const tiltCards = document.querySelectorAll('.tilt-effect');

    tiltCards.forEach(card => {
        let ticking = false; // Controle de frame rate para fluidez absurda

        card.addEventListener('mousemove', e => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = ((y - centerY) / centerY) * -10; 
                    const rotateY = ((x - centerX) / centerX) * 10;
                    
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02) translateZ(0)`;
                    ticking = false;
                });
                ticking = true;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1) translateZ(0)';
            card.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none'; 
        });
    });
});