import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json('routes are set fine');
});

export default router;
