const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/post', postRoutes);
// comment line 9 back in once code is in file 
router.use('/comment', commentRoutes);

module.exports = router;
