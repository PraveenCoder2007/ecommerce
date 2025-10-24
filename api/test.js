module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({ 
    message: 'API is working!',
    env: {
      hasUrl: !!process.env.TURSO_DATABASE_URL,
      hasToken: !!process.env.TURSO_AUTH_TOKEN,
      hasJWT: !!process.env.JWT_SECRET
    }
  });
};