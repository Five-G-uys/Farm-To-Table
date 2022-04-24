/* eslint-disable @typescript-eslint/no-var-requires */
//import * as Sequelize from "sequelize";
const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const { DB_PORT, RDS_URL, DB_NAME, DB_PASSWORD, DB_USERNAME } = process.env;
console.log("WHATA HECK", RDS_URL);

export const db = new Sequelize(
  `postgres://${DB_USERNAME}:${DB_PASSWORD}@${RDS_URL}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false,
  }
);

db.authenticate()
  .then(() => console.info("CONNECTED TO DATABASE"))
  .catch((err = "err") => console.warn("DB ERROR", err));
