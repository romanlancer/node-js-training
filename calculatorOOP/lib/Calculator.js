class Calculator {
  constructor(operator, numbers) {
    this.operator = operator
    this.numbers = numbers
  }

  // helloRoma() {
  //   console.log('hello Roma')
  // }

  // vita = { name: 'Vita', status: 'admin' }
  // roma = ['beer', 'chess', 'run']
  init = () => {
    return this.calculateNumbers(this.operator, this.numbers)
  }

  calculateNumbers = (operator, numbers) => {
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

    return result
  }
}

const [operator, ...args] = process.argv.slice(2)
const numbers = args.map((element) => Number(element))

module.exports = new Calculator(operator, numbers).init()
