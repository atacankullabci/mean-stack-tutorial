const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const Post = require('./models/post');

const mongoConnURL = 'mongodb://localhost:27017/mean-stack?readPreference=primary&appname=MongoDB%20Compass&ssl=false';

mongoose.connect(mongoConnURL)
  .then(() => {
    console.log('DB Connection successful !');
  })
  .catch(() => {
    console.log('DB Connection failed !');
  });

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
  const post = Post({
    title: request.body.title,
    content: request.body.content
  });

  Post.find({title: post.title}, function (err, posts) {
    if (err) {
      return console.error(err);
    }

    if (posts.length === 0) {
      post.save();

      response.status(201).json({
        message: 'Post added successfully.',
        post: post
      });
    } else {
      response.status(409).json({
        message: 'This title already exists !',
      });
    }
  });
});

app.put("/api/posts/:id", (request, response, next) => {
  const oldPost = request.body;
  const postId = request.params.id;


  next();
});

app.delete("/api/posts/:id", (request, response, next) => {
  const postId = request.params.id;

  Post.deleteOne({_id: postId}).then(result => {
    response.status(200).json({
      message: "Post deleted successfully.",
      state: true
    })
  })
});

app.get("/api/posts", (request, response, next) => {
  Post.find().then(documents => {
    response.status(200).json({
      message: "Posts fetched successfully.",
      posts: documents
    });
  });
});

/*
app.get("/api/posts/:title", (request, response, next) => {

  const title = request.params.title;

  Post.find({title: title}, function (err, posts) {
    if (err) {
      return console.error(err);
    }
    response.status(200).json({
      posts: posts
    });
  });
});

 */

module.exports = app;
