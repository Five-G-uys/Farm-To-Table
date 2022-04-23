import { DataTypes } from 'sequelize';
import { db } from '../database';
import Farms from './Farms';
import Events from './Events';
import Users from './Users';

const RSVP = db.define('rsvp', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  farm_id: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false,
    references: { model: Farms, key: 'id' },
  },
  event_id: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
    references: { model: Events, key: 'id' },
  },
  user_id: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false,
    references: { model: Users, key: 'id' },
  },
});

export default RSVP;
