import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const datetimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timerContainer = document.querySelector('.timer-container');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
let intervalId = null;
let targetDate = null; // Зберігатимемо цільову дату

function isValidDate(date) {
  return date > new Date();
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function resetTimer() {
  clearInterval(intervalId);
  daysEl.textContent = '00';
  hoursEl.textContent = '00';
  minutesEl.textContent = '00';
  secondsEl.textContent = '00';
  datetimePicker.disabled = false;
  targetDate = null; // Скидаємо цільову дату
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

function updateInterface(time) {
  daysEl.textContent = addLeadingZero(time.days);
  hoursEl.textContent = addLeadingZero(time.hours);
  minutesEl.textContent = addLeadingZero(time.minutes);
  secondsEl.textContent = addLeadingZero(time.seconds);
}

function calculateTimeLeft() {
  const currentTime = new Date();
  const timeDifference = targetDate - currentTime;

  return timeDifference <= 0 ? 0 : timeDifference;
}

function onDateSelect(selectedDates) {
  const selectedDate = selectedDates[0];

  if (!isValidDate(selectedDate)) {
    alert('Error: Please choose a date in the future.');
  } else {
    targetDate = new Date(selectedDate); // Зберігаємо цільову дату
    startBtn.disabled = false;
  }
}

function onStartTimer() {
  if (!targetDate) {
    alert('Error: Please pick a date first!');
    return;
  }

  if (intervalId) {
    resetTimer();
    alert('Timer reset.');
    return;
  }

  startBtn.disabled = true;
  datetimePicker.disabled = true;

  intervalId = setInterval(() => {
    const timeLeft = calculateTimeLeft();

    if (timeLeft <= 0) {
      clearInterval(intervalId);
      intervalId = null;
      resetTimer();
      alert('Timer has ended!');
    }

    updateInterface(convertMs(timeLeft));
  }, 1000);
}

flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: onDateSelect,
});

startBtn.addEventListener('click', onStartTimer);
