const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    role: {
        type: String,
    },
    image: {
        type: String,
    }
});

const expteamSchema = mongoose.model('team', teamSchema);

module.exports = expteamSchema;
