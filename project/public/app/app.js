import './utils/array-helpers.js';
import { log } from './utils/promise-helpers.js';
import { notasService as service } from './nota/service.js';
import { takeUntil, debounceTime } from './utils/operators.js';

const getTotalNotas = () => {
    service
        .sumItems('2143')
        .then(log)
        .catch(console.error);
};

const operation = takeUntil(3, getTotalNotas);
const action = debounceTime(500, operation);

document
    .querySelector('#myButton')
    .onclick = action;