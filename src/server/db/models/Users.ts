import { DataTypes } from 'sequelize';
import { db } from '../database';
import Farms from './Farms';
import Roles from './Roles';

const Users = db.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: false,
    allowNull: false,
    autoIncrement: true,
  },
  googleId:{
    type: DataTypes.STRING,
    unique: true,
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
  address: {
    type: DataTypes.STRING,
  },
  picture: {
    type: DataTypes.STRING,
  },
  subscribed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  farm_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Farms,
      key: 'id',
    },
    defaultValue: 1
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Roles,
      key: 'id',
    },
    defaultValue: 1
  },
  delivery_zone: { 
    type: DataTypes.STRING, 
    allowNull: true 
  },
}, {freezeTableName: true, tableName: 'user'});

export default Users;
