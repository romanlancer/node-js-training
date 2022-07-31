const Car = require('../models/car')

class CarsRepository {
  getAllCars = async () => {
    try {
      const cars = await Car.find({})
      return cars
    } catch (error) {
      throw new Error('can not fetch cars')
    }
  }
}

module.exports = new CarsRepository()
