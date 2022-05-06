import { db } from '../database';
import { DataTypes } from 'sequelize';
// import Farms from './Farms';
import Users from './Users';
import Subscriptions from './Subscriptions';

const SubscriptionEntries = db.define('subscriptionEntries', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
  streetAddress: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.STRING,
  },
  zip: {
    type: DataTypes.STRING,
  },
  lat: {
    type: DataTypes.STRING,
  },
  lon: {
    type: DataTypes.STRING,
  },
  subscriptionId: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false,
    references: { model: Subscriptions, key: 'id' },
  },
  userId: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false,
    references: { model: Users, key: 'id' },
  },
});

export default SubscriptionEntries;
