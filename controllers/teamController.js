const teamModel = require('../models/teamModel');
const path = require('path');
const fs = require('fs');
const Port = 3001;

const createTeamMember = async (req, res) => {
    try {
        const { name, role } = req.body;
        const { teamImage } = req.files;

        if (!name || !role || !teamImage) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const supportedFile = ['png', 'jpeg', 'jpg'];
        const ext = teamImage.name.split('.').pop();

        if (!supportedFile.includes(ext)) {
            return res.status(400).json({
                success: false,
                message: 'File type not supported'
            });
        }

        const fileName = `${Date.now()}.${ext}`;

        try {
            fs.renameSync(teamImage.tempFilePath, path.join(__dirname, '..', 'assets', 'images', fileName));
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        let teamMember = await teamModel.create({
            name,
            role,
            image: `http://127.0.0.1:${Port}/images/${fileName}`
        });

        if (!teamMember) {
            return res.status(400).json({
                success: false,
                message: 'Failed to add team member'
            });
        }

        res.status(201).json({
            success: true,
            message: 'Team member added successfully',
            data: teamMember
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getTeamMembers = async (req, res) => {
    try {
        const teamMembers = await teamModel.find();
        res.status(200).json({
            success: true,
            data: teamMembers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateTeamMember = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (req.files && req.files.teamImage) {
            const { teamImage } = req.files;
            // Handle image upload
            const supportedFile = ['png', 'jpeg', 'jpg'];
            const ext = teamImage.name.split('.').pop();

            if (!supportedFile.includes(ext)) {
                return res.status(400).json({
                    success: false,
                    message: 'File type not supported'
                });
            }

            const fileName = `${Date.now()}.${ext}`;

            try {
                fs.renameSync(teamImage.tempFilePath, path.join(__dirname, '..', 'assets', 'images', fileName));
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                });
            }

            updates.image = `http://127.0.0.1:${Port}/images/${fileName}`;
        }

        const member = await teamModel.findByIdAndUpdate(id, updates, { new: true });
        if (!member) {
            return res.status(404).json({ success: false, message: 'Team member not found' });
        }
        res.status(200).json({ success: true, data: member });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteTeamMember = async (req, res) => {
    try {
        const { id } = req.params;
        const member = await teamModel.findByIdAndDelete(id);
        if (!member) {
            return res.status(404).json({ success: false, message: 'Team member not found' });
        }
        res.status(200).json({ success: true, message: 'Team member deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createTeamMember,
    getTeamMembers,
    updateTeamMember,
    deleteTeamMember
};
