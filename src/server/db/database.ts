/* eslint-disable @typescript-eslint/no-var-requires */
const { Sequelize } = require("sequelize");
require("dotenv").config();
const { DB_PORT, RDS_URL, DB_NAME, DB_PASSWORD, DB_USERNAME } = process.env;

export const db = new Sequelize(
  `postgres://${DB_USERNAME}:${DB_PASSWORD}@${RDS_URL}:${DB_PORT}/${DB_NAME}`
); // Example for postgres
console.log("LINE 12", db);
db.authenticate()
  .then(() => console.info("CONNECTED TO DATABASE"))
  .catch((err = "err") => console.warn("DB ERROR", err));

//sync all models to the database
// db.sync({ force: true });
