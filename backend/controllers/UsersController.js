const asyncHandler = require('express-async-handler')
const { validationResult } = require('express-validator')
const User = require('../models/user')
const Role = require('../models/role')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uaLocales = require('../../config/locales/ua')
class UsersController {
  registration = asyncHandler(async (req, res) => {
    //   1. отримуєм дані від користувача
    //  2. робимо валідацію даних
    // 3. перевіряємо чи є користувач в базі даних
    //   4. якщо користувач є, робимо сповіщення, що користувач є, логін можливий
    // 5. хешируємо пароль
    // 6. зберігаємо в базу даних
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: uaLocales.validation.registration.msg, errors })
    }

    const { userEmail, userPassword } = req.body
    if (!(userEmail && userPassword)) {
      res.status(400)
      throw new Error('all input fields required')
    }

    const candidate = await User.findOne({ userEmail })

    if (candidate) {
      res.status(409)
      throw new Error('user already exists')
    }
    const hashedPassword = await bcrypt.hash(userPassword, 10)
    const userRole = await Role.findOne({ value: 'MODERATOR' })

    const user = await User.create({
      ...req.body,
      userPassword: hashedPassword,
      roles: [userRole.value],
    })

    if (!user) {
      res.status(400)
      throw new Error('registration error')
    }

    res.status(201).json({ code: 201, data: user })
  })

  login = asyncHandler(async (req, res) => {
    //   1. отримуєм дані від користувача
    //  2. робимо валідацію даних
    // 3. шукаєм користувача в базі даних і перевіряємо те, що він ввів з тим, що є в базі даних
    //   4. якщо коритсувача нема, то йому треба зареєструватись.
    // 5. якщо користувач ввів не вірний логін або пароль, то треба ввести корректні дані (логін і пароль)
    // 6. генеруємо токен авторизації
    const { userEmail, userPassword } = req.body
    if (!(userEmail && userPassword)) {
      res.status(400)
      throw new Error('all input fields required')
    }

    const candidate = await User.findOne({ userEmail })

    if (!candidate) {
      res.status(400)
      throw new Error('please register')
    }

    const isValidPassword = await bcrypt.compare(
      userPassword,
      candidate.userPassword
    )
    console.log(isValidPassword)

    if (!isValidPassword) {
      res.status(400)
      throw new Error('wrong login or password')
    }
    const payload = {
      food: 'borsh',
      drink: 'coca-cola',
      id: candidate._id,
      roles: candidate.roles,
    }
    candidate.token = this.generateToken(payload)

    await candidate.save()

    if (!candidate) {
      res.status(400)
      throw new Error('login error')
    }

    res.status(200).json({ code: 200, data: candidate.token })
  })

  logout = asyncHandler(async (req, res) => {
    const { _id } = req.user

    await User.findByIdAndUpdate(_id, { token: '' })
    res.status(204).send()
  })

  getAllUsers = asyncHandler(async (req, res) => {
    res.send(req.user)
  })

  generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '8h' })
  }
}

module.exports = new UsersController()
