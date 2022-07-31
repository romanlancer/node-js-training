// const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/test')

// const Cat = mongoose.model('Cat', { name: String })

// const kitty = new Cat({ name: 'Zildjian' })
// kitty.save().then(() => console.log('meow'))

const { connect } = require('mongoose')

const connectDB = async () => {
  try {
    const db = await connect(process.env.MONGO_DB_URI)
    console.log(
      `mongoDB is connected on port: ${db.connection.port} on host: ${db.connection.host}, db name: ${db.connection.name}`
        .cyan
    )
  } catch (error) {
    console.log(error.message.red)
  }
}
module.exports = connectDB
