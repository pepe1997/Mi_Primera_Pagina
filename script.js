
// Carrusel de videos
const carouselItems = document.querySelectorAll('.carousel-item');
let currentIndex = 0;

document.querySelector('.carousel-next').addEventListener('click', () => {
    carouselItems[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % carouselItems.length;
    carouselItems[currentIndex].classList.add('active');
});

document.querySelector('.carousel-prev').addEventListener('click', () => {
    carouselItems[currentIndex].classList.remove('active');
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    carouselItems[currentIndex].classList.add('active');
});
