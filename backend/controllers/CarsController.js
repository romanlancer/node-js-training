const { response } = require('express')
const Car = require('../models/car')
const asyncHandler = require('express-async-handler')
const CarsRepository = require('../repository/Cars')
class CarsController {
  addCar = asyncHandler(async (req, res) => {
    if (!req.body.title) {
      res.status(400)
      throw new Error('title is not provided')
    }
    const car = await Car.create({ ...req.body })
    if (!car) {
      res.status(400)
      throw new Error('can not create a new car')
    }
    res.status(201).json({ code: 201, message: 'success', car })
  })
  getAllCars = asyncHandler(async (req, res) => {
    const cars = await CarsRepository.getAllCars()
    if (!cars) {
      res.status(400)
      throw new Error('can not fetch cars')
    }
    res
      .status(200)
      .json({ code: 200, message: 'success', cars, qty: cars.length })
  })
  getOne = asyncHandler(async (req, res) => {
    res.send('getOne')
  })
  remove = asyncHandler(async (req, res) => {
    res.send('remove')
  })
  update = asyncHandler(async (req, res) => {
    res.send('update')
  })
}

module.exports = new CarsController()
