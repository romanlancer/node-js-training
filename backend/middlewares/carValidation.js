const { check } = require('express-validator')
const carValidation = [
  check('userEmail', 'мінімальна кількість символів 4, максимальна 10')
    .isLength({
      min: 6,
      max: 14,
    })
    .notEmpty()
    .isEmail()
    .normalizeEmail(),
  check('userPassword', 'поле з паролем не може бути пустим')
    .notEmpty()
    .isLength({ min: 4, max: 10 }),
]
module.exports = carValidation
