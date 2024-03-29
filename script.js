const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const deleteButton = document.querySelector('[data-delete]');
const clearAllButton = document.querySelector('[data-clear-all]');
const equalsButton = document.querySelector('[data-equals]');
const previousOperandTextElement = 
document.querySelector('[data-previous-operand]');
const currentOperandTextElement = 
document.querySelector('[data-current-operand]');

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
        //replace old operator with the new one
        this.currentOperator = operator;
      }
      return;
    }
    if(this.previousOperand !== '') {
      //haven't clicked 'equals' but already append another operator
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
    let result = 'div-0';
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
        if(currentOperandNumber === 0) {
          this.currentOperand = result;
          return;
        }
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
  if(calculator.currentOperand === 'div-0') {
    alert('can\'t divide by 0 !');
    calculator.currentOperand = '0';
  }
  else{
    calculator.updateDisplay();
  }
});

window.addEventListener('keydown', handleKeyboardInput);

function handleKeyboardInput(e) {
  if((e.key >= 0 && e.key <= 9) || e.key === '.') {
    calculator.appendNumber(e.key);
  }
  else if(e.key === '=' || e.key === 'Enter') {
    calculator.compute();
  }
  else if(e.key === 'Backspace' || e.key === 'Delete') {
    calculator.delete();
  }
  else if(e.key === 'Escape') {
    calculator.clearAll();
  }
  else if(e.key === '+' || e.key === '-' || e.key === '*') {
    calculator.appendOperator(e.key);
  }
  else if(e.key === ':' || e.key === 'Backslash') {
    calculator.appendOperator('÷');
  }
  else {
    return;
  }
  calculator.updateDisplay();
}
