// Отримуємо елементи кнопок
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

// Функція для генерації випадкового кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// Змінна для збереження ідентифікатора інтервалу
let intervalId = null;

// Обробник кліку по кнопці Start
startBtn.addEventListener('click', () => {
  // Вимикаємо кнопку Start
  startBtn.disabled = true;
  stopBtn.style.opacity = 1;
  // Запускаємо інтервал зміни кольору
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

// Обробник кліку по кнопці Stop
stopBtn.addEventListener('click', () => {
  // Зупиняємо інтервал
  clearInterval(intervalId);

  // Вмикаємо кнопку Start знову
  startBtn.disabled = false;
  stopBtn.style.opacity = 0.5;
});
