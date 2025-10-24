const { createClient } = require('@libsql/client');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const client = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });

    // Create table if not exists
    await client.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        image_url TEXT,
        stock INTEGER DEFAULT 0
      )
    `);

    // Check if products exist, if not insert sample data
    const countResult = await client.execute('SELECT COUNT(*) as count FROM products');
    if (countResult.rows[0].count === 0) {
      await client.execute(`
        INSERT INTO products (name, description, price, image_url, stock) VALUES
        ('Wireless Headphones', 'High-quality wireless headphones', 99.99, 'https://via.placeholder.com/300x300?text=Headphones', 50),
        ('Smartphone', 'Latest smartphone with advanced features', 699.99, 'https://via.placeholder.com/300x300?text=Smartphone', 30),
        ('Laptop', 'Powerful laptop for work and gaming', 1299.99, 'https://via.placeholder.com/300x300?text=Laptop', 20)
      `);
    }

    const result = await client.execute('SELECT * FROM products');
    return res.json(result.rows);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Failed to fetch products', details: error.message });
  }
};