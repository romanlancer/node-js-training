const errorHandler = (error, req, res, next) => {
  console.log(res.statusCode)
  const statusCode = res.statusCode ? res.statusCode : 500
  const stack = process.env.NODE_ENV === 'production' ? null : error.stack
  res.json({
    code: statusCode,
    message: error.message,
    stack,
  })
}

module.exports = errorHandler
