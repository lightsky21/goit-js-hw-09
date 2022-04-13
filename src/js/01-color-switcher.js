const startBtnEl = document.querySelector('button[data-start]');
const stopBtnEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

const COLOR_DELAY = 1000;
// startBtnEl.disabled = false;
let timerColorId = null;
// console.log(bodyEl)
startBtnEl.addEventListener('click', onStartBtnElClick);
stopBtnEl.addEventListener('click', onStopBtnElClick);


// startBtnEl.setAttribute('disabled', 'true');
function onStartBtnElClick() {
    if (startBtnEl.disabled) {
        return
    }
    timerColorId = setInterval(changeColor, COLOR_DELAY);
    
    startBtnEl.disabled = true;
    stopBtnEl.disabled = false;
}

function onStopBtnElClick() {
    clearInterval(timerColorId)
    startBtnEl.disabled = false;
    stopBtnEl.disabled = true;
}

function changeColor() {
    const color = getRandomHexColor();
    bodyEl.style.backgroundColor = color;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
  
