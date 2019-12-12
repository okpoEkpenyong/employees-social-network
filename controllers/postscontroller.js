const pool = require('./config');

/** 
  * 1: POST route
  * create an article: POST/articles
  */
 const PostArticle = (req, res) => {
   
    const data = {
      articleId : req.body.aid,
      title : req.body.title,
      body : req.body.body,
      author : req.body.author,
      createdon : req.body.createdon,
          
    }
   
    pool.connect((err, client, done) => {
      const query = 'INSERT INTO posts(aid, title, body, author, createdon) VALUES($1,$2,$3,$4,$5) RETURNING *';
      const values = [data.articleId, data.title, data.body, data.author, data.createdon];
      
      client.query(query, values, (error, result) => {
        done();

       if (error) {
        return res.status(400).send({ error: error}); }
        res.status(201).send({status: 'success', message: `Article successfully posted” `, data: result.rows[0],
        });
      });
    });
   };


/**
 * 2: POST route
 * create a gif: POST/gifs
 */
///api/v1/Gifs

const PostGifs = (req, res) => {
  const file = req.file; 
  console.log('req.file :', file);
  const data = {
    title : req.body.post.title,
    imageURL : req.body.imageURL,
    author : req.body.post.author,
    createdon : req.body.post.createdon,
        
  }
 
  pool.connect((err, client, done) => {
    const query = 'INSERT INTO posts(title, imageURL, author, createdon) VALUES($1,$2,$3,$4) RETURNING *';
    const values = [data.title, data.imageURL, data.author, data.createdon];
    
    client.query(query, values, (error, result) => {
      done();

     if (error) {
      return res.status(400).send({error: error});
    }
      res.status(201).send({status: 'success', message: `Gif Image successfully posted! `, data: result.rows[0],
      });
    });
  });
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

  pool.query('SELECT * FROM posts ORDER BY aid DESC ', (error, results) => {
    if (error) {
      return res.status(400).send({
        error: error
      });
    }
    res.status(200).send({
      status: 'success',
      message: 'All posts data retrieved',
      data: results.rows,
    });
  })
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
   // commentOnGif,           // employees can comment on their colleagues' gif posts: POST/gifs/gifId/comment
    //commentOnArticle,       // employees can comment on their colleagues' articles post: POST/articles/articleId/comment
    deleteGifs, 
    deleteArticles, 
    EditArticle,
    PostGifs, 
    PostArticle 
    
  };