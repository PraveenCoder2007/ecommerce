module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      price: 99.99,
      image_url: 'https://via.placeholder.com/300x300?text=Headphones',
      stock: 50
    },
    {
      id: 2,
      name: 'Smartphone',
      description: 'Latest smartphone with advanced features',
      price: 699.99,
      image_url: 'https://via.placeholder.com/300x300?text=Smartphone',
      stock: 30
    },
    {
      id: 3,
      name: 'Laptop',
      description: 'Powerful laptop for work and gaming',
      price: 1299.99,
      image_url: 'https://via.placeholder.com/300x300?text=Laptop',
      stock: 20
    },
    {
      id: 4,
      name: 'Smart Watch',
      description: 'Fitness tracking smartwatch',
      price: 249.99,
      image_url: 'https://via.placeholder.com/300x300?text=Watch',
      stock: 40
    },
    {
      id: 5,
      name: 'Tablet',
      description: '10-inch tablet with high-resolution display',
      price: 399.99,
      image_url: 'https://via.placeholder.com/300x300?text=Tablet',
      stock: 25
    }
  ];

  return res.json(products);
};