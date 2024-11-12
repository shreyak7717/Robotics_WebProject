function saveResources() {
    const jsonString = JSON.stringify(resources);  
    localStorage.setItem('resources', jsonString);
    console.log("Saved Resources:", resources);  // Log the resources each time they are saved

}

function saveTeamMembers() {
    const jsonString = JSON.stringify(teamMembers);  
    localStorage.setItem('teamMembers', jsonString);
}

function loadResources() {
    const resourcesString = localStorage.getItem('resources');
    console.log("Loaded Resources:", resourcesString);  // Log loaded resources

    return resourcesString ? JSON.parse(resourcesString) : [];  

}

function loadTeamMembers() {
    const teamMembersString = localStorage.getItem('teamMembers');
    return teamMembersString ? JSON.parse(teamMembersString) : [];  
}

let resources = loadResources();
let teamMembers = loadTeamMembers();

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

function deleteTeamMember(id) {
    teamMembers = teamMembers.filter(member => member.id !== id);
    saveTeamMembers(); 
    displayTeamMembers();
}

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

document.getElementById('resourceForm').addEventListener('submit', addResource);
document.getElementById('teamForm').addEventListener('submit', addTeamMember);

// Initial display
displayResources();
displayTeamMembers();
