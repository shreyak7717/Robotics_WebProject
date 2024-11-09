// Initialize resources array from localStorage or empty array
let resources = JSON.parse(localStorage.getItem('resources')) || [];

// Function to save resources to localStorage
function saveResources() {
    localStorage.setItem('resources', JSON.stringify(resources));
}

// Function to add a new resource
function addResource(e) {
    e.preventDefault();
    
    const newResource = {
        id: Date.now(),
        name: document.getElementById('name').value,
        quantity: document.getElementById('quantity').value,
        image: document.getElementById('image').value,
        description: document.getElementById('description').value
    };

    resources.push(newResource);
    saveResources();
    displayResources();
    e.target.reset();
}

// Function to delete a resource
function deleteResource(id) {
    resources = resources.filter(resource => resource.id !== id);
    saveResources();
    displayResources();
}

// Function to display resources
function displayResources() {
    const resourcesList = document.getElementById('resourcesList');
    resourcesList.innerHTML = resources.map(resource => `
        <div class="resource-item">
            <div>
                <strong>${resource.name}</strong> - Quantity: ${resource.quantity}
            </div>
            <button onclick="deleteResource(${resource.id})" class="delete-btn">Delete</button>
        </div>
    `).join('');
}

// Event listeners
document.getElementById('resourceForm').addEventListener('submit', addResource);

// Initial display
displayResources();