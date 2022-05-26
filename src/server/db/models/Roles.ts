// Import Dependencies
import { DataTypes } from 'sequelize';
import { db } from '../database';

// Define Model
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
    allowNull: false,
  },
});

// Export Model
export default Roles;
