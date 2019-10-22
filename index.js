/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRoutes from './src/routes/userRoutes';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/vi/users', userRoutes);

mongoose.connect(process.env.DB_CONNECTION_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
})
  .then(() => {
    console.log('connected');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`app running on ${PORT}`);
});
