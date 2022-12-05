const router = require('express').Router();
const { Comment, User } = require('../../models');

router.get('/:id', async(req, res) => {
    const comment = await Comment.findOne({where: {id: req.params.id}, include: [User]});
    if(comment === null) {
        return res.status(404).end();
    }
    if (!req.session.logged_in) { // User is not logged in
        return res.status(403).end();
    }
    if (req.session.user_id !== comment.dataValues.user_id) { // User is not logged in as the owner of the comment
        return res.status(403).json({message: 'Not for you.'});
    }
    return res.json(comment);
});

router.post('/', async(req, res) => {
    try {
        const {content, postId} = req.body;
        const comment = await Comment.create({content, user_id: req.session.user_id, post_id: postId});
        const id = comment.getDataValue('id');
        return res.json({comment_id: id});
    } catch(err) {
        console.error(err);
        return res.status(500).json({message: 'Something went wrong!'});
    }
});

router.put('/:id', async(req, res) => {
    const comment = await Comment.findOne({where: {id: req.params.id}, include: [User]});
    if(comment === null) {
        return res.status(404).end();
    }
    if (!req.session.logged_in) { // User is not logged in
        return res.status(404).end();
    }
    if (req.session.user_id !== comment.dataValues.user_id) { // User is not logged in as the owner of the comment
        return res.status(403).json({message: 'Not for you.'});
    }
    const {content} = req.body;
    await Comment.update({content}, {where: {id: req.params.id}});
    res.json({success: true});
});

router.delete('/:id', async(req, res) => {
    const comment = await Comment.findOne({where: {id: req.params.id}, include: [User]});
    if(comment === null) {
        return res.status(404).end();
    }
    if (!req.session.logged_in) { // User is not logged in
        return res.status(403).end();
    }
    if (req.session.user_id !== comment.dataValues.user_id) { // User is not logged in as the owner of the comment
        return res.status(403).json({message: 'Not for you.'});
    }
    await Comment.destroy({where: {id: req.params.id}});
    res.json({success: true});
});

module.exports = router;