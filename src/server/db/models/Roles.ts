import { DataTypes } from 'sequelize';
import { db } from '../database';

const Roles = db.define('roles', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: false,
    allowNull: false,
    autoIncrement: true,
  },
  role: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: false,
  },
});

export default Roles;
