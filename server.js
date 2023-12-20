const cors = require('cors');
const fs = require('fs');
const express = require('express');
const mariadb = require('mariadb');
const bodyParser = require('body-parser');
//const techroute = require('./Routes/TechnoRoutes');
//const commentaireRoute = require('./Routes/CommentaireRoutes');
const userroute = require('./Routes/UserRoutes');
const dotenv = require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/', userroute);


const port = 3000;

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});