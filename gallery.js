document.addEventListener('DOMContentLoaded', function () {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.getElementById('close-lightbox');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    let currentIndex = -1;
    let debounceTimer;

    // Debounce function to prevent rapid event firing
    function debounce(func, delay) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(func, delay);
    }

    // Adding scroll animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.5 });

    // Lazy loading and setting up click for each gallery item
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        img.setAttribute('loading', 'lazy'); // Enable lazy loading

        observer.observe(item);

        // Add event listener for image click
        item.addEventListener('click', function () {
            lightbox.style.display = 'flex';
            lightboxImg.src = img.src; // Set clicked image in lightbox
            currentIndex = index;
            preloadAdjacentImages(currentIndex); // Preload adjacent images
        });
    });

    // Close lightbox on click of close button
    closeLightbox.addEventListener('click', function () {
        lightbox.style.display = 'none';
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function (event) {
        if (event.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    // Keyboard accessibility with debounce
    document.addEventListener('keydown', function (e) {
        if (lightbox.style.display === 'flex') {
            debounce(() => {
                if (e.key === 'ArrowLeft') {
                    showPrevImage();
                } else if (e.key === 'ArrowRight') {
                    showNextImage();
                } else if (e.key === 'Escape') {
                    lightbox.style.display = 'none';
                }
            }, 200); // 200ms debounce delay
        }
    });

    // Show previous image
    function showPrevImage() {
        currentIndex = (currentIndex === 0) ? galleryItems.length - 1 : currentIndex - 1;
        updateLightboxImage(currentIndex);
    }

    // Show next image
    function showNextImage() {
        currentIndex = (currentIndex === galleryItems.length - 1) ? 0 : currentIndex + 1;
        updateLightboxImage(currentIndex);
    }

    // Update lightbox image and preload adjacent images
    function updateLightboxImage(index) {
        const newImg = galleryItems[index].querySelector('img');
        lightboxImg.src = newImg.src;
        preloadAdjacentImages(index); // Preload next and previous images
    }

    // Preload adjacent images to make transitions smoother
    function preloadAdjacentImages(index) {
        const nextIndex = (index === galleryItems.length - 1) ? 0 : index + 1;
        const prevIndex = (index === 0) ? galleryItems.length - 1 : index - 1;
        const nextNextIndex = (nextIndex === galleryItems.length - 1) ? 0 : nextIndex + 1;
        const prevPrevIndex = (prevIndex === 0) ? galleryItems.length - 1 : prevIndex - 1;

        const nextImg = new Image();
        nextImg.src = galleryItems[nextIndex].querySelector('img').src;

        const prevImg = new Image();
        prevImg.src = galleryItems[prevIndex].querySelector('img').src;

        const nextNextImg = new Image();
        nextNextImg.src = galleryItems[nextNextIndex].querySelector('img').src;

        const prevPrevImg = new Image();
        prevPrevImg.src = galleryItems[prevPrevIndex].querySelector('img').src;
    }

    // Add click functionality for arrows with debounce
    prevArrow.addEventListener('click', () => debounce(showPrevImage, 200));
    nextArrow.addEventListener('click', () => debounce(showNextImage, 200));

    // Burger menu toggle
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
    });
});
