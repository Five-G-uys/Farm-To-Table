// Import Dependencies
import { DataTypes } from 'sequelize';
import { db } from '../database';
import Roles from './Roles';

// Define Model
const Users = db.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: false,
      allowNull: false,
      autoIncrement: true,
    },
    googleId: {
      type: DataTypes.STRING,
      // unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
      // allowNull: false,
    },
    dietaryRestriction: {
      type: DataTypes.STRING,
      unique: true,
      // allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
    },
    // subscribed: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false,
    // },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Roles,
        key: 'id',
      },
      defaultValue: 1,
    },
  },
  { freezeTableName: true, tableName: 'user' },
);

// Export Model
export default Users;
