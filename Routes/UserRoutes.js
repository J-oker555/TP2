const express = require('express');
const router = express.Router();
const app = express();
const userController = require('../Controllers/UserController');
//const middlewareAuth = require('../middleware')

router.get('/users', userController.getAllUsers);
router.get('/user/:id', userController.getUser);
router.post('/login', userController.Login);
router.post('/create', userController.createUtilisateur);

module.exports = router;