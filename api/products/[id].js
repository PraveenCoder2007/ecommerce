const { client, initDB } = require('../../backend/db/turso');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await initDB();
    
    if (req.method === 'GET') {
      const { id } = req.query;
      const result = await client.execute({
        sql: 'SELECT * FROM products WHERE id = ?',
        args: [id]
      });
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      return res.json(result.rows[0]);
    }
    
    res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};