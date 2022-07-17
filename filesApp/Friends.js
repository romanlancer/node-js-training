const path = require('path')
const friendsPath = path.join(__dirname, 'db', 'db.json')
const fs = require('fs/promises')
const newFriend = {
  avatar: 'https://avatars.githubusercontent.com/u/22094005?v=4',
  name: 'Lubov Danchenko',
  isOnline: true,
  id: 1213,
  githubLink: 'https://github.com/LDanchenko',
}
class Friends {
  save = async () => {
    try {
      const friends = await this.getAll()
      friends.push(newFriend)
      await fs.writeFile(friendsPath, JSON.stringify(friends, null, 4))
    } catch (error) {
      console.log(error)
    }
  }

  getAll = async () => {
    try {
      const result = await fs.readFile(friendsPath)
      const data = JSON.parse(result)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  update = () => {
    console.log('update')
  }

  remove = () => {
    console.log('remove')
  }
}

module.exports = new Friends()
