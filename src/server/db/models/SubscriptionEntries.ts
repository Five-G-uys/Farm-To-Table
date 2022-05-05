import { db } from '../database';
import { DataTypes } from 'sequelize';
// import Farms from './Farms';
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
});

export default SubscriptionEntries;
