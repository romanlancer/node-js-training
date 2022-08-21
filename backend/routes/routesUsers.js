const UsersController = require('../controllers/UsersController')
const authMiddleware = require('../middlewares/authMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')
const router = require('express').Router()

router.post(
  '/registration',
  (req, res, next) => {
    console.log('відпрацював Joi')
    next()
  },
  UsersController.registration
)

router.post('/login', UsersController.login)

router.get('/logout', authMiddleware, UsersController.logout)

router.get(
  '/users',
  authMiddleware,
  roleMiddleware(['MODERATOR', 'EDITOR', 'ADMIN']),
  UsersController.getAllUsers
)

module.exports = router
