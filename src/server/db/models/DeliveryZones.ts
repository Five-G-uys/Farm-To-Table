// Import Dependencies
import { DataTypes } from 'sequelize';
import { db } from '../database';

// Define Model
const DeliveryZones = db.define('delivery_zones', {
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
  zip_codes: {
    type: DataTypes.STRING,
  },
});

export default DeliveryZones;
