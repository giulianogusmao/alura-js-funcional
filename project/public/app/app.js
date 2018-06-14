import './utils/array-helpers.js';
import { log } from './utils/promise-helpers.js';
import { notasService as service } from './nota/service.js';
import { takeUntil, debounceTime, partialize, composer } from './utils/operators.js';

const operation = composer(
    partialize(debounceTime, 500),
    partialize(takeUntil, 3)
);

const action = operation(() => {
    service
        .sumItems('2143')
        .then(log)
        .catch(console.error);
});

document
    .querySelector('#myButton')
    .onclick = action;