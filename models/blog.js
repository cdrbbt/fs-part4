const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: {
    type: Number,
    default: 0
  }
})

blogSchema.set('toJSON', {
  transform: (document, retunrnedObject) => {
    retunrnedObject.id = retunrnedObject._id
    delete retunrnedObject._id
  }
})

module.exports = mongoose.model('Blog', blogSchema)