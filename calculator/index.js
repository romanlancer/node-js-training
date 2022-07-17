console.log('hello calculator')
const calculateNumbers = require('./lib/calc')

const [operator, ...args] = process.argv.slice(2)
const numbers = args.map((element) => Number(element))

module.exports = console.log(calculateNumbers(operator, numbers))
