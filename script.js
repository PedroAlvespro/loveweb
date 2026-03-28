// Configurações
const startDate = new Date('2024-07-14T00:00:00'); // Data de início do namoro: 14/07/2024
const youtubeVideoId = 'X919l0h3y5g'; // Marcelo Jeneci - Pra Sonhar (Exemplo de ID - Altere se o vídeo falhar)

// Elementos da UI
const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const mainScreen = document.getElementById('main-screen');

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

// Lógica de Transição de Tela e Início da Música
let player;

// Função chamada pela API do YouTube quando pronta
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: 'sF2YQdF4yP4', // ID alternativo para 'Pra Sonhar'
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'loop': 1,
            'playlist': 'sF2YQdF4yP4' // Necessário para o loop funcionar
        },
        events: {
            'onReady': onPlayerReady
        }
    });

    // Fallback: se o ID não for reconhecido, pelo menos o código não quebra.
    // Você pode procurar "Marcelo Jeneci Pra Sonhar" no YouTube,
    // clicar em compartilhar e pegar o ID (as letrinhas depois da barra).
    // Exemplos: sF2YQdF4yP4, jc2P01Z9e0M
}

function onPlayerReady(event) {
    // Player está pronto para ser iniciado
}

startBtn.addEventListener('click', () => {
    // Ocultar tela inicial
    startScreen.classList.add('hidden');
    
    // Mostrar tela principal e fade in
    setTimeout(() => {
        startScreen.style.display = 'none';
        mainScreen.classList.remove('hidden');
        
        // Iniciar música
        if (player && typeof player.playVideo === 'function') {
            player.playVideo();
        }
        
        // Iniciar criar corações
        startHearts();
    }, 1000);
});

// Lógica do Contador de Tempo
function updateCounter() {
    const now = new Date();
    const difference = now - startDate;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
}

setInterval(updateCounter, 1000);
updateCounter();

// Lógica do Carrossel
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
let currentSlide = 0;
let slideInterval;

function initCarousel() {
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    startSlideTimer();
}

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
    resetSlideTimer();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
    resetSlideTimer();
}

function startSlideTimer() {
    slideInterval = setInterval(nextSlide, 4000); // Muda a cada 4 segundos
}

function resetSlideTimer() {
    clearInterval(slideInterval);
    startSlideTimer();
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
        resetSlideTimer();
    });
});

initCarousel();

// Lógica dos Corações Flutuantes (Animação de Fundo)
function startHearts() {
    const container = document.getElementById('hearts-container');
    const heartSymbols = ['❤️', '💖', '💕', '💓', '💗'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        
        // Escolhe símbolo aleatório
        heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        
        // Posição aleatória na horizontal
        heart.style.left = Math.random() * 100 + 'vw';
        
        // Tamanho aleatório
        const size = Math.random() * 20 + 10;
        heart.style.fontSize = size + 'px';
        
        // Duração aleatória
        const duration = Math.random() * 5 + 8;
        heart.style.animationDuration = duration + 's';
        
        container.appendChild(heart);
        
        // Remove depois que a animação terminar (+- duracao)
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
        
    }, 600); // Cria um novo coração a cada 600ms
}
