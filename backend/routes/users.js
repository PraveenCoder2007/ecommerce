const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { client } = require('../db/turso');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// POST /api/users/signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user exists
    const existingUser = await client.execute({
      sql: 'SELECT id FROM users WHERE email = ?',
      args: [email]
    });

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await client.execute({
      sql: 'INSERT INTO users (name, email, password) VALUES (?, ?, ?) RETURNING id, name, email',
      args: [name, email, hashedPassword]
    });

    const user = result.rows[0];
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'User created successfully',
      user: { id: user.id, name: user.name, email: user.email },
      token
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// POST /api/users/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const result = await client.execute({
      sql: 'SELECT * FROM users WHERE email = ?',
      args: [email]
    });

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Login successful',
      user: { id: user.id, name: user.name, email: user.email },
      token
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
});

module.exports = router;