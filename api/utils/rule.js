/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */

// Check for request body as a valid JSON payload
const isJSON = (payload) => {
  try {
    const obj = JSON.parse(JSON.stringify(payload));
    if (obj && typeof obj === "object" && obj !== null) {
      return true;
    }
  } catch (err) {
    return false;
  }
  return false;
};

const getRule = (payload) => {
  const { rule, data } = payload;

  const err = {
    status: "error",
    data: null,
  };

  // 2f - Check for invalid JSON payload
  if (!isJSON(payload)) {
    return {
      ...{ message: "Invalid JSON payload passed." },
      ...err,
    };
  }

  // 2a - Check for required rule and data fields
  if (!rule || !data) {
    return {
      ...{ message: `${!rule ? "rule" : "data"} is required.` },
      ...err,
    };
  }

  // 2b & 2e - Check rule field type
  if (rule.constructor === Array || typeof rule !== "object") {
    return {
      ...{ message: "rule should be an object." },
      ...err,
    };
  }

  const { field, condition, condition_value } = rule;

  // 2b & 2d - Check required fields in rules object
  if (!field || !condition || !condition_value) {
    return {
      ...{
        message: `rule ${
          !field ? "field" : !condition ? "condition" : "condition_value"
        } is required.`,
      },
      ...err,
    };
  }

  // Check for data type of required rule fields
  if (
    (typeof field !== "string" && typeof field !== "number")
    || (typeof condition_value !== "string" && typeof condition_value !== "number")
  ) {
    return {
      ...{
        message: `${
          typeof field !== "string" && typeof field !== "number"
            ? "field value should be a string or number"
            : "condition value should be a string or number"
        }.`,
      },
      ...err,
    };
  }

  // 2b2 - Check for accepted condition values
  if (!["eq", "neq", "gt", "gte", "contains"].includes(condition)) {
    return {
      ...{ message: "Use an acceptable condition value." },
      ...err,
    };
  }
  return "valid";
};

module.exports = getRule;
