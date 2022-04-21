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

export default Roles;
