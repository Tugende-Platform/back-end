import express from 'express';
import SampleModel from '../models/sampleModel';

const router = express.Router();

router.get('/', (req, res) => {
  const sample = new SampleModel({
    username: 'sampleuser',
    password: 'samplepassword',
  });
  sample
    .save()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
});

export default router;
