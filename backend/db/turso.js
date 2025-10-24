const { createClient } = require('@libsql/client');

// Replace with your Turso database URL and auth token
const client = createClient({
  url: process.env.TURSO_DATABASE_URL || 'file:local.db',
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// Initialize database tables
async function initDB() {
  try {
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

    // Insert sample products if table is empty
    const result = await client.execute('SELECT COUNT(*) as count FROM products');
    if (result.rows[0].count === 0) {
      await client.execute(`
        INSERT INTO products (name, description, price, image_url, stock) VALUES
        ('Wireless Headphones', 'High-quality wireless headphones with noise cancellation', 99.99, 'https://via.placeholder.com/300x300?text=Headphones', 50),
        ('Smartphone', 'Latest smartphone with advanced features', 699.99, 'https://via.placeholder.com/300x300?text=Smartphone', 30),
        ('Laptop', 'Powerful laptop for work and gaming', 1299.99, 'https://via.placeholder.com/300x300?text=Laptop', 20),
        ('Smart Watch', 'Fitness tracking smartwatch', 249.99, 'https://via.placeholder.com/300x300?text=Watch', 40),
        ('Tablet', '10-inch tablet with high-resolution display', 399.99, 'https://via.placeholder.com/300x300?text=Tablet', 25)
      `);
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

module.exports = { client, initDB };