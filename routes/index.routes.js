const { Router } = require('express');

const userRoutes = require('./users');
const authRoutes = require('./auth');
const categoryRoutes = require('./category');

const router = Router();

router.use('/api/users', userRoutes);
router.use('/api/auth', authRoutes);
router.use('/api/category', categoryRoutes);

module.exports = router;
