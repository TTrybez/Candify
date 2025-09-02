const User = require('../models/user');
const database = require('../config/database');

class UserController {
  constructor() {
    this.userModel = new User(database.getConnection());
  }

  async createUser(req, res) {
    try {
      const { username, email, dateOfBirth } = req.body;
      
      // Validation
      if (!username || !email || !dateOfBirth) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const user = await this.userModel.create({ username, email, dateOfBirth });
      
      res.status(201).json({
        message: 'User added successfully',
        user
      });
      
    } catch (error) {
      if (error.message === 'Email already exists') {
        return res.status(400).json({ error: error.message });
      }
      
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await this.userModel.getAll();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new UserController();
