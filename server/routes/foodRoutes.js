import express from 'express';
import FoodItem from '../models/FoodItem.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const items = await FoodItem.find();
  res.json(items);
});

export default router;
