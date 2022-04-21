/* eslint-disable @typescript-eslint/no-var-requires */
const { Sequelize } = require('sequelize');
require('dotenv').config();
const { DB_PORT, RDS_URL, DB_NAME, DB_PASSWORD, DB_USERNAME } = process.env;

export const db = new Sequelize(
  `postgres://${DB_USERNAME}:${DB_PASSWORD}@${RDS_URL}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false,
  }
); // Example for postgres
db.authenticate()
<<<<<<< HEAD
  .then(() => console.info("CONNECTED TO DATABASE"))
  .catch((err = "err") => console.warn("DB ERROR", err));

//sync all models to the database
// db.sync({ force: true });
=======
  .then(() => console.info('CONNECTED TO DATABASE'))
  .catch((err = 'err') => console.warn('DB ERROR', err));
>>>>>>> e665d827cad5b6529a6fb024ce635e33b3d87181
