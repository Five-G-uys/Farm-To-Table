import { DataTypes } from 'sequelize';
import { db } from '../database';
import Farms from './Farms';

const Subscriptions = db.define('subscriptions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
  season: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tier: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  payment_option: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  farm_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Farms, key: 'id' },
  },
});

export default Subscriptions;
