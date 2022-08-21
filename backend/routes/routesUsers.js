const UsersController = require('../controllers/UsersController')
const authMiddleware = require('../middlewares/authMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')
const router = require('express').Router()
const registerValidation = require('../middlewares/registerValidation')

// router.post(
//   '/registration',
//   [
//     check(
//       'userEmail',
//       'мінімальна кількість символів 4, максимальна 10'
//     ).isLength({
//       min: 4,
//       max: 10,
//     }),
//     check('userPassword', 'поле з паролем не може бути пустим')
//       .notEmpty()
//       .isLength({ min: 4, max: 10 }),
//   ],
//   UsersController.registration
// )

console.log(registerValidation)
router.post('/registration', registerValidation, UsersController.registration)
router.post('/login', UsersController.login)

router.get('/logout', authMiddleware, UsersController.logout)

router.get(
  '/users',
  authMiddleware,
  roleMiddleware(['MODERATOR', 'EDITOR', 'ADMIN']),
  UsersController.getAllUsers
)

module.exports = router
