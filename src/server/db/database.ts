/* eslint-disable camelcase */
/*eslint global-require: "error"*/
/* eslint-disable @typescript-eslint/no-var-requires */

const { Sequelize, Model, DataTypes } = require('sequelize');
require('dotenv').config();

const db = new Sequelize('postgres://root:12345678@farm-to-table.cruztemxiwjt.us-east-2.rds.amazonaws.com:5432/farm-to-table/test') // Example for postgres

db.authenticate()
  .then(() => console.info('CONNECTED TO DATABASE'))
  .catch((err = 'err') => console.warn('DB ERROR', err));

  module.exports = { db }

