const logger = require("../config/winstonlog");
const config = require("../config");

class GetIndex {
  static async index(req, res) {
    const data = {
      name: "Chidiebere Joel",
      github: "@chidieberejoel",
      email: "chidiebereyjoel@gmail.com",
      mobile: config.mobile,
      twitter: "@joelc__",
    };

    try {
      res.status(200).send({
        message: "My Rule-Validation API",
        status: "success",
        data,
      });
      logger.info("GET '/' accessed");
    } catch (err) {
      res.status(500).send(err);
      logger.warn(`Error: ${err}`);
    }
    return true;
  }
}

module.exports = GetIndex;
