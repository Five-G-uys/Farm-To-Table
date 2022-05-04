import { DataTypes } from "sequelize";
import { db } from "../database";
// import Farms from "./Farms";
import Events from "./Events";
import Users from "./Users";

//

const RSVP = db.define("rsvp", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
});

export default RSVP;
