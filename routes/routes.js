const express = require('express');
const router = express.Router();
const path = require('path');
const { createResource, getResources } = require('../controllers/resourceController');
const { createTeamMember, getTeamMembers } = require('../controllers/teamController');

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

router.get('/admin',(req,res)=>{
    res.render('admin')
})

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

router.get('/api/team', getTeamMembers);

router.get('/api/contact-data', (req, res) => {
    const dataPath = path.join(__dirname, '../data/data.json');
    res.sendFile(dataPath);
});

router.post('/createResource', createResource);
router.post('/createTeamMember', createTeamMember);

module.exports = router;

