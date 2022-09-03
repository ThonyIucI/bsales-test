import dotenv from 'dotenv';

import app from './src/app.js';
import sequelize from './src/db.js';
dotenv.config();

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
const { PORT, dialect } = process.env;

// dialect === 'mysql'?false:true
// sequelize.sync({ force: false }).then(() => {
app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});
// });
