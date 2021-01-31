const express = require("express");
const loader = require("./loaders");

const app = express();

// Initialize app with dependencies and error handlers
loader.init(app);

module.exports = app;
