const router = require('express').Router();
const { Post } = require('../models');
const apiRoutes = require('./api'); 

router.use('/api', apiRoutes);

router.get('/', async(req, res) => {
    const posts = await Post.findAll({limit: 4})
        .then((posts) => posts.map((post) => post.dataValues));
    console.log(posts);
    res.render('home', {posts, logged_in: req.session.logged_in});
});

router.get('/dashboard', (req, res) => {
    console.log(req);
    res.render('dashboard');
});

router.get('/signup', (req, res) => {
    console.log(req);
    res.render('signup');
});

router.get('/login', (req, res) => {
    console.log(req);
    res.render('login');
});

router.get('/explore', (req, res) => {
    console.log(req);
    res.render('explore');
});

module.exports = router;