const keyClick = new Audio("../audio/key-click.mp3");
const keyRelease = new Audio("../audio/key-release.mp3");

const btnStart = document.getElementById('btn-start');
const overlay = document.querySelector('.overlay');
const main = document.querySelector('main');
const p = document.getElementById('gametext');

btnStart.addEventListener('click', () => {
  overlay.style.display = 'none';
  main.style.display = 'block';
});

const keyboard = document.querySelector('.keyboard');
let userInput = '';

keyboard.addEventListener('mousedown', (e) => {
  const key = e.target;
  if (key.tagName === 'INPUT') {
    userInput = key.value;
    keyRelease.play()
    console.log(userInput);
    p.innerHTML += userInput;
  }
  
  keyboard.addEventListener('mouseup', () => {
    if (key.tagName === 'INPUT') {
      keyClick.play()
    }
  });
});




