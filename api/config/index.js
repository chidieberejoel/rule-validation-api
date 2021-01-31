const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  mobile: process.env.MOBILE,
};
