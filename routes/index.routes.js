const { Router } = require('express');

const userRoutes = require('./users');
const auth = require('./auth')

const router = Router();

router.use('/api/users', userRoutes);
router.use('/api/auth', auth);

module.exports = router;