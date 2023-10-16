const jwt = require("jsonwebtoken");
const config = require("../config");

const generateToken = (user) => {
  const payload = {
    _id: user._id,
    phoneNumber: user.phoneNumber,
    firstName: user.firstName,
    lastName: user.lastName,
    image: user.image,
  };
  const secret = config.JWT_SECRET;
  const options = {
    expiresIn: config.JWT_EXPIRES_IN,
  };
  return jwt.sign(payload, secret, options);
};

module.exports = generateToken;
