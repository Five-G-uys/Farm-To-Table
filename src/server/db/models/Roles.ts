import { DataTypes } from 'sequelize';
import { db } from '../database';

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
    // unique: true,
    allowNull: false,
  },
});

export default Roles;
