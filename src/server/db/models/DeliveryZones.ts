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
    allowNull: false,
  },
  zip_codes: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  farm_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Farms, key: 'id' },
  },
});

export default DeliveryZones;
