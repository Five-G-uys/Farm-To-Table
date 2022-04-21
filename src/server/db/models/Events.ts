import { DataTypes } from 'sequelize';
import { db } from '../database';
import Farms from './Farms';

const Events = db.define('events', {
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
    unique: true,
    allowNull: false,
    references: { model: Farms, key: 'id' },
  },
});

export default Events;
