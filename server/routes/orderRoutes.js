import express from 'express';
import { placeOrder, getMyOrders, deleteOrder } from '../controllers/orderController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, placeOrder);
router.get('/my-orders', verifyToken, getMyOrders);
router.delete('/:id', verifyToken, deleteOrder);

export default router;
