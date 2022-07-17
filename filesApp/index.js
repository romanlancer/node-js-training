const express = require('express')
// require('./utils/friendsPath')
const Friends = require('./Friends')
const path = require('path')

const app = express()

const friendsPath = path.join(__dirname, 'db', 'db.json')
console.log(friendsPath)

app.post('/friends', Friends.save)
app.get('/friends', Friends.getAll)
app.put('/friends/:id', Friends.update)
app.delete('/friends/:id', Friends.remove)
const PORT = 5000
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})

// CRUD
