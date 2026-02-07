const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const tryAgainSection = document.getElementById('tryAgain');
const celebrationSection = document.getElementById('celebration');
const questionSection = document.querySelector('.question-section');
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');

let confettiPieces = [];

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Confetti particle class
class Confetti {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.size = Math.random() * 8 + 4;
        this.color = ['#ff1744', '#ff5252', '#ff6e40', '#fff', '#ffb3ba'][Math.floor(Math.random() * 5)];
        this.velocityX = (Math.random() - 0.5) * 8;
        this.velocityY = Math.random() * 4 + 5;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.2;
        this.opacity = 1;
    }

    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.rotation += this.rotationSpeed;
        this.velocityY += 0.1; // gravity
        this.opacity -= 0.003;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

// Create confetti
function createConfetti() {
    for (let i = 0; i < 200; i++) {
        confettiPieces.push(new Confetti());
    }
}

// Animate confetti
function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = confettiPieces.length - 1; i >= 0; i--) {
        confettiPieces[i].update();
        confettiPieces[i].draw();
        
        if (confettiPieces[i].opacity <= 0 || confettiPieces[i].y > canvas.height) {
            confettiPieces.splice(i, 1);
        }
    }

    if (confettiPieces.length > 0) {
        requestAnimationFrame(animateConfetti);
    }
}

// Add more confetti periodically during celebration
function continuousConfetti() {
    if (celebrationSection.classList.contains('hidden')) return;
    
    for (let i = 0; i < 75; i++) {
        confettiPieces.push(new Confetti());
    }
    animateConfetti();
    setTimeout(continuousConfetti, 300);
}

// No button handler
noBtn.addEventListener('click', () => {
    questionSection.classList.add('hidden');
    tryAgainSection.classList.remove('hidden');
    
    setTimeout(() => {
        questionSection.classList.remove('hidden');
        tryAgainSection.classList.add('hidden');
    }, 2000);
});

// Yes button handler
yesBtn.addEventListener('click', () => {
    const spinCatImg = document.getElementById('spinCat');
    const yesBtnText = document.getElementById('yesBtnText');
    
    yesBtnText.classList.add('hidden');
    spinCatImg.classList.remove('hidden');
    
    // Hide the entire button section during celebration
    document.querySelector('.button-container').classList.add('hidden');
    document.querySelector('.main-question').classList.add('hidden');
    
    celebrationSection.classList.remove('hidden');
    
    createConfetti();
    animateConfetti();
    continuousConfetti();
});
