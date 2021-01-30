import logger from "../config/winstonlog";
import ruleValidator from "../utils/rule";
import conditionValidator from "../utils/condition";
import dataValidator from "../utils/data";

class PostValidatorApi {
  static async validatorApi(req, res) {
    const { body } = req;
    const { rule, data } = body;

    try {
      const getRule = ruleValidator(body);
      if (getRule !== "valid") {
        return res.status(400).send(getRule);
      }
      const getData = dataValidator(body);
      if (getData !== "valid") {
        return res.status(400).send(getData);
      }

      const getCondition = conditionValidator(body);
      const validation = {
        field: `${rule.field}`,
        field_value: `${data[rule.field]}`,
        condition: `${rule.condition}`,
        condition_value: `${rule.condition_value}`,
      };

      if (getCondition === "valid") {
        const err = { error: false };
        return res.status(200).send({
          message: `field ${rule.field} successfully validated.`,
          status: "success",
          data: { ...err, ...validation },
        });
      }

      const err = { error: true };
      return res.status(400).send({
        message: `field ${rule.field} failed validation.`,
        status: "error",
        data: { ...err, ...validation },
      });
    } catch (err) {
      res.status(500).send({ err });
      logger.warn(`Error: ${err}`);
    }
    return true;
  }
}

export default PostValidatorApi;
