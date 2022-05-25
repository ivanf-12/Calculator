let firstValue = "0";
let secondValue = "0";
let operatorValue = "";
let curDot = false;

const grid = document.getElementById('buttons');
const preDisplay = document.getElementById('pre-display');
const display = document.getElementById('display');
const equals = document.getElementById('equals');
const clear = document.getElementById('AC');
const backspace = document.getElementById('C');
const dot = document.getElementById('dot');
const numbers = document.querySelectorAll('.number');
const commands = document.querySelectorAll('.command');

numbers.forEach((number)=>{
  number.onclick = (e)=>{numberClick(e.target.textContent)};
});
commands.forEach((command)=>{
  command.onclick = (e)=>{commandClick(e.target.textContent)};
});

equals.onclick = ()=>operate(operatorValue);
clear.onclick = ()=>clearAll();
backspace.onclick =()=>erase();
dot.onclick = ()=>addDot();

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
    if(document.getElementById('show') !== null) {
      //the number in the display.textContent is only result of previous 
      //calculation, so user can't concatenate any digit
      return; 
    }
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

function addDot() {
  if(curDot === true) {
    //there's already one dot in this number
    return;
  }
  if(operatorValue === '') {
    if(document.getElementById('show') !== null) {
      return;
    }
    firstValue += '.';
    display.textContent = firstValue;
  }
  else {
    secondValue += '.';
    display.textContent = secondValue;
  }
  curDot = true;
}

function commandClick(com) {
  curDot = false;
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
  a = parseFloat(firstValue), b = parseFloat(secondValue);
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
  if(!Number.isInteger(hasil)) {
    //if 'hasil' is a float number, set it precision to 2
    hasil = hasil.toFixed(2);
  }
  preDisplay.textContent += ' ' + secondValue + ' ' + '=';
  secondValue = '0';
  operatorValue = '';
  firstValue = hasil.toString();
  display.textContent = firstValue;
  curDot = false;
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
      if(firstValue[firstValue.length-1] === '.') {
        curDot = false;
      }
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
      if(secondValue[secondValue.length-1] === '.') {
        curDot = false;
      }
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
  curDot = false;
}