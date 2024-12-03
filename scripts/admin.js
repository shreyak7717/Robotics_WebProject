async function loadAdminPanel() {
    try {
        const response = await fetch('/data/admin.json');
        const data = await response.json();
        
        document.title = data.title;
        
        // Render header
        document.querySelector('header .logo h1').textContent = data.header.title;
        
        // Render sections
        data.sections.forEach(section => {
            // Create section container
            const container = document.createElement('div');
            container.className = 'admin-container';
            
            // Section title
            const title = document.createElement('h2');
            title.textContent = section.title;
            container.appendChild(title);
            
            // Create form
            const form = document.createElement('form');
            form.id = section.formId;
            form.method = 'post';
            form.action = section.formAction;
            form.enctype = 'multipart/form-data';
            
            // Add form fields
            section.fields.forEach(field => {
                const formGroup = document.createElement('div');
                formGroup.className = 'form-group';
                
                const label = document.createElement('label');
                label.htmlFor = field.id;
                label.textContent = field.label;
                
                const input = field.type === 'textarea'
                    ? document.createElement('textarea')
                    : document.createElement('input');
                
                if (field.type !== 'textarea') {
                    input.type = field.type;
                }
                
                // Set attributes
                Object.keys(field).forEach(key => {
                    if (key !== 'label' && key !== 'type') {
                        input[key] = field[key];
                    }
                });
                
                formGroup.appendChild(label);
                formGroup.appendChild(input);
                form.appendChild(formGroup);
            });
            
            // Add submit button
            const button = document.createElement('button');
            button.type = 'submit';
            button.textContent = `Add ${capitalizeFirstLetter(section.type)}`;
            form.appendChild(button);
            
            container.appendChild(form);
            
            // Add list section
            const listContainer = document.createElement('div');
            listContainer.className = `${section.type}-list`;
            
            const listTitle = document.createElement('h3');
            listTitle.textContent = section.listTitle;
            listContainer.appendChild(listTitle);
            
            const list = document.createElement('div');
            list.id = section.listId;
            list.className = `${section.type}-cards`;
            listContainer.appendChild(list);
            
            container.appendChild(listContainer);
            
            // Append to main content
            document.getElementById('main-content').appendChild(container);
        });
        
        // Remove or comment out redundant data fetching functions
        // await loadResources();
        // await loadTeamMembers();
    } catch (error) {
        console.error('Error loading admin panel:', error);
    }
}

async function loadResources() {
    try {
        const response = await fetch('/api/resources');
        const data = await response.json();
        const resourcesList = document.getElementById('resourcesList');
        resourcesList.innerHTML = '';
        data.data.forEach(resource => {
            const card = document.createElement('div');
            card.className = 'resource-card';
            card.innerHTML = `
                <img src="${resource.image}" alt="${resource.title}">
                <h4>${resource.title}</h4>
                <p>${resource.description}</p>
                <p>Quantity: ${resource.quantity}</p>
                <button onclick="editResource('${resource._id}')">Edit</button>
                <button onclick="deleteResource('${resource._id}')">Delete</button>
            `;
            resourcesList.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading resources:', error);
    }
}

async function loadTeamMembers() {
    try {
        const response = await fetch('/api/team');
        const data = await response.json();
        const teamList = document.getElementById('teamList');
        teamList.innerHTML = '';
        data.data.forEach(member => {
            const card = document.createElement('div');
            card.className = 'team-card';
            card.innerHTML = `
                <img src="${member.image}" alt="${member.name}">
                <h4>${member.name}</h4>
                <p>${member.role}</p>
                <button onclick="editTeamMember('${member._id}')">Edit</button>
                <button onclick="deleteTeamMember('${member._id}')">Delete</button>
            `;
            teamList.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading team members:', error);
    }
}

async function deleteResource(id) {
    try {
        const response = await fetch(`/api/resources/${id}`, {
            method: 'DELETE'
        });
        const result = await response.json();
        if (result.success) {
            await loadResources();
        } else {
            alert('Failed to delete resource');
        }
    } catch (error) {
        console.error('Error deleting resource:', error);
    }
}

async function deleteTeamMember(id) {
    try {
        const response = await fetch(`/api/team/${id}`, {
            method: 'DELETE'
        });
        const result = await response.json();
        if (result.success) {
            await loadTeamMembers();
        } else {
            alert('Failed to delete team member');
        }
    } catch (error) {
        console.error('Error deleting team member:', error);
    }
}

// Function to open the Edit Resource Modal
function editResource(id) {
    // Fetch the resource data
    fetch(`/api/resources/${id}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const resource = data.data;
                document.getElementById('editResourceId').value = resource._id;
                document.getElementById('editResourceName').value = resource.title;
                document.getElementById('editResourceQuantity').value = resource.quantity;
                document.getElementById('editResourceDescription').value = resource.description;
                document.getElementById('editResourceModal').style.display = 'block';
            } else {
                alert('Failed to fetch resource data.');
            }
        })
        .catch(error => console.error('Error fetching resource:', error));
}

// Function to close the Edit Resource Modal
function closeEditResourceModal() {
    document.getElementById('editResourceModal').style.display = 'none';
}

// Handle Edit Resource Form Submission
document.getElementById('editResourceForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('editResourceId').value;
    const title = document.getElementById('editResourceName').value;
    const quantity = document.getElementById('editResourceQuantity').value;
    const description = document.getElementById('editResourceDescription').value;

    fetch(`/api/resources/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, quantity, description }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Resource updated successfully.');
            closeEditResourceModal();
            loadAdminPanel(); // Refresh the admin panel
        } else {
            alert('Failed to update resource.');
        }
    })
    .catch(error => console.error('Error updating resource:', error));
});

// Function to open the Edit Team Member Modal
function editTeamMember(id) {
    // Fetch the team member data
    fetch(`/api/team/${id}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const member = data.data;
                document.getElementById('editTeamMemberId').value = member._id;
                document.getElementById('editTeamMemberName').value = member.name;
                document.getElementById('editTeamMemberRole').value = member.role;
                document.getElementById('editTeamMemberModal').style.display = 'block';
            } else {
                alert('Failed to fetch team member data.');
            }
        })
        .catch(error => console.error('Error fetching team member:', error));
}

// Function to close the Edit Team Member Modal
function closeEditTeamMemberModal() {
    document.getElementById('editTeamMemberModal').style.display = 'none';
}

// Handle Edit Team Member Form Submission
document.getElementById('editTeamMemberForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('editTeamMemberId').value;
    const name = document.getElementById('editTeamMemberName').value;
    const role = document.getElementById('editTeamMemberRole').value;

    fetch(`/api/team/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, role }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Team member updated successfully.');
            closeEditTeamMemberModal();
            loadAdminPanel(); // Refresh the admin panel
        } else {
            alert('Failed to update team member.');
        }
    })
    .catch(error => console.error('Error updating team member:', error));
});

// Close modals when clicking outside of them
window.onclick = function(event) {
    const editResourceModal = document.getElementById('editResourceModal');
    const editTeamMemberModal = document.getElementById('editTeamMemberModal');
    if (event.target == editResourceModal) {
        editResourceModal.style.display = 'none';
    }
    if (event.target == editTeamMemberModal) {
        editTeamMemberModal.style.display = 'none';
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

document.addEventListener('DOMContentLoaded', loadAdminPanel);
