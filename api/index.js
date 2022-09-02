import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const { PORT } = process.env;
app.get('/', (req, res) => {
  res.send('Holiiiii');
});
app.listen(PORT, () => {
  console.log(`Server listeninig at ${PORT}`);
});
