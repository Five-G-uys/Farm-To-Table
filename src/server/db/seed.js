/* eslint-disable no-undef */
import { db } from './database.ts';
import { DataTypes } from 'sequelize';
import postgres from 'postgres';

const Farms = db.define('Farms', {
  farm_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowAutoIncrement: false,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
});

const seedSequelize = () => {
  postgres
    .connect({ user: 'root', password: '12345678' })
    .then((db) =>
      db
        .query('CREATE DATABASE IF NOT EXISTS `farm-to-table`')
        .then(() => db.end())
    )
    .catch((err) => console.error('error', err))
    .then(() =>
      console.log(
        '\x1b[33m',
        "\nDatabase (Postgres): 'farm-to-table' successfully created!"
      )
    )
    .then(() => Farms.sync());
};

seedSequelize();
