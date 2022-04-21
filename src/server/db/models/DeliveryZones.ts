import { DataTypes } from 'sequelize';
import { db } from '../database';
import Farms from './Farms';

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
    unique: false,
    allowNull: false,
  },
  farm_id: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false,
    references: { model: Farms, key: 'id' },
  },
  zip_code: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false,
  },
});

export default DeliveryZones;
