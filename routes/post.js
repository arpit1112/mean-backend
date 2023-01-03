const express = require("express");


const checkAuth = require('../middleware/check-auth')
const extractFile = require('../middleware/file')

const PostController = require("../controllers/post")
const router = express.Router();

router.post('', checkAuth, extractFile, PostController.createPost)

router.get('', PostController.getPost);

router.get('/:id', PostController.getPostById)

router.put('/:id', checkAuth, extractFile, PostController.updatePost)

router.delete('/:id', checkAuth, PostController.deletePost)

module.exports = router;