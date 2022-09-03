import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/api.js';
// const cors = require('cors');

const __filename = fileURLToPath(import.meta.url);
// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(morgan('dev'));
// app.use(express.static(path.join(__dirname, '../..', 'client', 'build')));

// app.use(cors('*'));

app.use('/api', routes);
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../..', 'client', 'build', 'index.html'));
// });

// app.disable('etag');
export default app;
