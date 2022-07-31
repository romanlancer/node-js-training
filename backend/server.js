const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
require('colors')
const connectDB = require('../config/db')
dotenv.config({ path: path.join(__dirname, '..', 'config', '.env') })

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/api/v1', require('./routes/routesCars'))
app.use(require('./middlewares/errorHandler'))
const { PORT } = process.env

connectDB()
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`.cyan.bold.underline)
})
