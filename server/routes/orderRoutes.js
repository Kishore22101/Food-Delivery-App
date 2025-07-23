import express from 'express';
import { placeOrder, getMyOrders } from '../controllers/orderController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, placeOrder);
router.get('/my-orders', verifyToken, getMyOrders);

export default router;
