import { EventEmitter } from './utils/event-emitter.js';
import { log } from './utils/operators.js';

EventEmitter.on('itensTotalizados', log);