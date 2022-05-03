import { DataTypes } from 'sequelize';
// import { SubscriptionEntries } from '.';
import { db } from '../database';
import Farms from './Farms';
// import Users from './Users';

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
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  flat_price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  weekly_price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(10000),
    allowNull: false,
  },
  start_date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  farm_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: Farms, key: 'id' },
  },
 // thumbnail: { type: DataTypes.STRING, unique: false },
});
// Subscriptions.hasMany(SubscriptionEntries, {
//   as: 'subscription_entries',
//   foreignKey: 'subscription_id',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
// });

// SubscriptionEntries.belongsTo(Subscriptions, {
//   foreignKey: 'subscription_id',
// });



export default Subscriptions;
