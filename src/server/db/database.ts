/* eslint-disable @typescript-eslint/no-var-requires */
const { Sequelize } = require("sequelize");
require("dotenv").config();
const { DB_PORT, RDS_URL, DB_NAME, DB_PASSWORD, DB_USERNAME } = process.env;
//import { DATE } from "sequelize/types";
import User from "./models/User";
import Roles from "./models/Roles";

export const db = new Sequelize(
  `postgres://${DB_USERNAME}:${DB_PASSWORD}@${RDS_URL}:${DB_PORT}/${DB_NAME}`
); // Example for postgres
console.log("LINE 12", db);
db.authenticate()
  .then(() => console.info("CONNECTED TO DATABASE"))
  .catch((err = "err") => console.warn("DB ERROR", err));

//////*******Register a model and seed database***********////////

const eraseDatabaseOnSync = true;

db.sync({ force: true })
  .then(async () => {
    if (eraseDatabaseOnSync) {
      await User.create({
        name: "Dummy",
        address: "123 Sesame Street",
        subscribed: true,
        role_id: "subscriber",
        delivery_zone: "New Orleans",
        farm_id: 12,
      });
      await Roles.create({
        role: "subscriber",
        //farm_id: 12,
      });
    }
  });
