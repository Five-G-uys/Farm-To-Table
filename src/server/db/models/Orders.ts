import { DataTypes } from "sequelize";
import { db } from "../database";
// import Farms from "./Farm";
//import { Farm } from "./Farm";

const Orders = db.define("orders", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false,
    // references: { model: User, key: "id" }
  },
  subscription_id: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false,
    // references: { model: Subscriptions, key: "id" }
  },
  deliver_date: {
    type: DataTypes.DATE,
    unique: false,
    allowNull: false
  },
  farm_id: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false,
    // references: { model: Farm, key: "id" }
  },
  created_at: {
    type: DataTypes.DATE,
    unique: false,
    allowNull: false
  }
});

export default Orders;