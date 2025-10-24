module.exports = async (req, res) => {
  res.json({
    hasUrl: !!process.env.TURSO_DATABASE_URL,
    hasToken: !!process.env.TURSO_AUTH_TOKEN,
    hasJWT: !!process.env.JWT_SECRET,
    url: process.env.TURSO_DATABASE_URL ? 'Set' : 'Not set',
    token: process.env.TURSO_AUTH_TOKEN ? 'Set' : 'Not set'
  });
};