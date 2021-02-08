const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, retunredObject) => {
    retunredObject.id = retunredObject._id
    delete retunredObject._id
  }
})
module.exports = mongoose.model('Blog', blogSchema)