const express = require('express');
const router = express.Router();
const { placeOrder, getMyOrders } = require('../controllers/orderController');
const { verifyToken } = require('../middleware/verifyToken');

router.post('/', verifyToken, placeOrder);
router.get('/my-orders', verifyToken, getMyOrders);

module.exports = router;
