const router = require('express').Router();
const { Post } = require('../../models');

router.get('/:id', async(req, res) => {
    const post = await Post.findOne({where: {id: req.params.id}});
    if(post === null) {
        return res.status(404).end();
    }
await Post.update({count: post.dataValues.count+1}, {where: {id: req.params.id}});
return res.render('postpage', post.dataValues);
});

module.exports = router;