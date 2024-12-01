const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    description :{
        type:String,
    },
    
    image:{
        type: String,
    }
});

const expresourceSchema = mongoose.model('resource', resourceSchema);

module.exports = expresourceSchema;