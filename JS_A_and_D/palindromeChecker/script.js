const testButton = document.getElementById('check-btn');
const inputText = document.getElementById('text-input');
const resultText = document.getElementById('result');
const explainText = document.getElementById('explained');
const wordExampleText = document.getElementById('word-example');
const phraseExampleText = document.getElementById('phrase-example');
const sentenceExampleText = document.getElementById('sentence-example');
const answerBox = document.getElementById('content4');

const palindromes = {
  word: ['Anna', 'civic', 'kayak', 'level', 'madam', 'mom', 'noon', 'racecar', 'radar', 'redder', 'refer', 'repaper', 'rotator', 'rotor', 'sagas', 'solos', 'stats', 'tenet', 'wow', '1881', '2002'],
  phrase: ['taco cat', 'my gym', 'red rum, sir, is murder', 'top spot', 'no lemon, no melon', 'never odd or even', '1/11/11', '12-02-2012'],
  sentence: ["Don't nod.", 'I did, did I?', 'Step on no pets.', 'Eva, can I see bees in a cave?', 'Was it a cat I saw?', 'Sit on a potato pan, Otis.', "Madam, I'm Adam.", "A man. A plan. A canal. Panama."]
}

const selectPalindrome = (examples) => examples[Math.floor(Math.random() * examples.length)];

const selectExamples = () => {
  return {
    word: selectPalindrome(palindromes.word),
    phrase: selectPalindrome(palindromes.phrase),
    sentence: selectPalindrome(palindromes.sentence)
  };
};

const updateExamples = () => {
  const examples = selectExamples();
  wordExampleText.innerText = examples.word;
  phraseExampleText.innerText = examples.phrase;
  sentenceExampleText.innerText = examples.sentence;
};

updateExamples();

const reportFalseResult = () => {
  content4.classList.add('incorrect');
  resultText.innerHTML = `<strong>${inputText.value}</strong> is not a palindrome`
};

const reportTrueResult = () => {
  content4.classList.add('correct');
  resultText.innerHTML = `<strong>${inputText.value}</strong> is a palindrome`
};

const resetClasses = () => {
  if (content4.classList.contains('correct')) {
    content4.classList.remove('correct');
  }
  if (content4.classList.contains('incorrect')) {
    content4.classList.remove('incorrect');
  }
}

const filterArray = ()=>{
  const regEx = /[^A-z0-9]/gi;
  const filteredString = inputText.value.replace(regEx, '');
  console.log(filteredString);
  return inputArray.filter((char) => regEx.test(char));
};

const checkPalindrome = () => {
  if (inputText.value === "") {
    alert("Please input a value");
    return;
  }
  resetClasses();
  updateExamples();
  
  const regEx = /[^A-Za-z0-9]/gi;
  const filteredString = inputText.value.replace(regEx, '').toLowerCase();
  console.log(filteredString);
  
  if(filteredString.length < 1){
    reportFalseResult();
    return;
  } else if (
    filteredString === [...filteredString].reverse().join('')
  ){
    reportTrueResult();
  } else {
    reportFalseResult();
  }
};

testButton.addEventListener("click", checkPalindrome);
