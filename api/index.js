import "@babel/polyfill";
import express from "express";
import loader from "./loaders";

const app = express();

// Initialize app with dependencies and error handlers
loader.init(app);

export default app;
