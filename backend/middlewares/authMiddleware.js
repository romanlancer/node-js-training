const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
module.exports = asyncHandler(async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next()
  }

  const [bearer, token] = req.headers.authorization.split(' ')
  console.log('token', token)
  if (!(bearer === 'Bearer' && token)) {
    res.status(401)
    throw new Error('not authorized')
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
  req.user = await User.findById(decoded.id).select(
    '-userPassword -createdAt -updatedAt'
  )
  next()
})
