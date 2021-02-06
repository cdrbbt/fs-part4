require('dotenv').config()
const http = require('http')
const express =require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { response } = require('express')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = process.env.MOGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (req, res) => {
  Blog
  .find({})
  .then(blogs => {
    res.json(blogs)
  })
})

app.post('/api/blogs', (req, res) => {
  const blog = new Blog(req.body)

  blog
  .save()
  .then(result => {
    res.status(201).json(result)
  })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
