// sum
// sub
// mult
// div

const [operator, ...args] = process.argv.slice(2)
const numbers = args.map((element) => Number(element))

let result = null

switch (operator) {
  case 'sum':
    result = numbers.reduce((total, element) => total + element, 0)
    break
  case 'sub':
    result = numbers.reduce((total, element) => total - element)
    break
  case 'mult':
    result = numbers.reduce((total, element) => total * element)
    break
  case 'div':
    result = numbers.reduce((total, element) => total / element)
    break

  default:
    break
}
console.log(result)
