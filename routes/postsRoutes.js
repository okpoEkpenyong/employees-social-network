const express = require('express');
const router = express.Router();
const path = require('path');
const database = require('../controllers/postscontroller');
//const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

const uploader = require('../middleware/cloudinaryConfig').uploader;
const dataUri = require('../middleware/multer-config').dataUri;
const multerUploads = require('../middleware/multer-config').multerUploads;

  // posts route
router.get('/api/v1/feed', auth, database.getAllPosts)   //GET all Posts
router.patch('/api/v1/articles/:articleId',auth, database.EditArticle)  // UPDATE an article
router.delete('/api/v1/article/:articleId', auth, database.deleteArticles) // DELETE an article
router.get('/api/v1/Gifs/:gifId', auth, database.getGifs) // GET a gif
router.get('/api/v1/Gifs/:artcleId', auth, database.getArticle) // GET an artcle
router.delete('/api/v1/Gifs/:gifId', auth, database.deleteGifs) // DELETE a Gif
router.post('/api/v1/articles', auth, database.PostArticle) // POST or create an article
//router.post('/api/v1/Gifs', auth, multer, database.PostGifs) // POST or create a Gif

/**TODO: the post Gifs route will be placed in a controller */
router.post('/api/v1/Gifs', auth, multerUploads, (req, res) => {
  const file = req.file; 
  console.log('req.file :', file);
  if(req.file) {
     const file = dataUri(req).content;
      return uploader.upload(file).then((result) => {
        const image = result.url;
        return res.status(200).json({
          message: 'Image successfully uploaded to cloudinary!',
          data: {
            image
          }
        })
      }).catch((err) => res.status(400).json({
        messge: 'Upload failed, please retry!',
        data: {
          err
        }
      }))
     }
});


module.exports = router;