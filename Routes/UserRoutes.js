const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController');
//const middlewareAuth = require('../middleware')

router.get('/users', userController.getAllUsers);
router.get('/user/:id', userController.getUser);
router.post('/register', userController.Register);
router.post('/login', userController.Login);

module.exports = router;