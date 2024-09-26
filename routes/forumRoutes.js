const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');


router.post('/posts', forumController.createPost);


router.get('/posts', forumController.getPosts);

module.exports = router;
