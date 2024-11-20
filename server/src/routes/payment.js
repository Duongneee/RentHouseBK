
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Route để tạo URL thanh toán VNPay
router.post('/create_payment_url', paymentController.createPaymentUrl);
// Return thanh toán VNPay
router.get('/return_payment', paymentController.handlePaymentReturn);


module.exports = router;
