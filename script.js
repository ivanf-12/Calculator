let firstOperand = "0";
let secondOperand = "0";
let curOperator = "";
let dotUsed = false;

const topDisplay = document.getElementById('top-display');
const bottomDisplay = document.getElementById('bottom-display');
const equals = document.getElementById('nequal');
const clear = document.getElementById('AC');
const backspace = document.getElementById('C');
const dot = document.getElementById('ndot');
const numbers = document.querySelectorAll('.number');
const commands = document.querySelectorAll('.command');

numbers.forEach((number)=>{
  number.onclick = (e)=>{numberClick(e.target.textContent)};
});
commands.forEach((command)=>{
  command.onclick = (e)=>{commandClick(e.target.textContent)};
});

equals.onclick = ()=>operate(curOperator);
clear.onclick = ()=>clearAll();
backspace.onclick =()=>erase();
dot.onclick = ()=>addDot();
document.onkeypress = (e)=>triggerClick(e.key);
document.onkeydown = (e)=>triggerBackspace(e.key);
document.onkeyup = (e)=>triggerEnter(e.key);

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

function triggerEnter(value) {
  if(value === 'Enter') {
    const equal = document.getElementById('equals');
    equal.click();
  }
}

function triggerBackspace(value) {
  if(value === 'Backspace') {
    const ac = document.getElementById('C');
    ac.click();
  }
}

function triggerClick(value) {
  if(value === '.') {
    value = 'dot';
  }
  else if(value === '+') {
    value = 'plus';
  }
  else if(value === ':') {
    value = 'divide';
  } 
  else if(value === '*') {
    value = 'x';
  }
  else if(value === '-') {
    value = 'minus';
  }
  const targetKey = document.querySelector(`.n${value}`);
  if(targetKey !== null) {
    targetKey.click();
  }
}

function numberClick(digit) {
  if(curOperator === '') {
    if(document.getElementById('show') !== null) {
      //the number in the bottomDisplay.textContent is either the secondOperand 
      //or the result of previous calculation
      return; 
    }
    if(firstOperand === '0') {
      firstOperand = digit;
    }
    else {
      firstOperand += digit;
    }
    bottomDisplay.textContent = firstOperand;
  }
  else {
    if(secondOperand === '0') {
      secondOperand = digit;
    }
    else {
      secondOperand += digit;
    }
    bottomDisplay.textContent = secondOperand; 
  }
}

function addDot() {
  if(dotUsed === true) {
    //there's already one dot in this number
    return;
  }
  if(curOperator === '') {
    if(document.getElementById('show') !== null) {
      return;
    }
    firstOperand += '.';
    bottomDisplay.textContent = firstOperand;
  }
  else {
    secondOperand += '.';
    bottomDisplay.textContent = secondOperand;
  }
  dotUsed = true;
}

function commandClick(com) {
  dotUsed = false;
  if(curOperator !== '' && secondOperand === '0') {
    //old operator being replaced by the new one
    curOperator = com;
    let tes = document.getElementById('show');
    if(tes === null) {
      bottomDisplay.textContent = firstOperand + ' ' + curOperator;
    }
    else {
      topDisplay.textContent = firstOperand + ' ' + curOperator;
    }
    return;
  }
  if(curOperator !== '') {
    //haven't clicked 'equals', but already clicked another operator
    operate(curOperator);
    curOperator = com;
    topDisplay.textContent = firstOperand + ' ' + curOperator;
    return;
  }
  if(secondOperand === '0') {
    //there is no secondOperand yet
    curOperator = com;
    topDisplay.textContent = firstOperand + ' ' + curOperator;
    topDisplay.setAttribute('id', 'show');
    bottomDisplay.textContent = secondOperand;
    return;
  }
}

function operate(tipe) {
  if(tipe === '') {
    //clicked 'equals' even though there is no operation yet
    return;
  }
  let hasil;
  a = parseFloat(firstOperand), b = parseFloat(secondOperand);
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
    if(secondOperand === '0') {
      bottomDisplay.textContent = 'Cant divide by 0 !';
      return;
    }
    else {
      hasil = divide(a, b);
    }
  }
  if(!Number.isInteger(hasil)) {
    //if 'hasil' is a float number, set it precision to 2
    let lokasi = 0;
    hasilStr = hasil.toString();
    for(let i=0; i<hasilStr.length; ++i) {
      if(hasilStr[i] === '.') {
        lokasi = i;
        break;
      }
    }
    if(hasilStr.length - lokasi >= 12) {
      hasil = hasil.toFixed(12);
    }
  }
  topDisplay.textContent += ' ' + secondOperand + ' ' + '=';
  secondOperand = '0';
  curOperator = '';
  firstOperand = hasil.toString();
  bottomDisplay.textContent = firstOperand;
  dotUsed = false;
}

function erase() {
  //check if we should erase firstOperand or secondOperand
  let tes = document.getElementById('show');
  if(tes === null) {
    if(firstOperand === '0') {
      //disable backspace if there's no input yet
      return;
    }
    if(firstOperand.length > 1) {
      if(firstOperand[firstOperand.length-1] === '.') {
        dotUsed = false;
      }
      firstOperand = firstOperand.slice(0, firstOperand.length-1);
      bottomDisplay.textContent = firstOperand;
    }
    else {
      firstOperand = '0';
      bottomDisplay.textContent = '0';
    }
  }
  else {
    if(secondOperand === '0') {
      //disable backspace if there's no input yet
      return;
    }
    if(secondOperand.length > 1) {
      if(secondOperand[secondOperand.length-1] === '.') {
        dotUsed = false;
      }
      secondOperand = secondOperand.slice(0, secondOperand.length-1);
      bottomDisplay.textContent = secondOperand;
    }
    else {
      secondOperand = '0';
      bottomDisplay.textContent = '0';
    }
  }
}

function clearAll() {
  topDisplay.setAttribute('id', 'top-display');
  firstOperand = '0';
  secondOperand = '0';
  curOperator = '';
  bottomDisplay.textContent = '0';
  dotUsed = false;
}