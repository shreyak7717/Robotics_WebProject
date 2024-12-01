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
    } catch (error) {
        console.error('Error loading admin panel:', error);
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

document.addEventListener('DOMContentLoaded', loadAdminPanel);
