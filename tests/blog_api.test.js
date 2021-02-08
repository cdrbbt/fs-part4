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

test('creating a new blog', async() => {
  const newBlog = {
    title: 'How to test the create function of a server',
    author: 'Egor B.',
    url: 'http://localhost/1',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-type', /application\/json/)

  const blogsAfterOperation = await helper.blogsInDB()
  expect(blogsAfterOperation).toHaveLength(helper.intialBlogs.length + 1)

  expect(blogsAfterOperation.map(b => b.title)).toContain('How to test the create function of a server')
  
  // expect(blogsAfterOperation).toMatchObject(newBlog)

})

test('creating a blog without likes will default the value to 0', async () => {
  const newBlog = {
    title: 'Testing if sending a request without a field will crash the server, part1',
    author: 'Egor B.',
    url: 'http://localhost/2'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-type', /application\/json/)

  // will break if blogs arent returned in order
  const blogsAfterOperation = await helper.blogsInDB()
  const lastBlog = blogsAfterOperation[blogsAfterOperation.length-1]
  expect(lastBlog.likes).toBe(0)
})

afterAll(() => {
  mongoose.connection.close()
})