const express = require('express');
const router = express.Router();

router.get('/resources',(req,res)=>{
    res.render('resources')
})


router.get('/',(req,res)=>{
    res.render('home')
})

router.get('/login',(req,res)=>{
    res.render('login')
})

router.get('/signUp',(req,res)=>{
    res.render('signUp')
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

router.get('/gallery1',(req,res)=>{
    res.render('gallery1')
})
module.exports= router;