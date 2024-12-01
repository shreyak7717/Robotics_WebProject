async function loadPageData() {
    try {
        const response = await fetch('/api/contact-data');
        const data = await response.json();
        
        renderForm(data.contactForm);
        renderFooter(data.footer);
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function renderForm(formData) {
    const formLeft = document.getElementById('formLeft');
    const formRight = document.getElementById('formRight');

    // Render left side form fields
    formData.formFields.forEach(field => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h2 class="form-heading">${field.label}</h2>
            ${field.type === 'select' 
                ? `<select class="form-input" id="${field.id}">
                    ${field.options.map(opt => `
                        <option value="${opt.value}" 
                        ${opt.disabled ? 'disabled' : ''} 
                        ${opt.selected ? 'selected' : ''}>
                            ${opt.text}
                        </option>`).join('')}
                   </select>`
                : `<input type="${field.type}" class="form-input" id="${field.id}">`
            }
        `;
        formLeft.appendChild(div);
    });

    // Render right side feedback
    const feedbackDiv = document.createElement('div');
    feedbackDiv.innerHTML = `
        <h2 class="form-heading">${formData.feedback.label}</h2>
        <textarea class="feedback-box" id="${formData.feedback.id}"></textarea>
    `;
    formRight.appendChild(feedbackDiv);
}

function renderFooter(footerData) {
    const footer = document.getElementById('footerContainer');
    
    // Create footer content
    const footerContent = document.createElement('div');
    footerContent.className = 'footer-content';
    
    footerData.sections.forEach(section => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'footer-section';
        
        sectionDiv.innerHTML = `
            <h3>${section.title}</h3>
            ${section.content ? section.content.map(text => `<p>${text}</p>`).join('') : ''}
            ${section.links ? section.links.map(link => `<a href="${link.href}">${link.text}</a>`).join('') : ''}
            ${section.socialIcons ? `
                <div class="social-icons">
                    ${section.socialIcons.map(icon => `<a href="${icon.href}">${icon.symbol}</a>`).join('')}
                </div>
            ` : ''}
        `;
        footerContent.appendChild(sectionDiv);
    });

    footer.appendChild(footerContent);

    // Create footer bottom
    const hr = document.createElement('hr');
    hr.className = 'solid-line';
    footer.appendChild(hr);

    const footerBottom = document.createElement('div');
    footerBottom.className = 'footer-bottom';
    footerBottom.innerHTML = `
        <div>${footerData.bottom.copyright}</div>
        <div><a href="${footerData.bottom.privacy.href}">${footerData.bottom.privacy.text}</a></div>
    `;
    footer.appendChild(footerBottom);
}

document.addEventListener('DOMContentLoaded', loadPageData);
