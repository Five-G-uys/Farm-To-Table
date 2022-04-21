<<<<<<< HEAD
// // eslint-disable-next-line @typescript-eslint/no-var-requires
import { DataTypes } from "sequelize";
import { db } from "../database";
//console.log("LINE FOUR Roles", db);
import Farms from "./Farms";
const Roles = db.define("roles", {
=======
import { DataTypes } from 'sequelize';
import { db } from '../database';
import Farms from './Farms';

const Roles = db.define('roles', {
>>>>>>> e665d827cad5b6529a6fb024ce635e33b3d87181
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
<<<<<<< HEAD

=======
>>>>>>> e665d827cad5b6529a6fb024ce635e33b3d87181
  farm_id: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
<<<<<<< HEAD
    references: { model: Farms, key: "id" },
=======
    references: { model: Farms, key: 'id' },
>>>>>>> e665d827cad5b6529a6fb024ce635e33b3d87181
  },
});

Roles.sync().then(() => console.log("LINE 29 Roles.ts || worked"));

export default Roles;
