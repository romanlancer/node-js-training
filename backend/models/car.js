const { model, Schema } = require('mongoose')

const carSchema = Schema(
  {
    manufacturer: String,

    title: String,

    year: Number,

    color: String,

    price: Number,
  },
  { timestamps: true, versionKey: false }
)

// const Cat = mongoose.model('car', { name: String })

// const kitty = new Cat({ name: 'Zildjian' })
// kitty.save().then(() => console.log('meow'))
module.exports = model('car', carSchema)
