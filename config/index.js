require("dotenv").config();

const config = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
};

for (let key in config) {
  if (config[key] === undefined) {
    throw new Error(`Environment variable ${key} is missing`);
  }
}

module.exports = config;
