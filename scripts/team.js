document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');

    // Load team members from localStorage
    let teamMembers = JSON.parse(localStorage.getItem('teamMembers')) || [];

    // Function to create a team card
    function createCard(member) {
        const card = document.createElement('article');
        card.className = 'card__article';
        card.innerHTML = `
            <div class="card__image">
                <img src="${member.image}" alt="Team Member" class="card__img">
                <div class="card__shadow"></div>
            </div>
            <div class="card__data">
                <h3 class="card__name">${member.name}</h3>
                <p class="card__description">${member.role}</p>
                <div class="social-links">
                    ${member.linkedin ? `<a href="${member.linkedin}" target="_blank"><img src="images/linkedin.png" alt="LinkedIn"></a>` : ''}
                    ${member.github ? `<a href="${member.github}" target="_blank"><img src="images/github.png" alt="GitHub"></a>` : ''}
                    ${member.instagram ? `<a href="${member.instagram}" target="_blank"><img src="images/insta.png" alt="Instagram"></a>` : ''}
                </div>
            </div>
        `;
        return card;
    }

    // Render initial cards
    teamMembers.forEach(member => {
        slider.appendChild(createCard(member));
    });

    // Clone cards for infinite scroll
    teamMembers.forEach(member => {
        const clone = createCard(member);
        slider.appendChild(clone);
    });
});
