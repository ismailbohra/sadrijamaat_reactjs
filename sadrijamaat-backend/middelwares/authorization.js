const jwt = require("jsonwebtoken");
const JWT_EXPIRY = process.env.JWT_EXPIRY;
const JWT_SECRET_CODE = process.env.JWT_SECRET;

const jwtEncode = (user) => {
  return jwt.sign({user}, JWT_SECRET_CODE, {
    expiresIn: JWT_EXPIRY,
  });
};

const jwtDecode = (token) => {
  return jwt.verify(token, JWT_SECRET_CODE);
};

module.exports = {
  jwtEncode,
  jwtDecode,
};
