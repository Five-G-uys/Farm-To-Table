import { DataTypes } from 'sequelize';
import { db } from '../database';
import SubscriptionEntries from './SubscriptionEntries';

const Orders = db.define('orders', {
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
  subscriptionEntryId: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false,
    references: { model: SubscriptionEntries, key: 'id' },
  },
  delivery_date: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: false,
  },
  paid: { type: DataTypes.BOOLEAN },
});

export default Orders;
