/* eslint-disable no-nested-ternary */

const getData = (payload) => {
  const { data, rule } = payload;
  const { field } = rule;

  // 2b & 2d =====
  if (
    typeof data !== "object"
    && data.constructor !== Array
    && typeof data !== "string"
  ) {
    return {
      message: "data should be JSON object, array or string",
      status: "error",
      data: null,
    };
  }

  // 2g =====
  if (!data[field]) {
    return {
      message: `field ${field} is missing from data.`,
      status: "error",
      data: null,
    };
  }
  return "valid";
};

export default getData;
