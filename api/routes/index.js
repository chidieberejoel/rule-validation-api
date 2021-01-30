import express from "express";
import index from "../controllers/indexController";
import validator from "../controllers/validatorController";

const getRoutes = () => {
  const router = new express.Router();
  router.use(express.json());

  // GET "/"
  router.get("/", index.index);

  // POST "/validate-rule"
  router.post("/validate-rule", validator.validatorApi);

  return router;
};

export default getRoutes;
