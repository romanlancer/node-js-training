const calculateNumbers = (operator, numbers) => {
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

module.exports = calculateNumbers
