const mongoose = require('mongoose');

// blueprint
const postSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true}
});

// If you do not provide a collection name mongoose will automatically
// provide a collection name for you with its model name's plural form
// You can provide a collection name by yourself with the line below
//module.exports = mongoose.model('Post', postSchema, 'posts');
module.exports = mongoose.model('Post', postSchema);
