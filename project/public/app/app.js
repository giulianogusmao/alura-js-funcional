import './utils/array-helpers.js';
import { timeoutPromise, delayPromise as delay, retry } from './utils/promise-helpers.js';
import { notasService as service } from './nota/service.js';
import { log, takeUntil, debounceTime, partialize, composer } from './utils/operators.js';

const operation = composer(
    partialize(debounceTime, 500),
    partialize(takeUntil, 3)
);

const calcTotal = () => timeoutPromise(200, service.sumItems('2143'));

const action = operation(() => {
    retry(3, 3000, calcTotal)
        .then(delay(2000))
        .then(log)
        .catch(console.error);
});

document
    .querySelector('#myButton')
    .onclick = action;