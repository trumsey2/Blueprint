document.addEventListener('DOMContentLoaded', () => {

    // Card flip functionality
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // If the button on the back of the PPF card is clicked, allow navigation
            if (e.target.getAttribute('href') === 'ppf.html' && e.target.textContent === 'More about PPF') {
                return; // Do nothing, allow the default link behavior
            }

            // For all other clicks on a card, prevent default and flip
            e.preventDefault();
            card.classList.toggle('is-flipped');
        });
    });

    // Email copy functionality
    const copyEmail = document.getElementById('copy-email');
    if (copyEmail) {
        copyEmail.addEventListener('click', (e) => {
            e.preventDefault();
            const email = 'info@blueprintautocare.com';
            navigator.clipboard.writeText(email).then(() => {
                const tooltip = document.createElement('span');
                tooltip.textContent = 'Email copied!';
                tooltip.classList.add('tooltip');
                copyEmail.appendChild(tooltip);
                setTimeout(() => {
                    tooltip.remove();
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy email: ', err);
            });
        });
    }

    // Gallery scroll functionality
    const galleryGrid = document.querySelector('.gallery-grid');
    const prevBtn = document.querySelector('.prevBtn');
    const nextBtn = document.querySelector('.nextBtn');

    if (galleryGrid && prevBtn && nextBtn) {
        const scrollAmount = 320; // Width of a gallery item + gap

        nextBtn.addEventListener('click', () => {
            galleryGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            galleryGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }

    // Hamburger menu functionality
    const menuButton = document.querySelector('.btn__menu');
    const navContainer = document.querySelector('.nav__container');

    if (menuButton && navContainer) {
        menuButton.addEventListener('click', () => {
            navContainer.classList.toggle('is-open');
        });
    }

    // Glossy card shine effect
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
    });

    // Contact Form Submission
    const form = document.querySelector('.contact-form');
    const formStatus = document.getElementById('form-status');

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                formStatus.innerHTML = "<h2>Thank you!</h2><p>Your message has been sent. We'll be in touch soon.</p>";
                form.style.display = 'none';
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        formStatus.innerHTML = data["errors"].map(error => error["message"]).join(", ")
                    } else {
                        formStatus.innerHTML = "Oops! There was a problem submitting your form"
                    }
                })
            }
        }).catch(error => {
            formStatus.innerHTML = "Oops! There was a problem submitting your form"
        });
    }
    form.addEventListener("submit", handleSubmit)
});

    // Lightbox functionality for PPF page image
    const ppfImage = document.querySelector('.service-detail-img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    if (ppfImage && lightbox && lightboxImg) {
        ppfImage.style.cursor = 'pointer';
        ppfImage.addEventListener('click', () => {
            lightbox.classList.add('is-open');
            lightboxImg.src = ppfImage.src;
        });

        lightbox.addEventListener('click', () => {
            lightbox.classList.remove('is-open');
        });
    }
});
