import { DataTypes } from "sequelize";
import { db } from "../database";
// import Products from "./Products";
// import Farms from "./Farm";
//import { Farm } from "./Farm";

const DietaryRestrictions = db.define("dietary_restrictions", {
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
  product_id: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false,
    // references: { model: Products, key: "id" }
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

export default DietaryRestrictions;