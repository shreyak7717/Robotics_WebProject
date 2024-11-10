document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const cards = document.querySelectorAll('.card__article');
    
    // Clone cards for infinite scroll
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        slider.appendChild(clone);
    });
});