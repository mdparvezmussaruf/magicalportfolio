// script.js

document.addEventListener('DOMContentLoaded', () => {
    const runeLinks = document.querySelectorAll('.rune-link');
    const contentSections = document.querySelectorAll('.content-section');
    const crystalBall = document.querySelector('.crystal-ball');
    const projectPreview = document.querySelector('.project-preview');

    // --- 1. Navigation Logic (Switching Sections) ---
    runeLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = e.currentTarget.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Hide all sections
                contentSections.forEach(section => {
                    section.classList.remove('active');
                });

                // Show the target section
                // Instead of showing a full screen section, we simulate content appearing in the ball
                // For simplicity, we just change the ball's inner text or color
                
                // You would typically fetch the HTML for the section content and inject it here
                
                if (targetId === 'projects') {
                    projectPreview.innerHTML = '✨ Viewing **Projects** ✨<br> (Click to expand!)';
                    // In a real project, you'd trigger a modal or a dedicated project list view
                } else if (targetId === 'contact') {
                    projectPreview.innerHTML = '✉️ Ready to **Connect** ✉️';
                } else {
                    projectPreview.innerHTML = `🔮 Content for **${targetId.charAt(0).toUpperCase() + targetId.slice(1)}** 🔮`;
                }
            }
        });
    });

    // --- 2. Starry Background Animation (Simplified) ---
    // Function to create a single star
    const createStar = () => {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.width = star.style.height = `${Math.random() * 3 + 1}px`;
        star.style.opacity = Math.random();
        document.body.appendChild(star);
        
        // Add a CSS rule in the style sheet for the star animation:
        /*
        .star {
            position: fixed;
            background: white;
            border-radius: 50%;
            animation: twinkle 3s infinite alternate;
            z-index: 1; 
        }
        @keyframes twinkle {
            from { opacity: 0.2; }
            to { opacity: 1; }
        }
        */
    };

    // Create 50 stars
    for (let i = 0; i < 50; i++) {
        createStar();
    }
});
