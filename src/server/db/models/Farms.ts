import { DataTypes } from "sequelize";
import { db } from "../database";
const Farms = db.define("farm", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
});

Farms.sync().then(() => console.log("Farm.ts is working!"));

export default Farms;
