/* eslint-disable camelcase */

const getConditions = (payload) => {
  const { data, rule } = payload;
  const { condition, condition_value } = rule;

  const fieldValue = data[rule.field];

  // Conditions for validating the rule
  const eq = condition === "eq" && fieldValue == condition_value;
  const neq = condition === "neq" && fieldValue < condition_value;
  const gt = condition === "gt" && fieldValue > condition_value;
  const gte = condition === "gte" && fieldValue >= condition_value;
  const contains = condition === "contains" && fieldValue.includes(condition_value);

  if (eq || neq || gt || gte || contains) {
    return "valid";
  }
  return "failed";
};

export default getConditions;
