import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
const { dbName, User, Password, host, MODE, dialect } = process.env;

const sequelize =
  // dialect === 'mysql'
  //   ?
  new Sequelize(dbName, User, Password, {
    host,
    dialect,
    logging: false,
    native: false,
    // pool: {
    //   max: 5,
    //   idle: 30000,
    //   acquire: 60000,
    // },

    dialectOptions:
      MODE === 'production'
        ? {
            ssl: {
              require: MODE === 'production' ? true : false,
              rejectUnauthorized: false,
            },
          }
        : false,
  });

export default sequelize;
// const sequelize = new Sequelize(/* ... */, {
//   // ...
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// });
