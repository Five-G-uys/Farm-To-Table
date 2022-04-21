import { DataTypes } from "sequelize";
import { db } from "../database";
// import Farms from "./Farm";
//import { Farm } from "./Farm";

const DeliveryZone = db.define("delivery_zone", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: false
  },
  farm_id: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false,
    // references: { model: Farm, key: "id" }
  },
  zip_code: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false
  }
});

export default DeliveryZone;