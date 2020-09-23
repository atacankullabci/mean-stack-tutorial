const express = require("express");

const router = express.Router();

const Post = require('../models/post');

router.post("", (request, response, next) => {
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

router.put("/:id", (request, response, next) => {
  const post = new Post({
    _id: request.body.id,
    title: request.body.title,
    content: request.body.content
  });

  console.log(post);
  Post.updateOne({_id: request.params.id}, post)
    .then(result => {
      console.log(result);
      response.status(200).json({
        message: 'Update successfull.'
      })
    });
});

router.delete("/:id", (request, response, next) => {
  const postId = request.params.id;

  Post.deleteOne({_id: postId}).then(result => {
    console.log('Deleted from mongod');
    response.status(200).json({
      message: "Post deleted successfully.",
      state: true
    })
  })
});

router.get("", (request, response, next) => {
  Post.find().then(documents => {
    response.status(200).json({
      message: "Posts fetched successfully.",
      posts: documents
    });
  });
});

router.get("/:id", (request, response, next) => {

  Post.findById(request.params.id).then(post => {
    console.log(post);
    if (post) {
      response.status(200).json(post);
    } else {
      response.status(404).json({message: 'Post not found !'});
    }
  });
});

module.exports = router;
