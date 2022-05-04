import { DataTypes } from 'sequelize';
import Subscriptions from './Subscriptions';
import { db } from '../database';
// import Farms from './Farms';
import Vendors from './Vendors';

const Products = db.define(
  'products',
  {
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
    // quantity: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    img_url: {
      type: DataTypes.STRING,
      defaultValue:
        'http://res.cloudinary.com/ddg1jsejq/image/upload/v1651189122/dpzvzkarpu8vjpwjsabd.jpg',
    },
    // available: {
    //   type: DataTypes.BOOLEAN,
    //   allowNull: false,
    // },
    // farm_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: { model: Farms, key: 'id' },
    // },
    plant_date: {
      type: DataTypes.STRING,
    },
    harvest_date: {
      type: DataTypes.STRING,
    },
    // subscription_id: {
    //   // foreign key to season/subscription id
    //   // can only add to active subscription
    //   // need to have dropdown with active or upcoming seasons/subscriptions mapped as options
    //   // this way active AND inactive products will be retrieved separately

    //   // NEED TO FORMAT SEASONAL DATES IN CREATE SUBSCRIPTION FORM SO I CAN USE THEM TO SORT PRODUCTS
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    //   references: { model: Subscriptions, key: 'id' },
    // },
  },
  { initialAutoIncrement: 7 }
);

export default Products;
