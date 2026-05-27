document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.querySelector('.gallery-container');
    const galleryGrid = document.querySelector('.gallery-grid');
    const prevBtn = document.querySelector('.prevBtn');
    const nextBtn = document.querySelector('.nextBtn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (galleryContainer && galleryGrid && galleryItems.length > 0) {
        // Clone items for a seamless loop
        galleryItems.forEach(item => {
            galleryGrid.appendChild(item.cloneNode(true));
        });

        let animationFrameId;

        const autoScroll = () => {
            const scrollLoopPoint = galleryGrid.scrollWidth / 2;
            galleryGrid.scrollLeft += 1;
            if (galleryGrid.scrollLeft >= scrollLoopPoint) {
                galleryGrid.scrollLeft = 0;
            }
            animationFrameId = requestAnimationFrame(autoScroll);
        };

        const startAutoScroll = () => {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(autoScroll);
        };

        const stopAutoScroll = () => {
            cancelAnimationFrame(animationFrameId);
        };

        const itemWidth = galleryItems[0].offsetWidth;
        const gap = parseFloat(getComputedStyle(galleryGrid).gap) || 0;
        const scrollAmount = itemWidth + gap;

        let scrollTimeout;

        prevBtn.addEventListener('click', () => {
            stopAutoScroll();
            galleryGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(startAutoScroll, 5000);
        });

        nextBtn.addEventListener('click', () => {
            stopAutoScroll();
            galleryGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(startAutoScroll, 5000);
        });



        startAutoScroll();
    }

    const copyEmailLink = document.getElementById('copy-email');

    if (copyEmailLink) {
        copyEmailLink.addEventListener('click', function(event) {
            event.preventDefault();
            const email = 'info@blueprintautocare.com';
            navigator.clipboard.writeText(email).then(() => {
                const tooltip = document.createElement('span');
                tooltip.textContent = 'Copied!';
                tooltip.classList.add('tooltip');
                copyEmailLink.appendChild(tooltip);
                setTimeout(() => {
                    copyEmailLink.removeChild(tooltip);
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy email: ', err);
            });
        });
    }

    const serviceCards = document.querySelectorAll('.card');

    serviceCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('btn')) {
                card.classList.toggle('is-flipped');
            }
        });
    });
});