const express = require("express");
const index = require("../controllers/indexController");
const validator = require("../controllers/validatorController");

const getRoutes = () => {
  const router = new express.Router();
  router.use(express.json());

  // GET "/"
  router.get("/", index.index);

  // POST "/validate-rule"
  router.post("/validate-rule", validator.validatorApi);

  return router;
};

module.exports = getRoutes;
