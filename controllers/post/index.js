const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

router.get('/:id', async(req, res) => {
    const post = await Post.findByPk(req.params.id, {include: [User]});
    if(post === null) {
        return res.status(404).end();
    }
    await Post.update({count: post.dataValues.count+1}, {where: {id: req.params.id}});
    return res.render('postpage', post.dataValues);
});

module.exports = router;