import { DataTypes } from 'sequelize';
import { db } from '../database';
import Products from './Products';
import Orders from './Orders';

const OrderContents = db.define('orderContents', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
  productId: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false,
    references: { model: Products, key: 'id' },
  },
  orderId: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false,
    references: { model: Orders, key: 'id' },
  },
});

export default OrderContents;
