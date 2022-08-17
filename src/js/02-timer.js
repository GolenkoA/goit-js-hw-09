import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const timeTable = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');

startBtn.setAttribute('disabled', 'disabled');

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');


timeTable.addEventListener('click', flatpickr);
startBtn.addEventListener('click', onStartTimer);
let deadTime = 0;

flatpickr(timeTable, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose
});

function onClose(selectedDates) {
    deadTime = selectedDates[0];
      if (deadTime < Date.now()) {
          Notify.failure("Please choose a date in the future");
      return
    }
    startBtn.removeAttribute('disabled');
    const deltaTimeON = deadTime - Date.now();
    updateTime(convertMs(deltaTimeON));
}

function onStartTimer() {
  const intervalId = setInterval(() =>  {
        const deltaTime = deadTime - Date.now();
        if (deltaTime <= 0) {
            clearInterval(intervalId);
          return;
        }
      updateTime(convertMs(deltaTime));
     }, 1000)
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addPad(Math.floor(ms / day));
  // Remaining hours
  const hours = addPad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addPad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addPad(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}

function addPad(value) {
    return value.toString().padStart(2, '0');
}

function updateTime({ days, hours, minutes, seconds }) {
  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}

