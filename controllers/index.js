const router = require('express').Router();
const { Post, User } = require('../models');
const apiRoutes = require('./api'); 
const postRoutes = require('./post'); 

router.use('/api', apiRoutes);
router.use('/posts', postRoutes);

router.get('/', async(req, res) => {
    const posts = await Post.findAll({limit: 4, include: [User]})
        .then((posts) => posts.map((post) => post.dataValues));
    res.render('home', {posts, logged_in: req.session.logged_in});
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard', {logged_in: req.session.logged_in});
});

router.get('/explore', (req, res) => {
    res.render('explore', {logged_in: req.session.logged_in});
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;