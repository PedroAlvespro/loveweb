// Configurações
const startDate = new Date('2024-07-14T00:00:00'); // Data de início do namoro: 14/07/2024

// Elementos da UI
const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const mainScreen = document.getElementById('main-screen');

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

// Pegando a referência para o player de áudio
const musicaDiv = document.getElementById('meu-audio');

startBtn.addEventListener('click', () => {
    // Ocultar tela inicial
    startScreen.classList.add('hidden');
    
    // Mostrar tela principal e fade in
    setTimeout(() => {
        startScreen.style.display = 'none';
        mainScreen.classList.remove('hidden');
        
        // Iniciar música
        if (musicaDiv) {
            musicaDiv.play();
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
