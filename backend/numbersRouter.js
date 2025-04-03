const express = require("express");

const ctrl = require("./numbersController.js");
const numbersRouter = express.Router();
numbersRouter.get("/", ctrl.getNumber);

numbersRouter.patch("/", ctrl.updateNmber);

module.exports = numbersRouter;
