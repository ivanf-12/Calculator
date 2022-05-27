const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const deleteButton = document.querySelector('[data-delete]');
const clearAllButton = document.querySelector('[data-clear-all]');
const equalsButton = document.querySelector('[data-equals]');
const previousOperandTextElement = 
document.querySelector('[data-previous-operand]');
const currentOperandTextElement = 
document.querySelector('[data-current-operand]');

document.onkeypress = (e)=>triggerClick(e.key);
document.onkeydown = (e)=>triggerBackspace(e.key);

function triggerClick(value) {
  switch (value) {
    case '0':
      break;
    case '1':
      break;
    case '2':
      break;
    case '3':
      break;
    case '4':
      break;
    case '5':
      break;
    case '6':
      break;
    case '7':
      break;
    case '8':
      break;
    case '9':
      break;
    case '+':
      break;
    case '-':
      break;
    case '*':
      break;
    case ':':
      break;
    case '=':
      break;
    default:
      return;
  }
  document.getElementById(`${value}`).click();
}

function triggerBackspace(value) {
  if(value !== "Backspace") return;
  deleteButton.click();
}

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.previousOperand = '';
    this.currentOperand = '';
    this.currentOperator = null;
  }

  clearAll() {
    this.previousOperand = '';
    this.currentOperand = '';
    this.currentOperator = null;
  }

  appendNumber(number) {
    if(number === '.' && this.currentOperand.includes('.')) return;
    if(this.currentOperand.length === 12) return;
    this.currentOperand += number;
  }

  appendOperator(operator) {
    if(this.currentOperand === '') {
      if(this.currentOperator !== null) {
        this.currentOperator = operator;
      }
      return;
    }
    if(this.previousOperand !== '') {
      this.compute();
    }
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
    this.currentOperator = operator;
  }

  compute() {
    let previousOperandNumber = parseFloat(this.previousOperand);
    let currentOperandNumber = parseFloat(this.currentOperand);
    if(isNaN(previousOperandNumber) || isNaN(currentOperandNumber)) {
      return;
    }
    let result;
    switch (this.currentOperator) {
      case '+':
        result = previousOperandNumber + currentOperandNumber;
        break;
      case '-':
        result = previousOperandNumber - currentOperandNumber;
        break;
      case '*':
        result = previousOperandNumber * currentOperandNumber;
        break;
      case '÷':
        result = previousOperandNumber / currentOperandNumber;
        break;  
      default:
        return;
    }
    this.previousOperand = '';
    this.currentOperand = result.toString();
    this.currentOperator = null; 
  }

  delete() {
    if(this.currentOperand === '') return;
    this.currentOperand = this.currentOperand.slice(0, -1);
  }

  getDisplayNumber(number) {
    let integerPart = parseFloat(number.split('.')[0]);
    let fractionPart = number.split('.')[1];
    if(!isNaN(integerPart)) {
      integerPart = integerPart.toLocaleString('en', {
        maximumFractionDigits: 0
      });
    } 
    else {
      integerPart = '';
    }
    if(fractionPart !== undefined) {
      return `${integerPart}.${fractionPart}`;
    }
    else {
      return integerPart;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = 
    this.getDisplayNumber(this.currentOperand);
    if(this.currentOperator != null) {
      this.previousOperandTextElement.innerText = 
      `${this.getDisplayNumber(this.previousOperand)} ${this.currentOperator}`;
    }
    else {
      this.previousOperandTextElement.innerText = 
      this.getDisplayNumber(this.previousOperand);
    }
  }
}

const calculator = new Calculator(previousOperandTextElement, 
currentOperandTextElement);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendOperator(button.innerText);
    calculator.updateDisplay();
  });
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});

clearAllButton.addEventListener('click', () => {
  calculator.clearAll();
  calculator.updateDisplay();
});

equalsButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});
