# eCommerce Full-Stack Application

A complete eCommerce website built with HTML, CSS, vanilla JavaScript frontend and Node.js/Express backend with Turso SQLite database.

## Features

- 🛍️ Product catalog with search and filtering
- 🛒 Shopping cart with localStorage persistence
- 👤 User authentication (signup/login)
- 📱 Responsive design with modern UI
- 🔒 Secure password hashing
- 🗄️ Turso SQLite edge database
- 🚀 RESTful API endpoints

## Tech Stack

**Frontend:**
- HTML5
- CSS3 (with gradients and animations)
- Vanilla JavaScript

**Backend:**
- Node.js
- Express.js
- Turso SQLite Database
- bcryptjs (password hashing)
- JWT (authentication)

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Turso Database (Optional):**
   - Create a Turso account at https://turso.tech
   - Create a new database
   - Set environment variables:
     ```bash
     export TURSO_DATABASE_URL="your-database-url"
     export TURSO_AUTH_TOKEN="your-auth-token"
     ```
   - If not set, the app will use a local SQLite file

3. **Start the server:**
   ```bash
   npm start
   ```
   
   For development with auto-restart:
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Users
- `POST /api/users/signup` - Create new user account
- `POST /api/users/login` - User login

### Cart
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart/:id` - Remove item from cart
- `GET /api/cart` - Get cart items

## Project Structure

```
ecommerce_app/
├── backend/
│   ├── server.js              # Express server setup
│   ├── routes/
│   │   ├── products.js        # Product CRUD routes
│   │   ├── users.js           # Authentication routes
│   │   └── cart.js            # Cart management routes
│   └── db/
│       └── turso.js           # Database connection & setup
├── frontend/
│   ├── index.html             # Homepage with product list
│   ├── product.html           # Single product details
│   ├── cart.html              # Shopping cart page
│   ├── login.html             # Login/signup page
│   ├── style.css              # Responsive CSS with gradients
│   └── script.js              # Frontend JavaScript logic
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## Sample Data

The application comes with 5 sample products:
- Wireless Headphones ($99.99)
- Smartphone ($699.99)
- Laptop ($1299.99)
- Smart Watch ($249.99)
- Tablet ($399.99)

## Environment Variables

- `TURSO_DATABASE_URL` - Your Turso database URL
- `TURSO_AUTH_TOKEN` - Your Turso authentication token
- `JWT_SECRET` - Secret key for JWT tokens (defaults to 'your-secret-key')
- `PORT` - Server port (defaults to 3000)

## Development

The application uses:
- localStorage for cart persistence
- JWT tokens for authentication
- Responsive CSS Grid and Flexbox
- Modern ES6+ JavaScript features
- RESTful API design patterns

## Production Deployment

1. Set up your Turso database
2. Configure environment variables
3. Build and deploy to your preferred platform (Vercel, Netlify, etc.)

## License

MIT License - feel free to use this project as a starting point for your own eCommerce applications!