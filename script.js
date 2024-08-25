// script.js

// Slideshow functionality
const slides = document.querySelector('.slides');
const slideImages = document.querySelectorAll('.slides img');
let currentIndex = 0;

function showSlide(index) {
    const totalSlides = slideImages.length;
    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }
    slides.style.transform = `translateX(${-currentIndex * 100}%)`;
}

setInterval(() => {
    showSlide(currentIndex + 1);
}, 5000);

// Popup functionality
const bookTourBtn = document.querySelector('.book-tour-btn');
const popup = document.querySelector('#book-tour-popup');
const closePopup = document.querySelector('.popup-content .close');

bookTourBtn.addEventListener('click', () => {
    popup.style.display = 'flex';
});

closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.style.display = 'none';
    }
});
