const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const postsRoutes = require('./routes/posts');

const mongoConnURL = 'mongodb://localhost:27017/mean-stack?readPreference=primary&appname=MongoDB%20Compass&ssl=false';

mongoose.connect(mongoConnURL)
  .then(() => {
    console.log('DB Connection successful !');
  })
  .catch(() => {
    console.log('DB Connection failed !');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/images', express.static(path.join('backend/images')));

app.use((request, response, next) => {
  // response headers are getting set
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;
