const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// app.use((request, response, next) => {
//   console.log('First Middleware');
//   // When next function is called the next app.use function is continued (Comment out and check)
//   next();
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((request, response, next) => {
  // response headers are getting set
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH, OPTIONS");
  next();
});

app.post("/api/posts", (request, response, next) => {
  const post = request.body;

  console.log(post);

  response.status(201).json({
    message: 'Post added successfully',
    post: post
  });
});


app.get("/api/posts", (request, response, next) => {
  const posts = [
    {
      id: 'sadf12dasf',
      title: 'First server side post',
      content: 'This is coming from the backend server'
    },
    {
      id: '123sa2q3qdfs',
      title: 'Second server side post',
      content: 'This is coming from the backend server !!'
    }

  ];

  // desired response headers can be set
  // response.set('Content-Type', 'text/plain');

  response.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts
  });
});

module.exports = app;
