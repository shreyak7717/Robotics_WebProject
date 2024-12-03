const express = require('express');
const router = express.Router();
const path = require('path');
const {
    createResource,
    getResources,
    updateResource,
    deleteResource
} = require('../controllers/resourceController');
const {
    createTeamMember,
    getTeamMembers,
    updateTeamMember,
    deleteTeamMember
} = require('../controllers/teamController');
const resourceModel = require('../models/resourcesModel');
const teamModel = require('../models/teamModel');

router.get('/resources',(req,res)=>{
    res.render('resources')
})

router.get('/',(req,res)=>{
    res.render('signup')
})

router.get('/login',(req,res)=>{
    res.render('login')
})

router.get('/home',(req,res)=>{
    res.render('home')
})

router.get('/admin', async (req, res) => {
    try {
        const resources = await resourceModel.find();
        const teamMembers = await teamModel.find();
        res.render('admin', { resources, teamMembers });
    } catch (error) {
        res.status(500).send('Error loading admin panel');
    }
});

router.get('/contactUs',(req,res)=>{
    res.render('contactUs')
})

router.get('/gallery',(req,res)=>{
    res.render('gallery')
})

router.get ('/gallery1',(req,res)=>{
    res.render('gallery1')
})

router.get('/team',(req,res)=>{
    res.render('team')
})

router.get('/timeline',(req,res)=>{
    res.render('timeline')
})

router.get('/api/resources', getResources);
router.post('/createResource', createResource);
router.put('/api/resources/:id', updateResource);
router.delete('/api/resources/:id', deleteResource);

// Add GET endpoint for individual resource
router.get('/api/resources/:id', async (req, res) => {
    try {
        const resource = await resourceModel.findById(req.params.id);
        if (!resource) {
            return res.status(404).json({ success: false, message: 'Resource not found' });
        }
        res.status(200).json({ success: true, data: resource });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/api/team', getTeamMembers);
router.post('/createTeamMember', createTeamMember);
router.put('/api/team/:id', updateTeamMember);
router.delete('/api/team/:id', deleteTeamMember);

// Add GET endpoint for individual team member
router.get('/api/team/:id', async (req, res) => {
    try {
        const member = await teamModel.findById(req.params.id);
        if (!member) {
            return res.status(404).json({ success: false, message: 'Team member not found' });
        }
        res.status(200).json({ success: true, data: member });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/api/contact-data', (req, res) => {
    const dataPath = path.join(__dirname, '../data/data.json');
    res.sendFile(dataPath);
});

module.exports = router;

