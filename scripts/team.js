document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');

    async function fetchTeamMembers() {
        try {
            const response = await fetch('/api/team');
            const result = await response.json();
            if (result.success) {
                const teamMembers = result.data;
                renderTeamMembers(teamMembers);
            } else {
                console.error('Failed to fetch team members:', result.message);
            }
        } catch (error) {
            console.error('Error fetching team members:', error);
        }
    }

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

    function renderTeamMembers(teamMembers) {
        slider.innerHTML = '';
        teamMembers.forEach(member => {
            slider.appendChild(createCard(member));
        });

        // Clone cards for infinite scroll
        teamMembers.forEach(member => {
            const clone = createCard(member);
            slider.appendChild(clone);
        });
    }

    fetchTeamMembers();
});
