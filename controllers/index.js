const router = require('express').Router();
const apiRoutes = require('./api'); 
const postRoutes = require('./post');

router.use('/api', apiRoutes);
router.use('/post', postRoutes);


router.get('/', (req, res) => {
    res.render('home');
});

module.exports = router;