const promisePool = require('../Database/database');
const { Sequelize, DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const Role = require('../models/Role')
const secretKey = process.env.API_KEY;


exports.createUtilisateur = async (req, res) => {
  
  try {
    const { pseudo, password } = req.body;
    //Utilisateur_role.sync({force:true})
    // Vérifier si le pseudo existe déjà
    const existingUser = await User.findOne({ where: { pseudo } });
  
    if (existingUser) {
      return res.status(400).json({ error: 'Ce pseudo existe déjà.' });
    }
  
    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Récupérer le rôle par défaut 'peon'
    const defaultRole = await Role.findOne({ where: { nom: 'role' } });
  
    // Créer l'utilisateur avec le mot de passe hashé et le rôle par défaut
    const nouvelUtilisateur = await User.create({
      pseudo,
      password: hashedPassword,
      is_super_admin: false,
    });
    console.log(defaultRole)
    // Associer l'utilisateur au rôle par défaut en utilisant la table intermédiaire utilisateur_role
    if (nouvelUtilisateur) {
      await nouvelUtilisateur.addRole(defaultRole, { through: 'User_role' });
      console.log("Utilisateur associé au rôle par défaut avec succès");
      res.status(201).json({ message: 'Utilisateur créé avec succès', user: nouvelUtilisateur.toJSON() });
    } else {
      console.error("La création de l'utilisateur a échoué :", nouvelUtilisateur);
      res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" });
    }
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" });
  }
  
  },


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
