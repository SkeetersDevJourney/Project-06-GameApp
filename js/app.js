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
  phraseToLi();
});

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

//////////-- Random Phrase Selector --//////////

const phrases = [
  'Javascript rules!',
  'Treehouse Techdegree',
  'Front-End Web Dev',
  'Arrays are easy.',
  'Hello from app.js',
];

/* This function stops phrases from being selected twice in a row */

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
};


//////////-- Create Phrase Markup --//////////

const phraseContainer = document.querySelector('.phrase-container');

function phraseToLi() {
  getRandomPhrase();
  for (let i=0; i<selectedPhrase.length; i++) {
    let text = selectedPhrase[i];
    createLiEl(text);
  }
}

function createLiEl(text) {
  let li = document.createElement('li');
  li.className = 'letter';
  li.textContent = text;
  if (text == ' ' 
      || text == '!' 
      || text == '.'
      || text == '-') {
    li.style.borderBottom = 'none';
  }
  phraseContainer.appendChild(li);
  console.log(phraseContainer.appendChild(li));
}


