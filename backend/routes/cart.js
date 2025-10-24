const express = require('express');
const router = express.Router();

// Since we're using localStorage for cart, these routes are for future enhancement
// For now, they return mock responses

// POST /api/cart - Add item to cart
router.post('/', (req, res) => {
  const { productId, quantity = 1 } = req.body;
  
  if (!productId) {
    return res.status(400).json({ error: 'Product ID is required' });
  }

  res.json({
    message: 'Item added to cart',
    item: { productId, quantity }
  });
});

// DELETE /api/cart/:id - Remove item from cart
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  res.json({
    message: 'Item removed from cart',
    removedItemId: id
  });
});

// GET /api/cart - Get cart items (for future use)
router.get('/', (req, res) => {
  res.json({
    message: 'Cart items retrieved',
    items: []
  });
});

module.exports = router;