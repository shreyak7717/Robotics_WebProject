const User = require('../models/signUpModel');
// const bcrypt = require('bcrypt');

const login = async (req, res) => {
    console.log('Login Request Body:', req.body); // Add this line to log incoming data
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password }); // Simple comparison
        if (!user) {
            return res.status(400).send('Invalid email or password');
        }
        res.redirect('/home');
    } catch (error) {
        res.status(500).send('Error logging in');
    }
};

module.exports = { login };