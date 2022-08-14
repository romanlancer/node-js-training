const { model, Schema } = require('mongoose')

const userSchema = Schema(
  {
    userEmail: {
      type: String,
      required: true,
      unique: true,
    },

    userPassword: {
      type: String,
      minLength: [5, 'minimum length of password 5 symbols'],
    },
    userName: {
      type: String,
      maxLength: [20, 'maximum length of user name 20 symbols'],
      default: 'John Doe',
    },
    token: {
      type: String,
      default: null,
    },
    roles: [
      {
        type: String,
        ref: 'Role',
      },
    ],
    
  },
  { timestamps: true, versionKey: false }
)

module.exports = model('user', userSchema)
