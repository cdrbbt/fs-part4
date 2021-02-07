const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (favorite, item, key) => {
    return favorite.likes < item.likes
      ? item
      : favorite
  }
  
  return blogs.length > 0 ? blogs.reduce(reducer, { likes:-1 }) : null
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const blogData = _.countBy(blogs, blog => blog.author)
  const formatObject = (value, key) => ({author: key, blogs: value})
  const fomattedBlogData = _.map(blogData, formatObject)
  return _.maxBy(fomattedBlogData, data => data.blogs)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}