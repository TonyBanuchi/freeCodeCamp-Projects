const input = document.getElementById('user-input');
const results = document.getElementById('results-div');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const currTime = document.getElementById('curr-time');

const setKeyAction = (el) => el.addEventListener('click',() => dial(el.id));
const numbersOnly = (inString) => inString.replace(/[^0-9]/g, '');

const dial = (num) => {
  const numString = `${input.value}${num}`;

  const numOnly = numbersOnly(numString);
  switch (numOnly.length) {
    // # (###) | ###-#
    case 4: {
      input.value = numOnly.startsWith(1) ? `${numOnly[0]} (${numOnly.substring(1, 4)})` : `${numOnly.substring(0, 3)}-${numOnly[3]}`;
      break;
    }
    // # (###) # | ###-##
    case 5:
    // # (###) ## | ###-###
    case 6:
    // # (###) ### | ###-#### 
    case 7: {
      input.value = numOnly.startsWith(1) ? `${numOnly[0]} (${numOnly.substring(1, 4)}) ${numOnly.substring(4)}` : `${numOnly.substring(0, 3)}-${numOnly.substring(3)}`;
      break;
    }
    // # (###) ###-# | (###) ###-##
    case 8:
    // # (###) ###-## | (###) ###-###
    case 9:
    // # (###) ###-### | (###) ###-####
    case 10: {
      input.value = numOnly.startsWith(1) ?
        `${numOnly[0]} (${numOnly.substring(1, 4)}) ${numOnly.substring(4, 7)}-${numOnly.substring(7)}` :
        `(${numOnly.substring(0, 3)}) ${numOnly.substring(3, 6)}-${numOnly.substring(6)}`;
      break;
    }
    // # (###) ###-####
    case 11: {
      input.value = numOnly.startsWith(1) ? `${numOnly[0]} (${numOnly.substring(1, 4)}) ${numOnly.substring(4, 7)}-${numOnly.substring(7)}` : numString;
      break;
    }
    default: input.value = numString;
  }
}

const updateOutput = (valid) => {
  const content = `${valid ? 'V' : 'Inv'}alid US number: ${input.value.trim()}`
  const element = document.createElement('span');
  element.classList.add(valid ? 'valid' : 'invalid', 'output-result');
  element.ariaLabel = 'output entry';
  element.innerHTML = content;
  results.appendChild(element);

}

const resetInAndOut = () => {
  input.value = '';
  results.innerHTML = '';
}

const checkInput = () => {
  if (input.value === '') {
    alert("Please provide a phone number");
    return;
  }
  const inString = input.value;
  const numString = numbersOnly(inString);

  if (
    (
      (numString.length === 11 && numString.startsWith('1')) ||
      (numString.length === 10 && !(numString.startsWith('1')))
    ) &&
    /^[1(\d][\s(\d][\d(][\d-][\d)][\d-\s)][\d)][\d\s-][\d-][\d\s-][\d]?[\d-]?[\d]{0,4}$/.test(inString) &&
    (
      /(?:\(\d{3}\))/.test(inString) ||
      /^[^()]+$/.test(inString)
    )
  ) {
    updateOutput(true);
  } else {
    updateOutput(false);
  }
  input.value = '';
}

const setTime = () => {
  const dateTimeObj = new Date();
  const dtString = dateTimeObj.toLocaleTimeString();
  currTime.innerText = dtString.substring(0,dtString.length-6) + dtString.substring(dtString.length - 3);
}


setInterval(setTime, 100);
Array.from(document.getElementsByClassName('key-btn')).forEach(el => setKeyAction(el));
checkBtn.addEventListener('click',checkInput);
clearBtn.addEventListener('click',resetInAndOut);

