const express = require('express');
const router = express.Router();
const { signUp } = require('../controllers/signUpController');
const { login } = require('../controllers/loginController');

router.post('/signup', signUp);
router.post('/login', login);

module.exports = router;