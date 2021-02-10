const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  console.log(blogs)
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const user = await User.findOne({})
  const blog = req.body
  blog.user = user._id
  console.log('blog', blog)
  const blogObject = new Blog(blog)
  console.log('object', blogObject)
  const savedBlog = await blogObject.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, {likes: req.body.likes}, {new: true})

  res.json(updatedBlog)
})

module.exports = blogsRouter