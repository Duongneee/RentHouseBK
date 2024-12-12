import express from 'express'
import verifyToken from '../middlewares/verifyToken.js'
const router = express.Router();
const paymentController = require('../controllers/paymentController');


// Route để tạo URL thanh toán VNPay
router.post('/create_payment_url', paymentController.createPaymentUrl);
// Return thanh toán VNPay
router.get('/payment-return', paymentController.handlePaymentReturn);

// Lịch sử nạp tiền
router.get('/payment-history',verifyToken ,paymentController.handlePaymentList);

router.get('/history-payment',verifyToken ,paymentController.handlePaymentHistoryList);


module.exports = router;
export default paymentRouter