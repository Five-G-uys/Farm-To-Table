import { DataTypes } from 'sequelize';
import { db } from '../database';
// import Farms from './Farms';
import Roles from './Roles';
import DeliveryZones from './DeliveryZones';

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
    street_address: {
      type: DataTypes.STRING,
    },
    city_address: {
      type: DataTypes.STRING,
    },
    state_address: {
      type: DataTypes.STRING,
    },
    zip_code: {
      type: DataTypes.STRING,
    },
    lat: {
      type: DataTypes.STRING,
    },
    lon: {
      type: DataTypes.STRING,
    },
    picture: {
      type: DataTypes.STRING,
    },
    // subscribed: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false,
    // },
    // role_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: Roles,
    //     key: 'id',
    //   },
    //   defaultValue: 1,
    // },
  },
  { freezeTableName: true, tableName: 'user' }
);

export default Users;
