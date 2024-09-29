const express = require('express');
const router = express.Router();

router.get('/resources',(req,res)=>{
    res.render('resources')
})

router.get('/gallery',(req,res)=>{
    res.render('gallery')
})

module.exports= router;