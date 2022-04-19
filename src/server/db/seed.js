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

// const seedSequelize = () => {
//   postgres
//   .createConnection({ user: "root", password: "" })
//   .then((db) =>
//     db.query("CREATE DATABASE IF NOT EXISTS `Farm2Table`").then(() => db.end())
//   )
//   .catch(err => console.log(22, 'error', err))
//   .then(() =>
//     console.log(
//       "\x1b[33m",
//       "\nDatabase (Postgres): 'Farm2Table' successfully created!"
//     )
//   )
//   .then(() => Farms.sync())
// }

// seedSequelize();

// console.log('did it work????????')
