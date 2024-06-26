let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetScreen = false


const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.getElementById('equals')
const clearButton = document.getElementById('clear')
const deleteButton = document.getElementById('backspace')
const pointButton = document.getElementById('period')
const negPosButton = document.getElementById('negPos')
const lastOperationScreen = document.getElementById('lastEq')
const currentOperationScreen = document.getElementById('currentEq')



window.addEventListener('keydown', handleKeyboardInput)
clearButton.addEventListener('click', clear)
deleteButton.addEventListener('click', deleteNumber)
pointButton.addEventListener('click', appendPeriod)
negPosButton.addEventListener('click', negPosSwitch)
equalsButton.addEventListener('click', evaluate)



numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
)

function appendNumber(number) {
    if (currentOperationScreen.textContent === '0' || shouldResetScreen)
      resetScreen()
    currentOperationScreen.textContent += number
  }

function resetScreen() {
  currentOperationScreen.textContent = ''
  shouldResetScreen = false
}

function setOperation(operator) {
  if (currentOperation !== null) evaluate()
  firstOperand = currentOperationScreen.textContent
  currentOperation = operator
  lastEq.textContent = `${firstOperand} ${currentOperation}`
  shouldResetScreen = true
}

function appendPeriod() {
  if (shouldResetScreen) resetScreen()
  if (currentOperationScreen.textContent === '')
    currentOperationScreen.textContent = '0'
  if (currentOperationScreen.textContent.includes('.')) return
  currentOperationScreen.textContent += '.'
}

function negPosSwitch(number) {
  if (currentOperationScreen.textContent > 0) currentOperationScreen.textContent = (currentOperationScreen.textContent * -1)
  else if (currentOperationScreen.textContent < 0) currentOperationScreen.textContent = (currentOperationScreen.textContent * -1)
}

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
  if (e.key === '.') appendPoint()
  if (e.key === '=' || e.key === 'Enter') evaluate()
  if (e.key === 'Backspace') deleteNumber()
  if (e.key === 'Escape') clear()
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
    setOperation(convertOperator(e.key))
}

function clear() {
  currentOperationScreen.textContent = '0'
  lastOperationScreen.textContent = ''
  firstOperand = ''
  secondOperand = ''
  currentOperation = null
}

function deleteNumber() {
  currentOperationScreen.textContent = currentOperationScreen.textContent
    .toString()
    .slice(0, -1)
}

function evaluate() {
  if (currentOperation === null || shouldResetScreen) return
  if (currentOperation === '/' && currentOperationScreen.textContent === '0') {
    alert("You can't divide by 0!")
    return
  }
  secondOperand = currentOperationScreen.textContent
  currentOperationScreen.textContent = roundResult(
    operate(currentOperation, firstOperand, secondOperand)
  )
  lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
  currentOperation = null
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000
}

function add(a, b) {
  return a + b
}

function substract(a, b) {
  return a - b
}

function multiply(a, b) {
  return a * b
}

function divide(a, b) {
  return a / b
}

function operate(operator, a, b) {
  a = Number(a)
  b = Number(b)
  switch (operator) {
    case '+':
      return add(a, b)
    case '-':
      return substract(a, b)
    case '*':
      return multiply(a, b)
    case '/':
      if (b === 0) return null
      else return divide(a, b)
    default:
      return null
  }
}