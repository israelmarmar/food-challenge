import { Sequelize } from "sequelize";

const config = require("./config.js");

export const database = new Sequelize(config);