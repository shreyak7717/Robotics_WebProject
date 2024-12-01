const User = require('../models/signUpModel');
// const bcrypt = require('bcrypt');

const signUp = async (req, res) => {
    console.log('Request Body:', req.body); // Add this line to log incoming data
    try {
        const { name, email, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).send('Passwords do not match');
        }
        // const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password }); // Store password directly
        await user.save();
        res.redirect('/login');
    } catch (error) {
        res.status(500).send('Error signing up' + error);
    }
};

module.exports = { signUp };
