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
const lastOperationScreen = document.getElementById('lastEq')
const currentOperationScreen = document.getElementById('currentEq')


window.addEventListener('keydown', handleKeyboardInput)
clearButton.addEventListener('click', clear)
deleteButton.addEventListener('click', deleteNumber)



numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
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