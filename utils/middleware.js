const logger = require('./logger')

const errorHandler = (error, req, res, next) => {
  logger.error('Error recieved', error.name, error.message)
  if (error.name === 'ValidationError') {
    return res.status(400).send({error: error.message})
  } else if (error.name === 'passwordError'){
    return res.status(400).send({error:error.message})
  }
  next(error)
}

module.exports = {
  errorHandler
}