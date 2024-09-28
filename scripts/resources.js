const inventoryItems = [
    { name: 'Pratyaksh', quantity: 15 },
    { name: 'Shreya', quantity: 10 },
    { name: 'Ravi', quantity: 20 },
    { name: 'Arduino DUE', quantity: 5 },
    { name: 'Arduino MICRO', quantity: 8 },
    { name: 'Arduino LEONARDO', quantity: 12 },
    { name: 'Arduino YUN', quantity: 3 },
    { name: 'Arduino PRO MINI', quantity: 7 }
];

const inventoryGrid = document.getElementById('inventoryGrid');

function createCard(item) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                <img src="images/ard.jpg" alt="${item.name}">
                <div class="card-label">${item.name}</div>
            </div>
            <div class="card-back">
                <h3>${item.name}</h3>
                <p>Quantity: ${item.quantity}</p>
            </div>
        </div>
    `;
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
    return card;
}

function renderInventory() {
    inventoryGrid.innerHTML = '';
    inventoryItems.forEach(item => {
        inventoryGrid.appendChild(createCard(item));
    });
}

renderInventory();

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredItems = inventoryItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm)
    );
    inventoryGrid.innerHTML = '';
    filteredItems.forEach(item => {
        inventoryGrid.appendChild(createCard(item));
    });
});