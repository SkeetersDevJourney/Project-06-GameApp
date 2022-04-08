//////////////////////////////////////////////////////
//                   Audio Files                    //
//////////////////////////////////////////////////////

const keyClick = new Audio("audio/key-click.mp3");
const keyRelease = new Audio("audio/key-release.mp3");
const music = new Audio("audio/music.mp3");
const tickSound2 = new Audio('audio/tick1.1.mp3');
const tickSound1 = new Audio('audio/tick2.1.mp3');
const explosionSound = new Audio('audio/explosion.mp3');
const wrongBuzz = new Audio('audio/incorrect.mp3');
const crowd = new Audio('audio/crowd.mp3');
const fanfare = new Audio('audio/fanfare.mp3');
const ding = new Audio('audio/ding.mp3');

//////////////////////////////////////////////////////
//                   Start Game                     //
//////////////////////////////////////////////////////

const btnStart = document.getElementById('btn-start');
const overlay = document.querySelector('.overlay');
const main = document.querySelector('main');

btnStart.addEventListener('click', () => {
  overlay.className = "overlay";
  startGame();
});

function startGame() {
  overlay.style.display = 'none';
  main.style.display = 'block';
  music.currentTime = 0;
  music.play()
  music.volume = 0.15;
  wordsToFlex();
  startTimer();
  resetHearts();
}

//////////////////////////////////////////////////////
//                 Phrase Selector                  //
//////////////////////////////////////////////////////

const phrases = [
  'Javascript is the duct tape of the Internet.',
  'Simplicity is the soul of efficiency.',
  "Programming isn't about what you know; it's about what you can figure out.",
  'The best error message is the one that never shows up.',
  'First, solve the problem. Then, write the code.',
  'Fix the cause, not the symptom.',
  'Make it work, make it right, make it fast.',
  'Optimism is an occupational hazard of programming.',
  "It's not a bug. It's an undocumented feature!",
  'Great web design without functionality is like a sports car with no engine.',
  "One man's crappy software is another man's full time job.",
  'Talk is cheap. Show me the code.',
  'Website without visitors is like a ship lost in the horizon.'
];

/*  Retrieves random phrase from the phrases array & prevents 
    phrases from being selected twice in a row */

let selectedPhrase;
let previousNum;

function getRandomPhrase() {

  let randomNum = Math.floor(Math.random() * 14);

  if (randomNum !== previousNum) {
    selectedPhrase = `${phrases[randomNum]}`;
    previousNum = randomNum;
  } else {
    getRandomPhrase();
  }

  return selectedPhrase;
};


//////////////////////////////////////////////////////
//              Creating Phrase Markup              //
//////////////////////////////////////////////////////


/* */

function createWordFlex() {
  let flex = document.createElement('div');
  flex.className = 'word';
  return flex;
}

/*  Splits phrase array at every 'space' and stores 
    as an array of individual words  */

let words = [];

function splitPhrase() {
  let phrase = getRandomPhrase();
  words = phrase.split(' ');
}

/*  Creates a flexbox for each word in the phrase, 
    creates letter elements for each individual letter,
    and excludes punctionuation from game. */

const phraseContainer = document.querySelector('.phrase-container');

function wordsToFlex() {

  splitPhrase();

  words.forEach(word => { // cycles through each word in word array
    let flex = createWordFlex();

    for (let i=0; i<word.length; i++) { // loops through each letter

      text = word[i].toUpperCase();
      div = document.createElement('div');
      div.className = 'letter';

      if (   text == ';' 
          || text == '.'
          || text == "'"
          || text == ","
          || text == "!") {
        div.textContent = text;
        div.style.border = 'none';
      } else {
        div.textContent = ' ';
      }
      // Each letter appended to word flexbox
      flex.appendChild(div); 
    }
    // Each word appended to phrase flexbox
    phraseContainer.appendChild(flex); 
  });
}

