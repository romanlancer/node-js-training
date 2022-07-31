// http://localhost:5000/api/v1/cars

// addCar
// getAllCars
// getOne
// remove
// update
const CarsController = require('../controllers/CarsController')

const router = require('express').Router()

router.post('/cars', CarsController.addCar)

router.get('/cars', CarsController.getAllCars)
router.get('/cars/:id', CarsController.getOne)
router.delete('/cars/:id', CarsController.remove)
router.put('/cars/:id', CarsController.update)

module.exports = router
