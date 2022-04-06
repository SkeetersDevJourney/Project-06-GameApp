//////////-- Initializing Audio Files --//////////

const keyClick = new Audio("../audio/key-click.mp3");
const keyRelease = new Audio("../audio/key-release.mp3");

//////////-- Retrieving Elements --//////////

const btnStart = document.getElementById('btn-start');
const overlay = document.querySelector('.overlay');
const main = document.querySelector('main');

//////////-- Start Game Overlay --//////////

btnStart.addEventListener('click', () => {
  overlay.style.display = 'none';
  main.style.display = 'block';
  wordsToFlex();
});

//////////-- Random Phrase Selector --//////////

const phrases = [
  'Javascript is the duct tape of the Internet.',
  'Simplicity is the soul of efficiency.',
  "Programming isn't about what you know; it's about what you can figure out.",
  'The best error message is the one that never shows up.',
  'First, solve the problem. Then, write the code.',
];

/* retrieves random phrase and stops phrases from being selected twice in a row */

let selectedPhrase;
let previousNum;
function getRandomPhrase () {

  let randomNum = Math.floor(Math.random() * 5);

  if (randomNum !== previousNum) {
    selectedPhrase = `${phrases[randomNum]}`;
    console.log(selectedPhrase);
    previousNum = randomNum;
  } else {
    getRandomPhrase();
  }
  return selectedPhrase;
};


//////////-- Create Phrase Markup --//////////

let words = [];

function splitPhrase() {
  let phrase = getRandomPhrase();
  words = phrase.split(' ');
  console.log(words);
}

const phraseContainer = document.querySelector('.phrase-container');

function createWordFlex() {
  let flex = document.createElement('div');
  flex.className = 'word';
  return flex;
}

function wordsToFlex() {
  splitPhrase();
  words.forEach(word => {
    let flex = createWordFlex();
    for (let i=0; i<word.length; i++) {
      text = word[i].toUpperCase();
      div = document.createElement('div');
      div.className = 'letter';
      if (text == ';' 
          || text == '.'
          || text == "'"
          || text == ",") {
        div.textContent = text;
        div.style.border = 'none';
      } else {
        div.textContent = ' ';
      }
      // div.textContent = text; //change out
      flex.appendChild(div);
    }
    console.log(flex);
    phraseContainer.appendChild(flex);
  });
}

//////////-- Keyboard Clicking Events --//////////

const keyboard = document.querySelector('.keyboard');
let userInput = '';

keyboard.addEventListener('mousedown', (e) => {
  const key = e.target;
  if (key.tagName === 'INPUT') {
    userInput = key.value;
    keyRelease.play()
    console.log(userInput);
    keyboard.addEventListener('mouseup', (e) => {
      const key = e.target;
      if (key.tagName === 'INPUT') {
        keyClick.play()
      }
    });
  }
});

//////////-- Input Checks --//////////

// keyboard.addEventListener('click', (e) => {

//   const key = e.target;
//   const matchDiv = document.getElementsByClassName('letter');
//   if (key.tagName === 'INPUT') {
//     words.forEach(word => {
//       for (let i=0; i<word.length; i++) {
//         if (word[i].toUpperCase() == userInput) {
//           const matchIndex = word.indexOf(word[i]);
//           console.log(matchIndex);


//         } else {
//         }
//       }
//     });
// }
// })

// function throughWords() {
//   words.forEach(word => {
//     for (let i=0; i<word.length; i++)
//     console.log(word.indexOf(word[i]));
//   });
// }

let health = 5;

keyboard.addEventListener('click', (e) => {
  let allLetters = selectedPhrase.replace(/ /g, '').toUpperCase();
  const found = userInput.match(allLetters);
  let check = true;

  console.log(allLetters);

  for (let i=0; i<allLetters.length; i++) {
    let allHTMLLetters = document.getElementsByClassName('letter');
    if (userInput == allLetters[i]) {
      injectLetter = allLetters[i];
      letterIndex = allHTMLLetters[i];
      letterIndex.textContent = injectLetter;
      check = false;
    } 
  }

  if (check == true) {
    health--;
    console.log(`Health: ${health}`);
  }

  if (health == 0) {
    endGame();
  }
});


//////////-- EndGame Overlay (Lost) --//////////

function endGame() {
  const overlayText = document.querySelector('p');
  const resetBtn = document.getElementById('btn-start');

  overlay.style.display = 'flex';
  main.style.display = 'none';

  overlayText.textContent = 'Bummer! Next time try to cut the red wire... Oh wait... my bad. Wrong game.';
  resetBtn.value = 'Reset';
  overlay.className += ' end-game';

  phraseContainer.innerHTML = '';
  health = 5;
}


