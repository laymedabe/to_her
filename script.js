// Content Data
const content = {
    himToHer: {
        s1Title: "Stop waiting around na.",
        s1Text: "Like, I know you've been waiting for me to ask you out. It's actually kind of obvious how much you're making papansin to me. I'm literally just doing you a solid here. Don't make it hard na, just click the button below so we can get this over with. Stop pretending you're not excited.",
        s2Title: "Are we gonna make date or what?",
        s2Text: "Okay, let's cut the chase. I'm taking you out. Food. Vibes. Me. Don't even think about saying no, because honestly? It's so cringe when girls act so pabebe. Just agree na, you know you're super G to be seen with me.",
        s3Title: "You're literally so swerte.",
        s3Text: "See? I knew you were gonna say yes anyway. Like, who wouldn't want to go out with me? Anyway, I'll just pick you up. Go pick a cute outfit na, try to match my fly. Don't embarrass me.",
        prompts: ["Just give up na. 🙄", "You literally can't say no, duh.", "Stop being so pabebe.", "I'm the best you'll get tbh.", "Don't be so choosy miss."]
    },
    herToHim: {
        s1Title: "Omg, you're so slow.",
        s1Text: "Like, I've been giving you so many signs and you're still so clueless. Someone is literally making papansin to you right now. It's actually kind of embarrassing that I have to be the one to do this. Don't make it hard na, click the button before I change my mind.",
        s2Title: "Are we going out or what?",
        s2Text: "Okay, let's make this simple since guys are slow. You and me. Date. You're paying. Don't even think about saying no, because honestly? It's so cringe when guys pretend they're busy. Just agree na, you know you want to.",
        s3Title: "I know right? You're so swerte.",
        s3Text: "See? It's not that hard to stop being slow. I knew you were gonna say yes anyway. Like, you literally won the lottery today. Anyway, I'll message you where you're bringing me. Don't be late na, I hate waiting.",
        prompts: ["Just give up boy. 🙄", "You literally can't say no, duh.", "Stop making inarte.", "I'm out of your league tbh.", "Don't be so choosy."]
    }
};

let currentVersion = 'himToHer';

function startFlow(version) {
    currentVersion = version;
    
    // Apply theme distinction
    document.body.className = ''; // clear any existing classes
    document.body.classList.add(version === 'himToHer' ? 'theme-himToHer' : 'theme-herToHim');

    // Inject text
    const data = content[version];
    document.getElementById('s1-title').innerText = data.s1Title;
    document.getElementById('s1-text').innerText = data.s1Text;
    document.getElementById('s2-title').innerText = data.s2Title;
    document.getElementById('s2-text').innerText = data.s2Text;
    document.getElementById('s3-title').innerText = data.s3Title;
    document.getElementById('s3-text').innerText = data.s3Text;

    // Transition to step 1
    document.getElementById('step-0').classList.add('hidden');
    const step1 = document.getElementById('step-1');
    step1.classList.remove('hidden');
    setTimeout(() => {
        step1.style.opacity = '1';
        step1.style.transform = 'scale(1)';
    }, 10);
}

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
    const prompts = content[currentVersion].prompts;
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
