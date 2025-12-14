// script.js

// --- 1. Canvas Starfield Background ---
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let width, height;

// Resize canvas to full screen
function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}
window.addEventListener('resize', resize);
resize();

// Star Objects
const stars = [];
const numStars = 100;

class Star {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.z = Math.random() * 2 + 0.5; // Depth factor
        this.size = Math.random() * 2;
        this.speed = Math.random() * 0.5 + 0.1;
    }
    update() {
        // Move stars slowly upwards
        this.y -= this.speed;
        // Parallax effect based on mouse (optional refinement)
        
        // Reset if off screen
        if (this.y < 0) this.y = height;
    }
    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize Stars
for(let i=0; i<numStars; i++) stars.push(new Star());

function animateStars() {
    ctx.clearRect(0, 0, width, height);
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animateStars);
}
animateStars();

// --- 2. Magic Cursor Trail ---
document.addEventListener('mousemove', (e) => {
    // Create sparkle
    const sparkle = document.createElement('div');
    sparkle.classList.add('magic-particle');
    sparkle.style.left = `${e.clientX}px`;
    sparkle.style.top = `${e.clientY}px`;
    
    // Randomize slight size variation
    const size = Math.random() * 6 + 2;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.background = `hsl(${Math.random() * 60 + 20}, 100%, 50%)`; // Gold/Orange hues
    
    document.body.appendChild(sparkle);

    // Remove from DOM after animation
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
});

// --- 3. 3D Crystal Ball Tilt Effect ---
const ball = document.querySelector('.crystal-ball');
const wrapper = document.getElementById('ballWrapper');

document.addEventListener('mousemove', (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 20;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 20;
    
    // Apply rotation to the ball
    ball.style.transform = `translateX(-50%) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

// --- 4. Content Switching ("Casting Spells") ---
const contentMap = {
    home: `<h2>The Portal</h2><p>I am a Creative Developer weaving code into visual stories.</p>`,
    projects: `<h2>Quest Log</h2>
               <ul style="text-align:left; list-style:none; padding:0;">
                 <li>🔮 <strong>Alchemist App</strong> - React.js</li>
                 <li>⚔️ <strong>Rune Reader</strong> - Python</li>
                 <li>🗺️ <strong>Map of Worlds</strong> - Three.js</li>
               </ul>`,
    skills: `<h2>Grimoire</h2><p>HTML5 • CSS3 • JavaScript • WebGL • React</p>`,
    contact: `<h2>Summon Me</h2><p>wizard@example.com</p><p>Send a raven or an email.</p>`
};

const ballContent = document.getElementById('ballContent');

function castSpell(target) {
    // 1. Fade out current content
    ballContent.style.opacity = 0;
    
    // 2. Change content after fade out (300ms)
    setTimeout(() => {
        ballContent.innerHTML = contentMap[target];
        // 3. Fade in new content
        ballContent.style.opacity = 1;
        
        // Add a burst effect around the ball (optional visual flair)
        createBurst();
    }, 300);
}

// Simple visual burst helper
function createBurst() {
    const burst = document.createElement('div');
    burst.style.position = 'absolute';
    burst.style.top = '50%';
    burst.style.left = '50%';
    burst.style.transform = 'translate(-50%, -50%)';
    burst.style.width = '300px';
    burst.style.height = '300px';
    burst.style.borderRadius = '50%';
    burst.style.boxShadow = '0 0 50px 20px rgba(255, 215, 0, 0.5)';
    burst.style.pointerEvents = 'none';
    burst.style.transition = 'opacity 0.5s, transform 0.5s';
    
    wrapper.appendChild(burst);
    
    requestAnimationFrame(() => {
        burst.style.opacity = 0;
        burst.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    setTimeout(() => burst.remove(), 500);
}
