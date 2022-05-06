// Import Dependencies
import { DataTypes } from 'sequelize';
import { db } from '../database';
import Products from './Products';

// Define Model
const DietaryRestrictions = db.define('dietary_restrictions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  product_to_exclude1: {
    type: DataTypes.INTEGER,
    references: { model: Products, key: 'id' },
  },
  product_to_exclude2: {
    type: DataTypes.INTEGER,
    references: { model: Products, key: 'id' },
  },
  product_to_exclude3: {
    type: DataTypes.INTEGER,
    references: { model: Products, key: 'id' },
  },
  product_to_exclude4: {
    type: DataTypes.INTEGER,
    references: { model: Products, key: 'id' },
  },
});

// Export Model
export default DietaryRestrictions;
