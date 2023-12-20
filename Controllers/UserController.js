const promisePool = require('../Database/database');
const { Sequelize, DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const Role = require('../models/Role')
const secretKey = process.env.API_KEY;

exports.getAllUsers = async (req, res) => {
    try {
      const user = await User.findAll();
      res.json(user);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs :', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  };

  exports.getUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      
      if (!user) {
        res.status(404).json({ error: 'Utilisateur non trouvé' });
      } else {
        res.json(user);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur :', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  };

exports.Register = async (req, res) => {
    const { pseudo, password } = req.body;
    try {
        const existingUser = await User.findOne({ where: { pseudo } });
  
      if (existingUser) {
        return res.status(400).json({ error: 'Cet utilisateur existe déjà !' });
      }
      const defaultRole = await Role.findOne({ where: { nom: 'role' }})
      const hashedPassword = await bcrypt.hash(password, 5);
  
      const newUser = await User.create({ pseudo, password: hashedPassword, is_super_admin: 0 });
  
      const token = jwt.sign({ pseudo }, process.env.API_KEY, { expiresIn: '24h' });
      res.json({ token });
    } catch (error) {
      console.error('Erreur lors de l\'inscription de l\'utilisateur :', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
};
  
exports.Login = async (req, res) => {
    const { pseudo, password } = req.body;
    try {
      const user = await User.findOne({ where: { pseudo } });
  
      if (!user) {
        return res.status(401).json({ error: "L'utilisateur n'existe pas." });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Mot de passe incorrect.' });
      }
  
      const token = jwt.sign({ pseudo }, process.env.API_KEY, { expiresIn: '24h' });
      res.json({ token });
    } catch (error) {
      console.error('Erreur lors de la tentative de connexion :', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
};
