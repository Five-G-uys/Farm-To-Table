// Import Dependencies
import { DataTypes } from "sequelize";
import { db } from "../database";

const Events = db.define("events", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
  eventName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  thumbnail: { type: DataTypes.STRING, unique: false, allowNull: false },
  // farm_id: {
  //   type: DataTypes.INTEGER,
  //   unique: true,
  //   allowNull: true,
  //   references: { model: Farms, key: "id" },
  // },
  eventDate: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  eventType: { type: DataTypes.STRING, allowNull: false },
  // seasonTitle: { type: DataTypes.STRING, allowNull: false },
  // monthTitle: { type: DataTypes.STRING, allowNull: false },
});

export default Events;
