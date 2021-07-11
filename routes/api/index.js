const router = require('express').Router();
// const commentRoutes = require('./comment-routes');
const userRoutes = require('./users');

// router.use('/comments', commentRoutes);
router.use('/users', userRoutes);

module.exports = router;
