const { jwtDecode } = require('./authorization');

const verifyToken = async (req, resp, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return resp.status(401).json({
        message: 'Unauthorized token not found',
      });
    }
    const { user } = jwtDecode(token.replace('Bearer ', ''));
    if (!user) {
      return resp.status(401).json({
        message: 'Invalid Token',
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error)
    return resp.status(401).json({
      message: 'Unauthorized',
    });
  }
};

module.exports = { verifyToken };
