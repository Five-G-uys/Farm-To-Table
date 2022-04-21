import { DataTypes } from "sequelize";
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { db } from "../database";
//console.log("LINE FOUR", db);
import Roles from "./Roles";
import Farms from "./Farms";

const User = db.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  subscribed: {
    type: DataTypes.BOOLEAN,
    unique: true,
    allowNull: false,
  },
  role_id: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
    references: {
      model: Roles,
      key: "id",
    },
  },
  delivery_zone: { type: DataTypes.STRING, unique: true, allowNull: false },
  farm_id: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
    references: {
      model: Farms,
      key: "id",
    },
  },
});

User.sync().then(() => {
  console.log("LINE 53 USer.ts || worked");
});

export default User;
// module.exports = {
//   User,
// };
