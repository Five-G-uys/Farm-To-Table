/* eslint-disable @typescript-eslint/no-var-requires */

const { DB_PORT, RDS_URL, DB_NAME, DB_PASSWORD, DB_USERNAME } = process.env
const { Sequelize, Model, DataTypes } = require('sequelize');
require('dotenv').config();

const db = new Sequelize(`postgres://${DB_USERNAME}:${DB_PASSWORD}@${RDS_URL}:${DB_PORT}/${DB_NAME}`) // Example for postgres

db.authenticate()
  .then(() => console.info('CONNECTED TO DATABASE'))
  .catch((err = 'err') => console.warn('DB ERROR', err));

  module.exports = { db }

