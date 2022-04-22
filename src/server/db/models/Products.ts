import { DataTypes } from 'sequelize';
import { db } from '../database';
import Farms from './Farms';
// import Vendors from './Vendors';

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
    unique: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: false,
  },
  vendor_id: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false,
    // references: { model: Vendors, key: 'id' },
  },
  quantity: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false,
  },
  tier: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false,
  },
  img_url: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: false,
  },
  available: {
    type: DataTypes.BOOLEAN,
    unique: false,
    allowNull: false,
  },
  add_ons: {
    type: DataTypes.BOOLEAN,
    unique: false,
    allowNull: false,
  },
  farm_id: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false,
    references: { model: Farms, key: 'id' },
  },
  created_at: {
    type: DataTypes.DATE,
    unique: false,
    allowNull: false,
  },
});

export default Products;
