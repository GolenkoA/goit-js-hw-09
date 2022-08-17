
const startBtnBackgroundColor = document.querySelector('button[data-start]');
const stopBtnBackgroundColor = document.querySelector('button[data-stop]');

stopBtnBackgroundColor.setAttribute('disabled', 'disabled');
let IntervalId = '';

startBtnBackgroundColor.addEventListener('click', startBackgroundColor);
stopBtnBackgroundColor.addEventListener('click', stoptBackgroundColor);

const TIME_OUT = 1000;

function startBackgroundColor() {
    
    startBtnBackgroundColor.setAttribute('disabled', 'disabled');
    stopBtnBackgroundColor.removeAttribute('disabled');
    IntervalId = setInterval(() => document.body.style.backgroundColor = getRandomHexColor(), TIME_OUT);
};

function stoptBackgroundColor() {

    clearInterval(IntervalId)
    startBtnBackgroundColor.removeAttribute('disabled');
    stopBtnBackgroundColor.setAttribute('disabled', 'disabled');
};


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}