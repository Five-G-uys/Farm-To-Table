import { DataTypes } from 'sequelize';
import { db } from '../database';

const Farms = db.define('farms', {
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
    unique: false,
    allowNull: true, //for now.
  },
});

export default Farms;
