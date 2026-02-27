document.addEventListener('DOMContentLoaded', () => {
    // Select all tab buttons and content sections
    const tabs = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.content-section');

    // Add click event listener to each tab
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Remove active class from all sections
            sections.forEach(s => s.classList.remove('active'));

            // Add active class to clicked tab
            tab.classList.add('active');

            // Find matching section and add active class
            const targetId = tab.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    // Optional: Add simple heart floating animations on click
    document.body.addEventListener('click', function(e) {
        // Don't add hearts if clicking on a button to avoid interference
        if(e.target.closest('button') || e.target.closest('a') || e.target.closest('iframe')) return;

        createFloatingHeart(e.clientX, e.clientY);
    });

    function createFloatingHeart(x, y) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.fontSize = '24px';
        heart.style.pointerEvents = 'none';
        heart.style.transform = 'translate(-50%, -50%)';
        heart.style.transition = 'all 1s ease-out';
        heart.style.opacity = '1';
        heart.style.zIndex = '1000';
        
        document.body.appendChild(heart);

        // Animate the heart
        setTimeout(() => {
            heart.style.transform = `translate(-50%, -150px) scale(1.5) rotate(${Math.random() * 40 - 20}deg)`;
            heart.style.opacity = '0';
        }, 10);

        // Remove element after animation
        setTimeout(() => {
            heart.remove();
        }, 1000);
    }
});
