let currentValue = "0";
let firstValue = "0";
let operatorValue = "";

const grid = document.getElementById('buttons');
const display = document.getElementById('display');
const equals = document.getElementById('equals');
const numbers = document.querySelectorAll('.number');
const commands = document.querySelectorAll('.command');
const clear = document.querySelector('.AC');
const backspace = document.querySelector('.C');

numbers.forEach((number) => {
  number.onclick = (e)=>{numberClick(e.target.textContent)};
});
commands.forEach((command) => {
  command.onclick = (e)=>{commandClick(e.target.textContent)};
});
clear.onclick = ()=>{restart()};
equals.onclick = ()=>{operate()};
backspace.onclick = ()=>{eraseDigit()};

//math operators

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

//functions

function populate() {
  display.textContent = currentValue;
}

function eraseDigit() {
  if(operatorValue !== "") {
    operatorValue = "";
    display.textContent = firstValue;
    return;
  }
  if(firstValue !== "0") {
    firstValue = firstValue.slice(0, firstValue.length-1);
    if(firstValue.length === 0) {
      firstValue = "0";
    }
    display.textContent = firstValue;
    return;
  }
  if(currentValue !== "0") {
    currentValue = currentValue.slice(0, currentValue.length-1);
    if(currentValue.length === 0) {
      currentValue = "0";
    }
    populate();
    return;
  }
}

function numberClick(value) {
  if(currentValue==="0") {
    currentValue = "";
  }
  currentValue += value;
  populate();
}

function commandClick(value) {
  if(operatorValue !== "" && currentValue !== "0") {
    operate();
    firstValue = currentValue;
    operatorValue = value;
    currentValue = "0";
    display.textContent = firstValue + " " + value;
    return;
  }
  if(operatorValue != "" && currentValue === "0") {
    operatorValue = value;
    display.textContent = firstValue + " " + value;
  }
  if(firstValue === "0") {
    firstValue = currentValue;
    operatorValue = value;
    currentValue = "0"
    display.textContent = firstValue + " " + value;
    return;
  }
  if(operatorValue === "") {
    operatorValue = value;
    currentValue = "0";
    display.textContent = firstValue + " " + value;
  }
}

function operate() {
  let a = parseInt(firstValue);
  let b = parseInt(currentValue);
  let operator = operatorValue;

  firstValue = "0", operatorValue = "";
  let hasil;
  if(operator == '+') {
    hasil = add(a, b);
  }
  else if(operator == '-') {
    hasil = subtract(a, b);
  }
  else if(operator == 'x') {
    hasil = multiply(a, b);
  }
  else {
    hasil = divide(a, b);
  }
  currentValue = hasil.toString();
  populate();
}

function restart() {
  currentValue = "0";
  startValue = "0";
  operatorValue = "";
  populate();
}