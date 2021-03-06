const router = require('express').Router();
const { Comment, User, Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Post,
          attributes: ['title']
        }
      ]
    }
  )
  .then(dbCommentData => res.json(dbCommentData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.post('/', withAuth, (req, res) => {
  if(req.session) {
    Comment.create({
      post_id: req.body.post_id,
      comment_text: req.body.comment_text,
      // use the session user_id
      user_id: req.session.user_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
  }
});

router.delete('/:id', withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCommentData => {
    if(!dbCommentData) {
      res.status(404).json({ message: 'Comment not found!'});
      return;
    }
    res.json(dbCommentData);
  })
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  })
});

module.exports = router;