//////////////////////////////////////////////////////
//                       Timer                      //
//////////////////////////////////////////////////////

const minutes = 9;   // Start time in minutes 

let seconds = Math.floor(minutes * 60); // Start time in seconds
originalSeconds = seconds; // Saves original second time for reset();

let quarterSecond = seconds * 4;  // Start time in quarter seconds
let originalTime = quarterSecond; // Saves original quarter seconds for reset();

/*  Time is stored in multiple different speeds in order to speed up 
    ticking sound when time is running out --- I'm sure this is a
    convoluted method but it's just how I figured it out */

let timerID; // for setInterval
let tick; // Boolean to alternate between 2 ticking sounds

const countdownEl = document.getElementById('countdown');
const light = document.querySelector('.light');

function startTimer() {
  timerID = setInterval(timer, 250);
}

// Plays ticking sound and toggles light indicator

function tick1() {
  tickSound1.currentTime = 0;
  tickSound1.play();
  lightToggle();
  tick = 0;
}

function tick2() {
  tickSound2.currentTime = 0;
  tickSound2.play();
  lightToggle();
  tick = 1;
}

// for animating the ticker light

function lightToggle() {
  light.className += ' light-on'; 
  setTimeout( () => {
    light.className = 'light'
  }, 150 );
}

function timer() {

  // 4x Speed hen timer is at 5 seconds left
  if (quarterSecond <= 20) { 
    if (tick) {
      tick1();
    } else {
      tick2();
    }

    // 2x Speed for when timer is between 5 and 12 seconds
  } else if (    quarterSecond > 20 
              && quarterSecond <= 60 
              && quarterSecond % 2 == 0) {

        if (tick) {
          tick1();
        } else {
          tick2();
        }
    
    // 1x Speed for the rest of the time
  } else if (quarterSecond % 4 == 0) {
      if (tick) {
        tick1();
      } else {
        tick2();
      }
  }
  
  quarterSecond--;

  if (quarterSecond % 4 == 0 ) { 
    seconds--;
  }

  if (quarterSecond <= -5) { /* Timer will sit of zero for a small
                                extended time to raise intensity */
    endGame();
  }

  if (quarterSecond < 20) {
    countdownEl.style.color = 'red';
  }

  /*  Converts tracked timer values into 
      values ready for display - compensates for values 
      lower than ten in the seconds display */

  let displayMinutes = Math.floor(seconds / 60); 
  let displaySeconds = seconds % 60;

  if (displaySeconds < 10 && displaySeconds > 0) { 
    displaySeconds = `0${displaySeconds}`;    
  } else if (displaySeconds <= 0) {
    displaySeconds = '00';
  }

  if (quarterSecond <= 0) {
    displayMinutes = '0';
  }
  
  countdownEl.innerHTML = `${displayMinutes}:${displaySeconds}`;
}

//////////////////////////////////////////////////////
//                    User Inputs                   //
//////////////////////////////////////////////////////

let health = 5;

const keyboard = document.querySelector('.keyboard');
let userInput = '';

let allHTMLLetters = document.getElementsByClassName('letter');

const hearts = document.querySelectorAll('.heart')
const ehearts = document.querySelectorAll('.eheart')

keyboard.addEventListener('mousedown', (e) => {
  const key = e.target;
  if (key.tagName === 'INPUT') {
    keyClick.currentTime = 0;
    keyClick.play();
  } 
});

let key;

keyboard.addEventListener('mouseup', (e) => { //click
  key = e.target;
  if (key.tagName === 'INPUT') {
    userInput = key.value;
    console.log(userInput);
    keyRelease.currentTime = 0; //
    keyRelease.play(); //
    checkInput();
  } else {
    console.log('not an input');
  }
  return key;
});

