const jwt = require('jsonwebtoken')

module.exports = (roles) => {
  console.log(roles)
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next()
    }
    const [bearer, token] = req.headers.authorization.split(' ')
    console.log('token', token)
    if (!(bearer === 'Bearer' && token)) {
      res.status(401)
      throw new Error('not authorized')
    }
    let hasRole = false

    const { roles: userRoles } = jwt.verify(token, process.env.JWT_SECRET_KEY)
    userRoles.forEach((role) => {
      if (roles.includes(role)) {
        hasRole = true
      }

      if (!hasRole) {
        res.status(403).json({ message: 'you have no permissions' })
      }
    })
    next()
  }
}
