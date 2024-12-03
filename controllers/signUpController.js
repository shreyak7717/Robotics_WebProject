const User = require('../models/signUpModel');

const signUp = async (req, res) => {
    console.log('Request Body:', req.body); 
    try {
        const { name, email, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).send('Passwords do not match');
        }
        const user = new User({ name, email, password }); 
        await user.save();
        res.redirect('/login');
    } catch (error) {
        res.status(500).send('Error signing up' + error);
    }
};

module.exports = { signUp };
