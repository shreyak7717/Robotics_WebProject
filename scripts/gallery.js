class Gallery {
    constructor() {
        this.galleries = [
            {
                id: 'robo-nitrous',
                title: 'Robo Nitrous',
                images: ['images/_DSC0347 2.png', 'images/_DSC0347 2.png', 'images/_DSC0347 2.png']
            },
            {
                id: 'robo-war',
                title: 'Robo War',
                images: ['images/DSC_0048.JPG']
            },
            {
                id: 'robo-soccer',
                title: 'Robo Soccer',
                images: ['images/DSC11 copy.png']
            },
            {
                id: 'robo-race',
                title: 'Robo Race',
                images: ['images/_DSC0347 2.png']
            },
            {
                id: 'drone-racing',
                title: 'Drone Racing',
                images: ['images/_DSC0347 2.png']
            },
            {
                id: 'robo-ignite',
                title: 'Robo Ignite',
                images: ['images/_DSC0347 2.png']
            }
        ];
    }

    createImageCollage() {
        const collage = document.createElement('div');
        collage.className = 'image-collage';

        this.galleries[0].images.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Robo Event ${index + 1}`;
            img.className = 'collage-image';
            collage.appendChild(img);
        });

        return collage;
    }

    createGalleryContent() {
        const content = document.createElement('div');
        content.className = 'gallery-content';

        this.galleries.forEach(gallery => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.dataset.gallery = gallery.id;

            if (gallery.id === 'robo-nitrous') {
                const link = document.createElement('a');
                link.href = '/gallery1';
                link.style.textDecoration = 'none';
                link.textContent = gallery.title;
                item.appendChild(link);
            } else {
                item.textContent = gallery.title;
            }

            content.appendChild(item);
        });

        return content;
    }

    render() {
        console.log('Rendering gallery...');
        const container = document.createElement('div');
        container.className = 'gallery-container';
        
        const collage = this.createImageCollage();
        const content = this.createGalleryContent();
        
        container.appendChild(collage);
        container.appendChild(content);
        
        console.log('Gallery container created:', container);
        return container;
    }
}

// Make sure the class is available globally
window.Gallery = Gallery;
