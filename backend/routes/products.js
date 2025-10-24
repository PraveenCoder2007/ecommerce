const express = require('express');
const { client } = require('../db/turso');
const router = express.Router();

// GET /api/products - Get all products
router.get('/', async (req, res) => {
  try {
    const result = await client.execute('SELECT * FROM products ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/:id - Get single product
router.get('/:id', async (req, res) => {
  try {
    const result = await client.execute({
      sql: 'SELECT * FROM products WHERE id = ?',
      args: [req.params.id]
    });
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

module.exports = router;