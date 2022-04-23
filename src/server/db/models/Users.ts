import { DataTypes } from 'sequelize';
import { db } from '../database';
import Farms from './Farms';
import Roles from './Roles';

const Users = db.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: false,
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
    unique: false,
    allowNull: false,
  },
  farm_id: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false,
    references: {
      model: Farms,
      key: 'id',
    },
  },
  role_id: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false,
    references: {
      model: Roles,
      key: 'id',
    },
  },
  delivery_zone: { type: DataTypes.STRING, unique: true, allowNull: false },
});

export default Users;
