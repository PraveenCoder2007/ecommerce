const { createClient } = require('@libsql/client');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    const client = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });

    // Create users table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create products table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        image_url TEXT,
        stock INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert sample products
    await client.execute(`
      INSERT OR IGNORE INTO products (id, name, description, price, image_url, stock) VALUES
      (1, 'Wireless Headphones', 'High-quality wireless headphones with noise cancellation', 99.99, 'https://via.placeholder.com/300x300?text=Headphones', 50),
      (2, 'Smartphone', 'Latest smartphone with advanced features', 699.99, 'https://via.placeholder.com/300x300?text=Smartphone', 30),
      (3, 'Laptop', 'Powerful laptop for work and gaming', 1299.99, 'https://via.placeholder.com/300x300?text=Laptop', 20),
      (4, 'Smart Watch', 'Fitness tracking smartwatch', 249.99, 'https://via.placeholder.com/300x300?text=Watch', 40),
      (5, 'Tablet', '10-inch tablet with high-resolution display', 399.99, 'https://via.placeholder.com/300x300?text=Tablet', 25)
    `);

    res.json({ message: 'Database initialized successfully!' });
  } catch (error) {
    console.error('Init Error:', error);
    res.status(500).json({ error: 'Failed to initialize database', details: error.message });
  }
};