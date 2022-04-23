import { DataTypes } from 'sequelize';
import { db } from '../database';
// import Farms from './Farms';
import Products from './Products';
import Users from './Users';

const DietaryRestrictions = db.define('dietary_restrictions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
  // farm_id: {
  //   type: DataTypes.INTEGER,
  //   unique: false,
  //   allowNull: false,
  //   references: { model: Farms, key: 'id' },
  // },
  product_id: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false,
    references: { model: Products, key: 'id' },
  },
  user_id: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false,
    references: { model: Users, key: 'id' },
  },
  created_at: {
    type: DataTypes.DATE,
    unique: false,
    allowNull: false,
  },
});

export default DietaryRestrictions;
