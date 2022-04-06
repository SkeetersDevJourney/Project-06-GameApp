//////////-- Initializing Audio Files --//////////

const keyClick = new Audio("../audio/key-click.mp3");
const keyRelease = new Audio("../audio/key-release.mp3");

//////////-- Retrieving Elements --//////////

const btnStart = document.getElementById('btn-start');
const overlay = document.querySelector('.overlay');
const main = document.querySelector('main');
const light = document.querySelector('.light');


//////////-- Start Game Overlay --//////////

btnStart.addEventListener('click', () => {
  overlay.style.display = 'none';
  main.style.display = 'block';
  wordsToFlex();
  startTimer();
});

//////////-- Random Phrase Selector --//////////

const phrases = [
  'Javascript is the duct tape of the Internet.',
  'Simplicity is the soul of efficiency.',
  "Programming isn't about what you know; it's about what you can figure out.",
  'The best error message is the one that never shows up.',
  'First, solve the problem. Then, write the code.',
  'Fix the cause, not the symptom.',
  'Make it work, make it right, make it fast.',
  'Optimism is an occupational hazard of programming.',
  'Java is to JavaScript what car is to Carpet.',
];

/* retrieves random phrase and stops phrases from being selected twice in a row */

let selectedPhrase;
let previousNum;
function getRandomPhrase () {

  let randomNum = Math.floor(Math.random() * 5);

  if (randomNum !== previousNum) {
    selectedPhrase = `${phrases[randomNum]}`;
    // console.log(selectedPhrase);
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
  // console.log(words);
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
    // console.log(flex);
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



///////////////////////////////////////////////////////////
//                          Timer                        //    
///////////////////////////////////////////////////////////
/*
const startingMinutes = 1;       // Starting time in minutes
let seconds = startingMinutes * 60;  // Calculates starting time in secs

const countdownEl = document.getElementById('countdown');
const tickSound1 = new Audio('../audio/tick1.mp3');
const tickSound2 = new Audio('../audio/tick2.mp3');

function startTimer() { // Allows user to start timer when ready
  setInterval(updateCountdown, 1000); // setInterval(functionName, interval in ms)
}

function updateCountdown() {
  const displayMinutes =  Math.floor(seconds / 60); 
  let displaySeconds = seconds % 60;

  if (displaySeconds < 10) {
    displaySeconds = `0${displaySeconds}`;
  }

  if (displaySeconds % 2 == 0) { 
    tickSound1.play();
    console.log('tick 1')
  } else {
    tickSound2.play();
    console.log('tick 2')
  }


  countdownEl.innerHTML = `${displayMinutes}:${displaySeconds}`;
  seconds--;
}
*/
////////////////////////////////////////////////////////////////////////

const tickSound2 = new Audio('../audio/tick1.1.mp3');
const tickSound1 = new Audio('../audio/tick2.1.mp3');
const explosionSound = new Audio('../audio/explosion.mp3');

const minutes = 0.5;
let seconds = Math.floor(minutes * 60);
originalSeconds = seconds;
let quarterSecond = seconds * 4;
let originalTime = quarterSecond;
let timerID;
let tick; 

const countdownEl = document.getElementById('countdown');

function startTimer() {
  timerID = setInterval(timer, 250);
}


function timer() {

  if (quarterSecond <= 20) {
    if (tick) {
      tickSound1.play();
      lightToggle();
      tick = 0;
    } else {
      tickSound2.play();
      lightToggle();
      tick = 1;
    }

  } else if (quarterSecond > 20 && quarterSecond <= 60 && quarterSecond % 2 == 0) {
        if (tick) {
          tickSound1.play();
          lightToggle();
          tick = 0;
        } else {
          tickSound2.play();
          lightToggle();
          tick = 1;
        }

  } else if (quarterSecond % 4 == 0) {
      if (tick) {
        tickSound1.play();
        lightToggle();
        tick = 0;
      } else {
        tickSound2.play();
        lightToggle();
        tick = 1;
      }
  }
  
  quarterSecond--;
  console.log(quarterSecond);
  
  if (quarterSecond == -5) {
    endGame();
  }

  if (quarterSecond % 4 == 0 ) { 
    seconds--;
  }

  if (quarterSecond < 20) {
    countdownEl.style.color = 'red';
  }

  let displayMinutes =  Math.floor(seconds / 60); 
  let displaySeconds = seconds % 60;

    if (displaySeconds < 10 && displaySeconds > 0) {
      displaySeconds = `0${displaySeconds}`;
    } else if (displaySeconds <= 0) {
      displaySeconds = '00';
      displayMinutes = '0';
    }
  
  countdownEl.innerHTML = `${displayMinutes}:${displaySeconds}`;
}


/////////-- Toggle Light --//////////

function lightToggle() {
  light.className += ' light-on'; 
  setTimeout( () => {
    light.className = 'light'
  }, 150 );
}

////////////////////////////////////////////////////////////////////////

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

  if (health <= 0) {
    endGame();
    
  }

});


//////////-- EndGame Overlay (Lost) --//////////



function endGame() {
  const overlayText = document.querySelector('p');
  const resetBtn = document.getElementById('btn-start');

  overlay.style.display = 'flex';
  main.style.display = 'none';

  overlayText.textContent = 'BOOM! Next time try to cut the red wire... Oh wait... my bad. Wrong game.';
  resetBtn.value = 'Reset';
  overlay.className += ' end-game';

  phraseContainer.innerHTML = '';
  health = 5;
  seconds = originalSeconds;
  quarterSecond = originalTime;

  clearInterval(timerID);
  explosionSound.currentTime = 0;
  explosionSound.play();
}

