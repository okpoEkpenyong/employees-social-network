
CREATE TABLE posts (
  gid SERIAL PRIMARY KEY,
  aId INT UNIQUE,
  title VARCHAR(255) UNIQUE,
  body VARCHAR,
  imageURL VARCHAR(255),
  author VARCHAR(255) UNIQUE NOT NULL,
  createdOn TIMESTAMP
);

CREATE TABLE comments ( 
  cid SERIAL PRIMARY KEY,
  comment VARCHAR(255),
  author VARCHAR (255),
  gifId INT,
  articleId INT,
  createdOn TIMESTAMP
);

CREATE TABLE employee (
  eid SERIAL PRIMARY KEY,
  firstname VARCHAR(255) UNIQUE NOT NULL,
  lastname  VARCHAR(35),
  email VARCHAR(135) UNIQUE NOT NULL,		
  password VARCHAR(255) NOT NULL,
  gender VARCHAR(25),
  jobRole VARCHAR(255),
  department VARCHAR(255),
  address VARCHAR(255),
  createdOn TIMESTAMP
);

INSERT INTO employee(firstname,lastname,email,password,gender,jobrole,department,address,createdon)VALUES('ubong','emma','ubong.emma@example.com','ubongemma12','male','designer','UIX','12 akan lane','2019-01-04');
INSERT INTO posts(aid,title,body,author,createdon)VALUES(5,'About Cats','cats are pets','ubong','2012-02-01');
