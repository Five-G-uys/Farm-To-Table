import { DataTypes } from 'sequelize';
import { db } from '../database';
import Farms from './Farms';
import Subscriptions from './Subscriptions';

const Orders = db.define('orders', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
  farm_id: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false,
    references: { model: Farms, key: 'id' },
  },
  subscription_id: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false,
    references: { model: Subscriptions, key: 'id' },
  },
  deliver_date: {
    type: DataTypes.DATE,
    unique: false,
    allowNull: false,
  },
});

export default Orders;
