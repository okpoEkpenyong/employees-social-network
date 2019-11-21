const express = require('express');
const router = express.Router();

const database = require('../controllers/postsController');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');


  // posts route
router.get('/api/v1/feed', auth, database.getAllPosts)   //GET all Posts
router.patch('/api/v1/articles/:articleId',auth, database.EditArticle)  // UPDATE an article
router.delete('/api/v1/article/:articleId', auth, database.deleteArticles) // DELETE an article
router.get('/api/v1/Gifs/:gifId', auth, database.getGifs) // GET a gif
router.get('/api/v1/Gifs/:artcleId', auth, database.getArticle) // GET an artcle
router.delete('/api/v1/Gifs/:gifId', auth, database.deleteGifs) // DELETE a Gif
router.post('/api/v1/articles', auth, database.PostArticle) // POST or create an article
router.post('/api/v1/Gifs', auth, multer, database.PostGifs) // POST or create a Gif


module.exports = router;