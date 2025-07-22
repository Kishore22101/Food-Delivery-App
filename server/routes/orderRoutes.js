const express = require('express');
const router = express.Router();
const { placeOrder, getUserOrders, deleteOrder } = require('../controllers/orderController');
const verifyToken = require('../middleware/authMiddleware');

// Routes calling Controller
router.post('/', verifyToken, placeOrder);
router.get('/', verifyToken, getUserOrders);
router.delete('/:id', verifyToken, deleteOrder);

module.exports = router;