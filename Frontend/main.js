window.onload = function() {
    alert("Created by Prashanth for Mahitha");
};

const envelope = document.getElementById('envelope');
const tapHint = document.getElementById('tapHint');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const cardText = document.getElementById('cardText');
const buttons = document.getElementById('buttons');
const envelopeWrapper = document.getElementById('envelopeWrapper');

let isOpen = false;
let yesClicked = false;

envelope.addEventListener('click', () => {
    if (!isOpen) {
        envelope.classList.add('open');
        tapHint.style.display = 'none';
        isOpen = true;
    }
});

yesBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!yesClicked) {
        yesClicked = true;
        cardText.innerText = 'Yay! I love you!';
        buttons.style.display = 'none';
        createFloatingHearts();
        createScatteredHearts();
    }
});

noBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    moveNoButton();
});

noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    e.stopPropagation();
    moveNoButton();
});

noBtn.addEventListener('mouseover', () => {
    if (isOpen && !yesClicked) {
        moveNoButton();
    }
});

function moveNoButton() {
    const maxX = window.innerWidth - noBtn.offsetWidth - 40;
    const maxY = window.innerHeight - noBtn.offsetHeight - 120;
    const x = Math.random() * Math.max(maxX - 40, 50) + 20;
    const y = Math.random() * Math.max(maxY - 80, 50) + 80;
    noBtn.style.position = 'fixed';
    noBtn.style.left = Math.min(x, maxX) + 'px';
    noBtn.style.top = Math.min(y, maxY) + 'px';
    noBtn.style.zIndex = '1000';
}

function createFloatingHearts() {
    const heartSymbols = ['♥', '❤', '💖'];
    const colors = ['#c2185b', '#e91e63', '#7a2e2e', '#d4647a'];
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = (window.innerHeight - 80) + 'px';
            heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
            heart.style.color = colors[Math.floor(Math.random() * colors.length)];
            heart.style.animation = `floatHeart ${2 + Math.random() * 2}s ease-out forwards`;
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 4000);
        }, i * 60);
    }
}

function createScatteredHearts() {
    const wrapper = envelopeWrapper;
    const heartSymbols = ['♥', '❤'];
    const colors = ['#c2185b', '#e91e63', '#d4647a', '#7a2e2e'];
    
    const positions = [
        { top: '-30px', left: '-20px', size: 24 },
        { top: '-20px', right: '-15px', size: 20 },
        { top: '40%', left: '-30px', size: 18 },
        { top: '50%', right: '-25px', size: 22 },
        { bottom: '-20px', left: '-15px', size: 16 },
        { bottom: '-25px', right: '-20px', size: 26 },
        { top: '-40px', left: '45%', size: 20 },
    ];
    
    positions.forEach((pos, i) => {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'scatter-heart';
            heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            heart.style.fontSize = pos.size + 'px';
            heart.style.color = colors[Math.floor(Math.random() * colors.length)];
            Object.keys(pos).forEach(key => {
                if (key !== 'size') heart.style[key] = pos[key];
            });
            wrapper.appendChild(heart);
        }, i * 100);
    });
}
