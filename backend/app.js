const express = require('express');

const app = express();

// app.use((request, response, next) => {
//   console.log('First Middleware');
//   // When next function is called the next app.use function is continued (Comment out and check)
//   next();
// });

app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers, Origin, X-Requested-With,Content-Type,Accept");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH, OPTIONS");
  next();
});

app.use("/api/posts", (request, response, next) => {
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
  response.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts
  });
});

module.exports = app;
