// // eslint-disable-next-line @typescript-eslint/no-var-requires
import { DataTypes } from "sequelize";
import { db } from "../database";
console.log("LINE FOUR Roles", db);
//import { Farm } from "./Farm";
const Roles = db.define("roles", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
  role: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },

  //   farm_id: {
  //     type: DataTypes.INTEGER,
  //     unique: true,
  //     allowNull: false,
  //     references: { model: Farm, key: "id" },
  //   },
});

export default Roles;
// console.log("LINE 27", Roles);
