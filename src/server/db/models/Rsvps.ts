import { DataTypes } from "sequelize";
import { db } from "../database";
import Farms from "./Farms";
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
  farm_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Farms, key: "id" },
  },
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Events, key: "id" },
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: { model: Users, key: "id" },
  },
});

export default RSVP;
