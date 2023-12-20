const express = require('express');
const router = express.Router();
const DieuController = require('../Controllers/DieuController');
//const middlewareAuth = require('../middleware')

router.get('/dieus', DieuController.getAllGods);
router.get('/getGod/:id', DieuController.getGod);
router.post('/addGod', DieuController.ajouterDieu);
router.post('/delete/:id', DieuController.deleteDieu);

module.exports = router;