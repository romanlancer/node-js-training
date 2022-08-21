const { check } = require('express-validator')
const registerValidation = [
  check(
    'userEmail',
    'мінімальна кількість символів 4, максимальна 10'
  ).isLength({
    min: 4,
    max: 10,
  }),
  check('userPassword', 'поле з паролем не може бути пустим')
    .notEmpty()
    .isLength({ min: 4, max: 10 }),
]
module.exports = registerValidation
