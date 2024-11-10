// Initialize resources and team members arrays from localStorage or empty arrays
let resources = JSON.parse(localStorage.getItem('resources')) || [];
let teamMembers = JSON.parse(localStorage.getItem('teamMembers')) || [];

// Function to save resources and team members to localStorage
function saveResources() {
    localStorage.setItem('resources', JSON.stringify(resources));
}

function saveTeamMembers() {
    localStorage.setItem('teamMembers', JSON.stringify(teamMembers));
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

// Function to add a new team member
function addTeamMember(e) {
    e.preventDefault();

    const newTeamMember = {
        id: Date.now(),
        name: document.getElementById('teamName').value,
        role: document.getElementById('teamRole').value,
        image: document.getElementById('teamImage').value
    };

    teamMembers.push(newTeamMember);
    saveTeamMembers();
    displayTeamMembers();
    e.target.reset();
}

// Function to delete a resource
function deleteResource(id) {
    resources = resources.filter(resource => resource.id !== id);
    saveResources();
    displayResources();
}

// Function to delete a team member
function deleteTeamMember(id) {
    teamMembers = teamMembers.filter(member => member.id !== id);
    saveTeamMembers();
    displayTeamMembers();
}

// Function to display resources as cards
function displayResources() {
    const resourcesList = document.getElementById('resourcesList');
    resourcesList.innerHTML = resources.map(resource => `
        <div class="resource-card">
            <img src="${resource.image}" alt="${resource.name}" class="resource-image">
            <div class="resource-details">
                <h4>${resource.name}</h4>
                <p>${resource.description}</p>
                <span>Quantity: ${resource.quantity}</span>
                <button onclick="deleteResource(${resource.id})" class="delete-btn">Delete</button>
            </div>
        </div>
    `).join('');
}

// Function to display team members as cards
function displayTeamMembers() {
    const teamList = document.getElementById('teamList');
    teamList.innerHTML = teamMembers.map(member => `
        <div class="team-card">
            <img src="${member.image}" alt="${member.name}" class="team-image">
            <div class="team-details">
                <h4>${member.name}</h4>
                <p>${member.role}</p>
                <button onclick="deleteTeamMember(${member.id})" class="delete-btn">Delete</button>
            </div>
        </div>
    `).join('');
}

// Event listeners
document.getElementById('resourceForm').addEventListener('submit', addResource);
document.getElementById('teamForm').addEventListener('submit', addTeamMember);

// Initial display
displayResources();
displayTeamMembers();
