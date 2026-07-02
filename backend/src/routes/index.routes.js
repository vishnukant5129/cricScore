import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Scalable backend connected 🚀' });
});

export default router;