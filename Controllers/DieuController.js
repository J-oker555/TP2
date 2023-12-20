const Dieu = require('../models/dieuModel');
const { Sequelize, DataTypes } = require('sequelize');
const promisePool = require('../Database/database');


exports.getAllGods = async (req, res) => {
    try {
      const dieu = await Dieu.findAll();
      res.json(dieu);
    } catch (error) {
      console.error('Erreur lors de la récupération des dieus :', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
};

exports.getGod = async (req, res) => {
    try {
      const { id } = req.params;
      const dieu = await Dieu.findByPk(id);
      
      if (!dieu) {
        res.status(404).json({ error: 'dieu non trouvé' });
      } else {
        res.json(dieu);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération  :', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  };

exports.ajouterDieu = async (req, res) =>{
    console.log(req.body)
    let mondieu = req.body
    try{
        const newDieu = await Dieu.create({ nom: mondieu.nom, description: mondieu.description});
        res.status(200).json({"auto-generated ID + nom: ":newDieu.id + " " + newDieu.nom});
    }
    catch(err){
        console.error('Erreur lors de l/ajout  :', err);
        res.status(500).json({ error: 'Erreur serveur lors de l/ajout .' });
    }
}

exports.updateDieu = async (req, res) => {
    const { id } = req.params; 
    const updatedDieu = req.body;

    try {
        await Dieu.update(updatedDieu, {
            where: { id: id }
        });
    } catch (err) {
        console.error('Erreur lors de la mise à jour du :', err);
        res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du .' });
    }
};

exports.deleteDieu = async (req, res) => {
    const { id } = req.params; 

    try {
        await Dieu.destroy({
            where: { id: id }
        });
    } catch (err) {
        console.error('Erreur lors de la suppression :', err);
        res.status(500).json({ error: 'Erreur serveur lors de la suppression .' });
    }
};