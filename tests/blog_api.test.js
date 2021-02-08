const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  
  for (let blog of helper.intialBlogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
})

const api = supertest(app)

test('all blogs are returned', async () => {
  const res = await api.get('/api/blogs')

  expect(res.body).toHaveLength(helper.intialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})