import express from 'express';
import routes from './src/routes';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(routes);

app.listen(PORT, () => console.log(`app running on ${PORT}`));
