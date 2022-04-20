import { Notify } from 'notiflix/build/notiflix-notify-aio';

const buttonEl = document.querySelector('button');
const formEl = document.querySelector('form');
// const amountInputEl = document.querySelector('input[name="amount"]');
// const stepInputEl = document.querySelector('input[name="step"]');
// const delayInputEl = document.querySelector('input[name="delay"]');


// for (let index = 0; index < array.length; index++) {
//   const element = array[index];

// }
formEl.addEventListener('submit', onFormElSubmit)


function onFormElSubmit(e) {
  e.preventDefault();
  const {
    elements: { delay, step, amount }
  } = e.currentTarget;
 
  // const formElData = {
  //   amount: JSON.parse(e.currentTarget.elements.amount.value),
  //   step: JSON.parse(e.currentTarget.elements.step.value),
  //   delay: JSON.parse(e.currentTarget.elements.delay.value),
  // }
  const formElData = {
    amount: JSON.parse(amount.value),
    step: JSON.parse(step.value),
    delay: JSON.parse(delay.value),
  }
  
  CreateChainOfPromises(formElData);
  
}



function CreateChainOfPromises({amount, step, delay}) {
  let totalDelay = delay;
  for (let index = 1; index <= amount; index += 1) {
  createPromise(index, totalDelay)
  .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    totalDelay += step;
}
}


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position: position, delay: delay });
      } else {
        reject({ position: position, delay: delay });
      }
    }, delay);
  });
  
}