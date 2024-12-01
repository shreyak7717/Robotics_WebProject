const express = require('express');
const router = express.Router();
const createResource = require('../controllers/resourceController');

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

router.post('/createResource',createResource)

module.exports= router;

