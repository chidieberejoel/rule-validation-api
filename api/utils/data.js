/* eslint-disable no-nested-ternary */

const getData = (payload) => {
  const { data, rule } = payload;
  const { field } = rule;

  const err = {
    status: "error",
    data: null,
  };

  // 2c & 2e - Check data field type
  if (
    typeof data !== "object"
    && data.constructor !== Array
    && typeof data !== "string"
  ) {
    return {
      ...{ message: "data should be JSON object, array or string." },
      ...err,
    };
  }

  // 2g - Check for missing field in rule object
  if (!data[field]) {
    return {
      ...{ message: `field ${field} is missing from data.` },
      ...err,
    };
  }
  return "valid";
};

export default getData;
