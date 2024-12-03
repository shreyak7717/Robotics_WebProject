const resourceModel = require('../models/resourcesModel');
const path = require('path');
const fs = require('fs');
const Port = 3001;
const createResource = async (req, res) => {
    try {

       const {title, quantity, description } = req.body;
       const {image} = req.files;

       if(!title || !description || !image || !quantity){
           return res.status(400).json({
               success: false,
               message: 'All fields are required'
           });
       }

    const supportedFile = ['png', 'jpeg', 'jpg'];
    const ext = image.name.split('.')[1];

    supportedFile.includes(ext) ? null : res.status(400).json({
        success: false,
        message: 'File not supported'
    });

    const fileName = `${Date.now()}.${ext}`;

    try {
        fs.renameSync(image.tempFilePath, path.join(__dirname, '..', 'assets', 'images', fileName));

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }

    console.log('uploaded file')

    let club =  await resourceModel.create ({  
        title,
        description,
        image: `http://127.0.0.1:${Port}/images/${fileName}`

    });

    console.log('club created');

    if (!club) {
        return res.status(400).json({
            success: false,
            message: 'Failed to upload club'
        });
    }
    res.status(201).json({
        success: true,
        message: 'Club uploaded successfully',
        data: club
    });

} catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}

const getResources = async (req, res) => {
    try {
        const resources = await resourceModel.find();
        res.status(200).json({
            success: true,
            data: resources
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateResource = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (req.files && req.files.image) {
            const { image } = req.files;
            // Handle image upload
            const supportedFile = ['png', 'jpeg', 'jpg'];
            const ext = image.name.split('.')[1];

            supportedFile.includes(ext) ? null : res.status(400).json({
                success: false,
                message: 'File not supported'
            });

            const fileName = `${Date.now()}.${ext}`;

            try {
                fs.renameSync(image.tempFilePath, path.join(__dirname, '..', 'assets', 'images', fileName));

            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: error.message
                });
            }

            updates.image = `http://127.0.0.1:${Port}/images/${fileName}`;
        }

        const resource = await resourceModel.findByIdAndUpdate(id, updates, { new: true });
        if (!resource) {
            return res.status(404).json({ success: false, message: 'Resource not found' });
        }
        res.status(200).json({ success: true, data: resource });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteResource = async (req, res) => {
    try {
        const { id } = req.params;
        const resource = await resourceModel.findByIdAndDelete(id);
        if (!resource) {
            return res.status(404).json({ success: false, message: 'Resource not found' });
        }
        res.status(200).json({ success: true, message: 'Resource deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createResource,
    getResources,
    updateResource,
    deleteResource
};