const router = require('express').Router();
const { Post, User } = require('../../models');

router.get('/:id', async(req, res) => {
    const post = await Post.findOne({where: {id: req.params.id}, include: [User]});
    if(post === null) {
        return res.status(404).end();
    }

    return res.json(post);
});

router.post('/', async(req, res) => {
    try {
        const {content, title, category, image} = req.body;
        const post = await Post.create({content, user_id: req.session.user_id, title, category, image});
        const id = post.getDataValue('id');
        return res.json({post_id: id});
    } catch(err) {
        console.error(err);
        return res.status(500).json({message: 'Something went wrong!'});
    }
});

router.put('/:id', async(req, res) => {
    const post = await Post.findOne({where: {id: req.params.id}, include: [User]});
    if(post === null) {
        return res.status(404).end();
    }
    if (!req.session.logged_in) { // User is not logged in
        return res.status(404).end();
    }
    if (req.session.user_id !== post.dataValues.user_id) { // User is not logged in as the owner of the post
        return res.status(403).json({message: 'Not for you.'});
    }
    const {content, image, title, category} = req.body;
    await Post.update({content, image, title, category}, {where: {id: req.params.id}});
    res.json({success: true});
});

router.delete('/:id', async(req, res) => {
    const post = await Post.findOne({where: {id: req.params.id}, include: [User]});
    if(post === null) {
        return res.status(404).end();
    }
    if (!req.session.logged_in) { // User is not logged in
        return res.status(403).end();
    }
    if (req.session.user_id !== post.dataValues.user_id) { // User is not logged in as the owner of the post
        return res.status(403).json({message: 'Not for you.'});
    }
    await Post.destroy({where: {id: req.params.id}});
    res.json({success: true});
});

module.exports = router;