import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const dataTimeInputEl = document.querySelector('#datetime-picker');
const daysValueSpanEl = document.querySelector('span[data-days]');
const hoursValueSpanEl = document.querySelector('span[data-hours]');
const minutesValueSpanEl = document.querySelector('span[data-minutes]');
const secondsValueSpanEl = document.querySelector('span[data-seconds]');
const buttonStartEl = document.querySelector('button[data-start]')

buttonStartEl.disabled = true;

let intervalId = null;





const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
   
    //   console.log(selectedDates[0] - options.defaultDate.getTime() );
    if (selectedDates[0] < Date.now) {
      alert("Please choose a date in the future");
    } else { buttonStartEl.disabled = false; }
   
  },
};






flatpickr('#datetime-picker', 
 options );



buttonStartEl.addEventListener('click', onButtonStartElClick);

function startTimer() {
  
  const currentTime = Date.now();
  const futureTime = new Date(dataTimeInputEl.value);
 
  const deltaTime = futureTime - currentTime;
  
  const timerObj = convertMs(deltaTime);

  const timerFaceObj = addLeadingZero(timerObj);

  updateTimerFace(timerFaceObj);

  if (deltaTime < 1000) {
    clearInterval(intervalId)
  }
}

function onButtonStartElClick() {
  
  buttonStartEl.disabled = true;
  dataTimeInputEl.disabled = true;
  
  intervalId = setInterval(startTimer, 1000);
  
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}



 function addLeadingZero({days, hours, minutes, seconds }) {
   const daysTimerFace = String(days).padStart(2, '0');
   const hoursTimerFace = String(hours).padStart(2, '0');
   const minutesTimerFace = String(minutes).padStart(2, '0');
   const secondsTimerFace = String(seconds).padStart(2, '0');

   return { daysTimerFace, hoursTimerFace, minutesTimerFace, secondsTimerFace };
  }

function updateTimerFace({ daysTimerFace, hoursTimerFace, minutesTimerFace, secondsTimerFace }) {
  daysValueSpanEl.textContent = daysTimerFace;
  hoursValueSpanEl.textContent = hoursTimerFace;
  minutesValueSpanEl.textContent = minutesTimerFace;
  secondsValueSpanEl.textContent = secondsTimerFace;

  }