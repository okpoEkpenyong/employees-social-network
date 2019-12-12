const { pool } = require('./config');

/** 
  * 1: POST route
  * create an article: POST/articles
  * const {artcleId,title,body,author,createdon 
  */

const PostArticle = async (req, res) => {
  const { articleId, title, body, author, createdon } = req.body

  try {
    const client = await pool.connect()
    const result = await client.query({
      postArticleQuery: 'INSERT INTO posts(aid, title, body, author, createdon) VALUES($1,$2,$3,$4,$5) RETURNING *',
      postArticleValues: [articleId, title, body, author, createdon]
    })
    await client.end()
    res.status(201).send({ status: 'success', message: `Article successfully posted! `, data: result.rows, });
  } catch (error) {
    res.status(400).json({ error: error.detail })

  }
}



/**
 * 2: POST route
 * create a gif: POST/gifs
 */

const PostGifs = async (req, res) => {
  const { title, imageURL, author, createdon } = req.body
  try {
    const client = await pool.connect()
    const result = await client.query({
      PostGifsQuery: 'INSERT INTO posts(title, imageURL, author, createdon) VALUES($1,$2,$3,$4) RETURNING *',
      PostGifsValues: [title, imageURL, author, createdon]
    })
    await client.end()
    res.status(201).send({status:success,message: `Gif Image successfully posted! `, data: result.rows,})
 
  } catch (err) { res.status(400).json({error:err.detail})

  };

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