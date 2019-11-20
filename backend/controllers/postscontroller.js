const pool = require('./config');
const {Pool} = require('pg');
 
 
 /** 
  * 1: POST route
  * create an article: POST/articles
  */
 const PostArticle = (req, res) => {
   
    const data = {
      articleId : req.body.aid,
      title : req.body.title,
      body : req.body.body,
      imageURL : req.body.imageURL,
      userId : req.body.userId,
      author : req.body.author,
      createdon : req.body.createdon,
          
    }
   
    pool.connect((err, client, done) => {
      const query = 'INSERT INTO Post(aid, title, body, imageURL, userId, author, createdon) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *';
      const values = [data.articleId, data.title, data.body, data.imageURL, data.userId, data.author, data.createdon];
      
      client.query(query, values, (error, result) => {
        done();
       // let result = result.rows[0];
        if (error) {
         throw error
        }
        res.status(201).send({
          status: 'Successful',
          message: `New Post inserted `,
          data: result.rows[0],
        });
      });
    });
   };


/**
 * 2: POST route
 * create a gif: POST/gifs
 */
const PostGifs = (req, res) => {

};

/**
 * 3: PUT route
 * edit an article: PATCH/articles/:artcleId
 */
const EditArticle = (req, res) => {

};

/**
 * 4: DELETE route
 * employee can delete their articles: DELETE/articles/:articleId
 */
const deleteArticles = (req, res) => {

};

/** 
 * 5: DELETE route
 * employees can delete their gifs
 */
const deleteGifs = (req, res) => {

};

/** 
 * 6: GET route
 * employees can view all articles/gifs, with recent ones coming first: GET/feed
 */
const getAllPosts = (req, res) => {

};

/** 
 * 7: GET route
 * employees can view a specific article: GET /articles/<:articleId>
*/
const getArticle = (req, res) => {

};

/** 
 * 8: GET route
 * employees can view a specific article: GET /articles/<:articleId>
*/
const getGifs = (req, res) => {

};

   module.exports = {
    getGifs, 
    getArticle, 
    getAllPosts, 
    commentOnGif,           // employees can comment on their colleagues' gif posts: POST/gifs/gifId/comment
    commentOnArticle,       // employees can comment on their colleagues' articles post: POST/articles/articleId/comment
    deleteGifs, 
    deleteArticles, 
    EditArticle,
    PostGifs, 
    PostArticle 
    
  };