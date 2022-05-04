import { DataTypes } from 'sequelize';
import { db } from '../database';
// import Farms from './Farms';
import Products from './Products';

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
  //   allowNull: false,
  //   references: { model: Farms, key: 'id' },
  // },
  problematic_products_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Products, key: 'id' },
  },
});

export default DietaryRestrictions;
