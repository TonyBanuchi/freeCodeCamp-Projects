const output = document.getElementById('output');
const input = document.getElementById('number');
const button = document.getElementById('convert-btn');

button.addEventListener('click', () => { output.classList.add('output-border') });

const validateInput = () => {
  const inputString = input.value;
  const inputInt = parseInt(inputString);
  /* Number */
  if (isNaN(inputInt) || inputString === '' || !(/^(-*\d+)$/.test(inputString))) {
    updateOutput("Please enter a valid number", false);
    return;
  }

  /* greater than 1*/
  if (inputInt <= 0) {
    updateOutput("Please enter a number greater than or equal to 1", false);
    return;
  }

  /* greater than 1*/
  if (inputInt >= 4000) {
    updateOutput("Please enter a number less than or equal to 3999", false);
    return;
  }

  updateOutput(romanNumeralRecursion(inputInt));
  return;
}

const updateOutput = (msg, isValid = true) => {
  isValid ? output.classList.remove('error') : output.classList.add('error');
  output.innerText = msg;
  return;
}

const romanNumeralRecursion = (inInt, outString = '') => {
  /* Roman numeral Conversion values
M:1000, CM:900, D:500, CD:400, C:100, XC:90, L:50, XL:40, X:10, IX:9, V:5, IV:4, I:1
*/
  if (inInt === 0) {
    return outString;
  } else if (inInt >= 1000) {
    inInt -= 1000;
    outString += 'M';
  } else if (inInt >= 900) {
    inInt -= 900;
    outString += 'CM';
  } else if (inInt >= 500) {
    inInt -= 500;
    outString += 'D';
  } else if (inInt >= 400) {
    inInt -= 400;
    outString += 'CD';
  } else if (inInt >= 100) {
    inInt -= 100;
    outString += 'C';
  } else if (inInt >= 90) {
    inInt -= 90;
    outString += 'XC';
  } else if (inInt >= 50) {
    inInt -= 50;
    outString += 'L';
  } else if (inInt >= 40) {
    inInt -= 40;
    outString += 'XL';
  } else if (inInt >= 10) {
    inInt -= 10;
    outString += 'X';
  } else if (inInt >= 9) {
    inInt -= 9;
    outString += 'IX';
  } else if (inInt >= 5) {
    inInt -= 5;
    outString += 'V';
  } else if (inInt >= 4) {
    inInt -= 4;
    outString += 'IV';
  } else {
    inInt -= 1;
    outString += 'I';
  }
  return romanNumeralRecursion(inInt, outString);
}

