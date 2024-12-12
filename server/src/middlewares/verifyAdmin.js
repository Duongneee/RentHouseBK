const verifyAdmin = (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({
            err: 1,
            msg: 'Access denied. Admins only.'
        });
    }
    next(); // Nếu là admin, cho phép tiếp tục
};

export default verifyAdmin;
