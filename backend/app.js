const express = require('express');

const app = express();

app.use((request, response, next) => {
  console.log('First Middleware');
  // When next function is called the next app.use function is continued (Comment out and check)
  next();
});

app.use((request, response, next) => {
  response.send('Hello from express !');
});

module.exports = app;
