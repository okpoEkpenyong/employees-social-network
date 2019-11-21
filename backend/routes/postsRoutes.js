const express = require('express');
const router = express.Router();

const database = require('../controllers/postsController');
//const auth = require('../middleware/auth');


  // posts route
router.get('/api/v1/feed', database.getAllPosts)   //GET all Posts
router.patch('/api/v1/articles/:articleId', database.EditArticle)  // UPDATE an article
router.delete('/api/v1/article/:articleId', database.deleteArticles) // DELETE an article
router.get('/api/v1/Gifs/:gifId',   database.getGifs) // GET a gif
router.get('/api/v1/Gifs/:artcleId',   database.getArticle) // GET an artcle
router.delete('/api/v1/Gifs/:gifId', database.deleteGifs) // DELETE a Gif
router.post('/api/v1/articles', database.PostArticle) // POST or create an article
router.post('/api/v1/Gifs', database.PostGifs) // POST or create a Gif


module.exports = router;