document.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionLetters = section.querySelector('.section-letters');

        if (scrollPosition >= sectionTop - sectionHeight / 2 && scrollPosition < sectionTop + sectionHeight / 2) {
            sectionLetters.classList.add('section-active');
        } else {
            sectionLetters.classList.remove('section-active');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const bookTourBtn = document.querySelector('.book-tour-btn');
    const popup = document.getElementById('book-tour-popup');
    const closePopup = document.querySelector('.popup .close');

    bookTourBtn.addEventListener('click', function () {
        popup.style.display = 'flex';
    });

    closePopup.addEventListener('click', function () {
        popup.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });

    // Form submission handling (example)
    const bookTourForm = document.getElementById('book-tour-form');
    bookTourForm.addEventListener('submit', function (event) {
        event.preventDefault();
        // Add form submission logic here
        alert('Tour booked successfully!');
        popup.style.display = 'none';
    });
});
