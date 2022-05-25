let firstValue = "0";
let secondValue = "0";
let operatorValue = "";

const grid = document.getElementById('buttons');
const preDisplay = document.getElementById('pre-display');
const display = document.getElementById('display');
const equals = document.getElementById('equals');
const numbers = document.querySelectorAll('.number');
const commands = document.querySelectorAll('.command');
const clear = document.querySelector('#AC');
const backspace = document.querySelector('#C');

numbers.forEach((number)=>{
  number.onclick = (e)=>{numberClick(e.target.textContent)};
});
commands.forEach((command)=>{
  command.onclick = (e)=>{commandClick(e.target.textContent)};
});

equals.onclick = ()=>operate(operatorValue);
clear.onclick = ()=>clearAll();
backspace.onclick =()=>erase();

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

function numberClick(digit) {
  if(operatorValue === '') {
    if(firstValue === '0') {
      firstValue = digit;
    }
    else {
      firstValue += digit;
    }
    display.textContent = firstValue;
  }
  else {
    if(secondValue === '0') {
      secondValue = digit;
    }
    else {
      secondValue += digit;
    }
    display.textContent = secondValue; 
  }
}

function commandClick(com) {
  if(operatorValue !== '' && secondValue === '0') {
    //old operator being replaced by the new one
    operatorValue = com;
    let tes = document.getElementById('show');
    if(tes === null) {
      display.textContent = firstValue + ' ' + operatorValue;
    }
    else {
      preDisplay.textContent = firstValue + ' ' + operatorValue;
    }
    return;
  }
  if(operatorValue !== '') {
    //haven't clicked 'equals', but already clicked another operator
    operate(operatorValue);
    operatorValue = com;
    preDisplay.textContent = firstValue + ' ' + operatorValue;
    return;
  }
  if(secondValue === '0') {
    //there is no secondValue yet
    operatorValue = com;
    preDisplay.textContent = firstValue + ' ' + operatorValue;
    preDisplay.setAttribute('id', 'show');
    return;
  }
}

function operate(tipe) {
  if(tipe === '') {
    //clicked 'equals' even though there is no operation yet
    return;
  }
  let hasil;
  a = parseInt(firstValue), b = parseInt(secondValue);
  if(tipe === '+') {
    hasil = add(a, b);
  }
  else if(tipe === '-') {
    hasil = subtract(a, b);
  }
  else if(tipe === 'x') {
    hasil = multiply(a, b);
  }
  else if(tipe === ':') {
    hasil = divide(a, b);
  }
  preDisplay.textContent += ' ' + secondValue + ' ' + '=';
  secondValue = '0';
  operatorValue = '';
  firstValue = hasil.toString();
  display.textContent = firstValue;
}

function erase() {
  //check if we should erase firstValue or secondValue
  let tes = document.getElementById('show');
  if(tes === null) {
    if(firstValue === '0') {
      //disable backspace if there's no input yet
      return;
    }
    if(firstValue.length > 1) {
      firstValue = firstValue.slice(0, firstValue.length-1);
      display.textContent = firstValue;
    }
    else {
      firstValue = '0';
      display.textContent = '0';
    }
  }
  else {
    if(secondValue === '0') {
      //disable backspace if there's no input yet
      return;
    }
    if(secondValue.length > 1) {
      secondValue = secondValue.slice(0, secondValue.length-1);
      display.textContent = secondValue;
    }
    else {
      secondValue = '0';
      display.textContent = '0';
    }
  }
}

function clearAll() {
  preDisplay.setAttribute('id', 'pre-display');
  firstValue = '0';
  secondValue = '0';
  operatorValue = '';
  display.textContent = '0';
}