function checkInput() {

  let allLetters = selectedPhrase.replace(/ /g, '').toUpperCase();
  let check = true;

  for (let i=0; i<allLetters.length; i++) {
    if (userInput == allLetters[i]) {
      injectLetter = allLetters[i];
      letterLocation = allHTMLLetters[i];
      letterLocation.textContent = injectLetter;
      letterLocation.className += ' show';
      check = false;
    } 
  }

  let winCondition = 0;
  for (let i=0; i<allHTMLLetters.length; i++) {
    if (allHTMLLetters[i].textContent == ' ') {
      winCondition++;
    } 
  }

  if (winCondition == 0) {
    winGame();
  }

  key.disabled = 'true';
  key.style.color = 'white';

  // for animating clock color change when user makes a mistake

  function clockRedToggle() {
    countdownEl.style.color = 'red'; 
    setTimeout( () => {
      countdownEl.style.color = 'white'; 
    }, 500 );
  }

  if (check == true) {
    health--;
    seconds -= 10;
    quarterSecond -= 40;
    wrongBuzz.currentTime = 0;
    wrongBuzz.play();
    console.log(`Health: ${health}`);
    if (quarterSecond > 20) {
      clockRedToggle();
    } 
  } 
  
  if (health == 4) {
    hearts[0].style.display = 'none';
    ehearts[0].style.display = 'inline-block';
  } else if (health == 3) {
    hearts[1].style.display = 'none';
    ehearts[1].style.display = 'inline-block';
  } else if (health == 2) {
    hearts[2].style.display = 'none';
    ehearts[2].style.display = 'inline-block';
  } else if (health == 1) {
    hearts[3].style.display = 'none';
    ehearts[3].style.display = 'inline-block';
  }

  if (health <= 0) {
    endGame();
  }

}

//////////-- EndGame Overlay (Lost) and Resets --//////////

const overlayText = document.querySelector('p');
const resetBtn = document.getElementById('btn-start');
const spareKey = document.getElementById('sf');

function resetHearts() {
  for(let i=0; i<hearts.length; i++) {
    hearts[i].style.display = 'inline-block';
  }
  for(let i=0; i<ehearts.length; i++) {
    ehearts[i].style.display = 'none';
  }
}

function reset() {

  countdownEl.style.color = 'white';
  phraseContainer.innerHTML = '';
  health = 5;

  seconds = originalSeconds;
  quarterSecond = originalTime;

  light.className = 'light';

  crowd.currentTime = 0;
  fanfare.currentTime = 0;
  explosionSound.currentTime = 0;

  const allKeys = document.getElementsByClassName('key');
  for (let i=0; i<allKeys.length; i++) {
    allKeys[i].removeAttribute('disabled');
    allKeys[i].removeAttribute('style');
  }
  spareKey.disabled = 'true';
  resetHearts();

  clearInterval(timerID);
}

function endGame() {
  overlay.style.display = 'flex';
  main.style.display = 'none';

  overlayText.textContent = 'BOOM! Next time try to cut the red wire... Oh wait... my bad. Wrong game.';
  overlayText.style.fontSize = '1em';
  resetBtn.value = 'TRY AGAIN';
  overlay.className += ' end-game';

  
  explosionSound.play();

  music.pause();
  reset();
}

// function lightToggle() {
//   light.className += ' light-on'; 
//   setTimeout( () => {
//     light.className = 'light'
//   }, 150 );
// }

function winGame() {

  clearInterval(timerID);

  ding.currentTime = 0;
  ding.play();
  light.className = '';
  light.className += 'light light-win';

  setTimeout( () => {
    overlay.style.display = 'flex';
    main.style.display = 'none';

    overlayText.textContent = 'Nicely done! You beat the game without even breaking a sweat! Want to play again?';
    resetBtn.value = 'PLAY AGAIN';
    overlay.className += ' win-game';

    music.pause();
    crowd.play();
    crowd.volume = .5;
    fanfare.play();
    fanfare.volume = .4;
    reset();
  }, 2000 );

  
}
