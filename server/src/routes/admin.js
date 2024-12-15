import express from 'express';
import verifyToken from '../middlewares/verifyToken'
import verifyAdmin from '../middlewares/verifyAdmin'

const router = express.Router();

router.get('/admin/dashboard', verifyToken, verifyAdmin, (req, res) => {
    res.status(200).json({
        err: 0,
        msg: 'Welcome to Admin Dashboard!',
        user: req.user
    });
});

export default router;
