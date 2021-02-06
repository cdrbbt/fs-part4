const config = require('./utils/config')
const http = require('http')
const express =require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const logger = require('./utils/logger')

const mongoUrl = config.MONGODB_URI
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

const PORT = config.PORT
app.listen(PORT, () => {
  logger.info(`server running on port ${PORT}`)
})
