let inventoryItems = JSON.parse(localStorage.getItem('resources')) || [];

const inventoryGrid = document.getElementById('inventoryGrid'); 

function createCard(item) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                <img src="${item.image}" alt="${item.title}">
                <div class="card-label">${item.title}</div>
            </div>
            <div class="card-back">
                <h3>${item.title}</h3>
                <p>Quantity: ${item.quantity}</p>
                <p>${item.description}</p>
            </div>
        </div>
    `;
    card.addEventListener('mouseenter', () => {
        card.classList.add('flipped');
    });
    card.addEventListener('mouseleave', () => {
        card.classList.remove('flipped');
    });
    return card;
}

async function fetchResources() {
    try {
        const response = await fetch('/api/resources');
        const result = await response.json();
        if (result.success) {
            const resources = result.data;
            renderInventory(resources);
        } else {
            console.error('Failed to fetch resources:', result.message);
        }
    } catch (error) {
        console.error('Error fetching resources:', error);
    }
}

function renderInventory(items) {
    inventoryGrid.innerHTML = '';
    items.forEach(item => {
        inventoryGrid.appendChild(createCard(item));
    });
}

fetchResources();

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    fetchResources().then(() => {
        const cards = Array.from(inventoryGrid.children);
        cards.forEach(card => {
            const title = card.querySelector('.card-label').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
});