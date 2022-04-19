const buttonEl = document.querySelector('button');
const formEl = document.querySelector('form');
const amountInputEl = document.querySelector('input[name="amount"]');
const stepInputEl = document.querySelector('input[name="step"]');
const delayInputEl = document.querySelector('input[name="delay"]');


// for (let index = 0; index < array.length; index++) {
//   const element = array[index];

// }
formEl.addEventListener('submit', onFormElSubmit)


function onFormElSubmit(e) {
  e.preventDefault();
 
  const formElData = {
    amount: JSON.parse(amountInputEl.value),
    step: JSON.parse(stepInputEl.value),
    delay: JSON.parse(delayInputEl.value),
  }
  
  CreateChainOfPromises(formElData);
  
}



function CreateChainOfPromises({amount, step, delay}) {
  let totalDelay = delay;
  for (let index = 1; index <= amount; index += 1) {
  createPromise(index, totalDelay)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
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