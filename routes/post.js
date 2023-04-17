const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')


router.route('/')
    .get(postController.showAllPosts)
    .post(postController.createNewPost)
    .delete(postController.deletePost)
    .put(postController.updatePost)

router.route('/:id')
    .get(postController.getPost);

module.exports = router;