const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const { engine } = require('express-handlebars')
const sendEmail = require('./services/sendEmail')
require('colors')
const connectDB = require('../config/db')
dotenv.config({ path: path.join(__dirname, '..', 'config', '.env') })

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('backend/public'))
// set template engine
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './backend/views')
// set routes
app.use('/api/v1', require('./routes/routesCars'))
app.use('/', require('./routes/routesUsers'))
app.get('/contact', (req, res) => {
  res.render('contact')
})

app.get('/pizza', (req, res) => {
  res.redirect('https://www.google.com/')
})
app.post('/send', async (req, res) => {
  await sendEmail(req.body)
  res.render('contact', { msg: 'Email sent' })
  // res.send(req.body)
  // res.render('contact')
})

app.use(require('./middlewares/errorHandler'))
const { PORT } = process.env

connectDB()
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`.cyan.bold.underline)
})
