import { DataTypes } from 'sequelize';
import { db } from '../database';
import Farms from './Farms';
import Vendors from './Vendors';

const Products = db.define('products', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vendor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Vendors, key: 'id' },
  },
  quantity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img_url: {
    type: DataTypes.STRING,
  },
  available: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  farm_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Farms, key: 'id' },
  },
});

export default Products;
