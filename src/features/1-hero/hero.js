import { prefersReducedMotion } from '../../shared/ui/motion.js';

function typeEffect() {
    const words = [" HTML, CSS, JavaScript, React, Node.js, and scalable backend systems.", "Web Apps.", "modern web development — from frontend to backend.", "Great UI/UX."];
    let wordIndex = 0, charIndex = 0, isDeleting = false;
    const typingElement = document.getElementById("typing-text");
    if (!typingElement) return;
    if (prefersReducedMotion()) {
        typingElement.textContent = 'Web Apps.';
        return;
    }

    function type() {
        const currentWord = words[wordIndex];
        typingElement.textContent = currentWord.substring(0, charIndex);
        if (!isDeleting && charIndex < currentWord.length) {
            charIndex++;
            setTimeout(type, 150);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(type, 100);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                wordIndex = (wordIndex + 1) % words.length;
            }
            setTimeout(type, 1200);
        }
    }
    type();
}

function animateHeroText() {
    const h1 = document.getElementById('hero-name-h1');
    if (!h1) return;
    const text = h1.textContent;
    h1.innerHTML = '';
    
    let charIndex = 0;
    const words = text.split(' ');
    
    words.forEach((word, wordIdx) => {
        const wordWrapper = document.createElement('div');
        wordWrapper.style.display = 'inline-block';
        
        word.split('').forEach((char) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.animationDelay = `${charIndex * 0.05}s`;
            wordWrapper.appendChild(span);
            charIndex++;
        });
        
        h1.appendChild(wordWrapper);
        
        if (wordIdx < words.length - 1) {
            h1.appendChild(document.createTextNode(' '));
            charIndex++; // Keep index incremented for space
        }
    });
}

export function initHeroFeature() {
    // These animations should start after the preloader has faded out
    window.addEventListener('load', () => {
        animateHeroText();
        typeEffect();
    });
}