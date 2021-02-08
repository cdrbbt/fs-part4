const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const { map } = require('../app')

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

test('blogs have an id field', async() => {
  const res = await api.get('/api/blogs')
  const ids = res.body.map(r => r.id)

  for (const id of ids) {
    expect(id).toBeDefined()
  }
})

afterAll(() => {
  mongoose.connection.close()
})