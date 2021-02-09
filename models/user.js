const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: String,
  username: String,
  passwordHash: String
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.passwordHash
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('user', userSchema)