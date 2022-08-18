import { Notify } from 'notiflix/build/notiflix-notify-aio';

const firstDelay = document.querySelector('[name="delay"]');
const delayStep = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');
const createBtn = document.querySelector('[type="submit"]');

createBtn.addEventListener('click', startCreatePromise);

function startCreatePromise(evt) { 
  evt.preventDefault()

  const valueFirstDelay = Number(firstDelay.value);
  const valueDelayStep = Number(delayStep.value);
  const valueAmount = Number(amount.value);
  let delay = valueFirstDelay;

  for (let i = 1; i <= valueAmount; i += 1) {
    createPromise(i, delay).then(resultFulfill).catch(resultReject);
    delay += valueDelayStep;
  }
};

function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
  
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }, delay);
  })
};

function resultFulfill(result) {
  Notify.success(result);
};

function resultReject(error) {
  Notify.failure(error);
};