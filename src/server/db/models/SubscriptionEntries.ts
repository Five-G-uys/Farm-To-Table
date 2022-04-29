import { db } from '../database';
import { DataTypes } from 'sequelize';
import Farms from './Farms';
import Users from './Users';
import Subscriptions from './Subscriptions';

const SubscriptionEntries = db.define('subscription_entries', {
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
  user_id: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false,
    references: { model: Users, key: 'id' },
  },
  subscription_id: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false,
    references: { model: Subscriptions, key: 'id' },
  },
});

export default SubscriptionEntries;
