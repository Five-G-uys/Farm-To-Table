// import Farms from './Farms';
import { DataTypes } from "sequelize";
import { db } from "../database";
// import Farms from "./Farms";

// Create Model
const RSVP = db.define("rsvp", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
});

// Export Model
export default RSVP;
