document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('button[type="submit"]');
    const buttonText = submitButton.querySelector('.button-text');
    const spinner = submitButton.querySelector('.spinner-border');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Verify reCAPTCHA
        const recaptchaResponse = grecaptcha.getResponse();
        if (!recaptchaResponse) {
            alert('Please complete the reCAPTCHA verification');
            return;
        }

        // Show loading state
        buttonText.textContent = 'Sending...';
        spinner.classList.remove('d-none');
        submitButton.disabled = true;

        try {
            const formData = new FormData(form);
            formData.append('g-recaptcha-response', recaptchaResponse);

            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Show success message
                form.reset();
                grecaptcha.reset();
                form.classList.add('d-none');
                successMessage.classList.remove('d-none');
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            alert('Oops! There was a problem sending your message. Please try again or contact me directly via email.');
        } finally {
            // Reset button state
            buttonText.textContent = 'Send Message';
            spinner.classList.add('d-none');
            submitButton.disabled = false;
        }
    });
}); 