/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */

const isJSON = (payload) => {
  try {
    const obj = JSON.parse(JSON.stringify(payload));
    if (obj && typeof obj === "object" && obj !== null) {
      return true;
    }
  } catch (err) {}
  return false;
};

const getRule = (payload) => {
  const { rule, data } = payload;

  // 2f
  if (!isJSON(payload)) {
    return {
      message: "Invalid JSON payload passed.",
      status: "error",
      data: null,
    };
  }

  // 2a ====
  if (!rule || !data) {
    return {
      message: `${!rule ? "rule" : "data"} is required.`,
      status: "error",
      data: null,
    };
  }

  // 2e ===
  if (rule.constructor === Array || typeof rule !== "object") {
    return {
      message: "rule should be an object.",
      status: "error",
      data: null,
    };
  }

  const { field, condition, condition_value } = rule;

  // 2d
  if (!field || !condition || !condition_value) {
    return {
      message: `rule ${
        !field ? "field" : !condition ? "condition" : "condition_value"
      } is required.`,
      status: "error",
      data: null,
    };
  }

  // 2d ====
  if (
    (typeof field !== "string"
    && typeof field !== "number")
    || (typeof condition_value !== "string"
    && typeof condition_value !== "number")
  ) {
    return {
      message: `${
        typeof field !== "string" && typeof field !== "number"
          ? "field value should be a string or number"
          : "condition value should be a string or number"
      }.`,
      status: "error",
      data: null,
    };
  }

  // 2b2 ====
  if (!["eq", "neq", "gt", "gte", "contains"].includes(condition)) {
    return {
      message: "Use an acceptable condition value.",
      status: "error",
      data: null,
    };
  }
  return "valid";
};

export default getRule;
