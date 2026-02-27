document.addEventListener('DOMContentLoaded', () => {
    // ---- Password Logic ----
    const passwordScreen = document.getElementById('password-screen');
    const mainContent = document.getElementById('main-content');
    const passwordInput = document.getElementById('password-input');
    const passwordBtn = document.getElementById('password-btn');
    const passwordError = document.getElementById('password-error');

    // The secret password (case-insensitive check later)
    const SECRET_CODE = "livv2005";

    function checkPassword() {
        const enteredPassword = passwordInput.value.trim().toLowerCase();
        if (enteredPassword === SECRET_CODE) {
            // Success: hide password screen, show main content
            passwordScreen.style.opacity = '0';
            setTimeout(() => {
                passwordScreen.style.display = 'none';
                mainContent.style.display = 'flex';
                // Trigger the hearts animation to start
                startHeartAnimation();
            }, 500);
        } else {
            // Fail: show error
            passwordError.style.display = 'block';
            passwordInput.value = '';

            // Remove error after 3 seconds
            setTimeout(() => {
                passwordError.style.display = 'none';
            }, 3000);
        }
    }

    passwordBtn.addEventListener('click', checkPassword);

    // Also allow pressing 'Enter' key
    passwordInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });


    // ---- Tab Switching Logic ----
    const tabs = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.content-section');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            tab.classList.add('active');

            const targetId = tab.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });


    // ---- Floating Hearts Logic ----
    function startHeartAnimation() {
        document.body.addEventListener('click', function (e) {
            // Don't add hearts if interacting with the password box, buttons, links, or iframes
            if (e.target.closest('#password-screen') || e.target.closest('button') || e.target.closest('a') || e.target.closest('iframe') || e.target.closest('input')) return;

            createFloatingHeart(e.clientX, e.clientY);
        });
    }

    function createFloatingHeart(x, y) {
        const heart = document.createElement('div');
        // Randomly choose between a red or purple heart
        const hearts = ['❤️', '💜'];
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];

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

        // Animate the heart floating up and fading out
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
