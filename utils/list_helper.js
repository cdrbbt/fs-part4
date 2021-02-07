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
  const reducer = (favorite, item) => {
    return favorite.likes < item.likes
      ? item
      : favorite
  }
  return blogs.length > 0 ? blogs.reduce(reducer, { likes:-1 }) : null
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}