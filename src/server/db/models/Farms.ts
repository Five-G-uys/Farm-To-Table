<<<<<<< HEAD
import { DataTypes } from "sequelize";
import { db } from "../database";
const Farms = db.define("farm", {
=======
import { DataTypes } from 'sequelize';
import { db } from '../database';

const Farms = db.define('farms', {
>>>>>>> e665d827cad5b6529a6fb024ce635e33b3d87181
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
<<<<<<< HEAD
});

Farms.sync().then(() => console.log("Farm.ts is working!"));

=======
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: true, //for now.
  },
});

>>>>>>> e665d827cad5b6529a6fb024ce635e33b3d87181
export default Farms;
