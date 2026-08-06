// Step navigation
function nextStep() {
    document.getElementById('step-1').classList.add('hidden');
    const step2 = document.getElementById('step-2');
    step2.classList.remove('hidden');
    
    // Slight delay to allow display:block to apply before animating opacity/transform
    setTimeout(() => {
        step2.style.opacity = '1';
        step2.style.transform = 'scale(1)';
    }, 10);
}

function sayYes() {
    document.getElementById('step-2').classList.add('hidden');
    const step3 = document.getElementById('step-3');
    step3.classList.remove('hidden');
    
    setTimeout(() => {
        step3.style.opacity = '1';
        step3.style.transform = 'scale(1)';
    }, 10);

    // Burst a lot of hearts
    for(let i=0; i<30; i++) {
        setTimeout(createHeart, i * 100);
    }
}

// Dodging "No" Button Logic
const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const buttonGroup = document.querySelector('.button-group');

// Position the No button initially next to Yes button
window.addEventListener('DOMContentLoaded', () => {
    // Initial positioning is handled by CSS flexbox, but we need to switch to absolute when hovered.
    // Set initial absolute position to match current flexbox position.
    noBtn.style.left = `calc(50% + 10px)`; 
    yesBtn.style.marginRight = '120px'; // Make room so it looks centered
});

function moveNoButton() {
    // Calculate boundaries so the button doesn't go off-screen
    const maxX = window.innerWidth - noBtn.clientWidth - 50;
    const maxY = window.innerHeight - noBtn.clientHeight - 50;
    
    // Generate random X and Y coordinates
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    // Apply new position
    noBtn.style.position = 'fixed'; // change to fixed so it can go anywhere on screen
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';

    // Increase the size of the Yes button slightly every time No is hovered
    const currentScale = parseFloat(yesBtn.style.transform.replace(/[^\d.]/g, '')) || 1;
    yesBtn.style.transform = `scale(${currentScale + 0.1})`;
    
    // Change Yes button text to encourage clicking
    const prompts = ["Please? 🥺", "Click me! 💖", "Just say yes! 🥰", "You know you want to! ✨"];
    yesBtn.innerText = prompts[Math.floor(Math.random() * prompts.length)];
}

// Trigger dodge on hover (desktop) and touch (mobile)
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent accidental clicking
    moveNoButton();
});

// Floating Hearts Background Animation
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerHTML = '💖';
    
    // Randomize position and animation duration
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 2 + 3 + 's';
    heart.style.fontSize = Math.random() * 20 + 15 + 'px';

    document.getElementById('hearts-container').appendChild(heart);

    // Remove heart after animation ends
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Continuously spawn hearts
setInterval(createHeart, 500);
