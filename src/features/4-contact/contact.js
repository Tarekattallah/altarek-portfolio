function initContactCard(form) {
    const front = document.getElementById('contact-card-front');
    const card = front?.closest('.contact-card');
    if (!front || !card) return;

    // Tap/click flips the card and moves focus into the form
    front.addEventListener('click', () => {
        card.classList.add('is-flipped');
        form.querySelector('input:not([type="hidden"]):not([name="_honey"])')?.focus({ preventScroll: true });
    });
}

export function initContactForm() {
    const form = document.getElementById('contact-form');
    const statusEl = document.getElementById('form-status');
    if (!form || !statusEl) return;

    initContactCard(form);

    const submitBtn = form.querySelector('button[type="submit"]');
    // FormSubmit's documented AJAX endpoint returns JSON; the plain action URL stays as the no-JS fallback
    const endpoint = form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/');

    function setStatus(text, color) {
        statusEl.textContent = text;
        statusEl.classList.remove('text-green-500', 'text-red-400', 'text-gray-300');
        if (color) statusEl.classList.add(color);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(form));

        // Bots fill the hidden honeypot field; pretend success and send nothing
        if (data._honey) {
            setStatus('Message sent successfully!', 'text-green-500');
            form.reset();
            return;
        }
        delete data._honey;

        setStatus('Sending...', 'text-gray-300');
        submitBtn.disabled = true;

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await response.json().catch(() => ({}));

            if (response.ok && String(result.success) === 'true') {
                setStatus('Message sent successfully!', 'text-green-500');
                form.reset();
            } else {
                setStatus(result.message || 'Oops! There was a problem submitting your form.', 'text-red-400');
            }
        } catch (error) {
            setStatus('Oops! There was a network error.', 'text-red-400');
        } finally {
            submitBtn.disabled = false;
        }
    }

    form.addEventListener('submit', handleSubmit);
}
