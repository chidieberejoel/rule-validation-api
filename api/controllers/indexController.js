import logger from "../config/winstonlog";

class GetIndex {
  static async index(req, res) {
    const userData = {
      name: "Chidiebere Joel",
      github: "@chidieberejoel",
      email: "chidiebereyjoel@gmail.com",
      mobile: "08168670324",
    };

    try {
      res.status(200).send({
        message: "My Rule-Validation API",
        status: "success",
        data: userData,
      });
      logger.info("GET '/' visited");
    } catch (err) {
      res.status(500).send(err);
      logger.warn(`Error: ${err}`);
    }
    return true;
  }
}

export default GetIndex;
