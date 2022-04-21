import { DataTypes } from 'sequelize';
import { db } from '../database';
import Farms from './Farms';

const Roles = db.define('roles', {
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
  farm_id: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
    references: { model: Farms, key: 'id' },
  },
});

Roles.sync().then(() => console.log("LINE 29 Roles.ts || worked"));

export default Roles;
