const router = require('express').Router();
const { Post } = require('../models');
const apiRoutes = require('./api'); 

router.use('/api', apiRoutes);

router.get('/', async(req, res) => {
    const posts = await Post.findAll({limit: 4})
        .then((posts) => posts.map((post) => post.dataValues));
    console.log(posts);
    res.render('home', {posts});
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

module.exports = router;