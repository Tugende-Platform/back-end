/* eslint-disable no-console */
import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import routes from './src/routes';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(routes);

mongoose.connect(process.env.DB_CONNECTION_URL)
  .then(() => {
    console.log('connected');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`app running on ${PORT}`);
});
