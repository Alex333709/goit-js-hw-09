import notiflix from 'notiflix';

// Функція для створення промісу
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// Обробник події на відправку форми
function onSubmitForm(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  const firstDelay = Number(formData.get('delay'));
  const step = Number(formData.get('step'));
  const amount = Number(formData.get('amount'));

  let accumulatedDelay = 0;

  for (let i = 1; i <= amount; i++) {
    createPromise(i, firstDelay + accumulatedDelay)
      .then(({ position, delay }) => {
        notiflix.Notify.success(`✅ Проміс ${position} виконано за ${delay}мс`);
      })
      .catch(({ position, delay }) => {
        notiflix.Notify.failure(
          `❌ Проміс ${position} відхилено за ${delay}мс`
        );
      });

    accumulatedDelay += step;
  }
}

// Додаємо обробник події на відправку форми
const form = document.querySelector('.form');
form.addEventListener('submit', onSubmitForm);
