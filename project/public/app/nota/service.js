import { handleStatus } from '../utils/promise-helpers.js';
import { partialize, pipe } from '../utils/operators.js';
import { Maybe } from '../utils/maybe.js';

const API = 'http://localhost:3000/notas';

const getItemsFromNotas = notasM => notasM.map(notas => notas.$flatMap(nota => nota.itens));
const filterItemsByCode = (code, itemsM) => itemsM.map(items => items.filter(item => item.codigo == code));
const sumItemsValue = itemsM => itemsM.map(items => items.reduce((total, item) => total + item.valor, 0));

export const notasService = {
    // carrega notas
    listAll() {
        return fetch(API)
            .then(handleStatus)
            .then(notas => Maybe.of(notas)) // protegendo a aplicação para não ter acesso há um valor null ou undefined
            .catch(err => {
                console.error(err);
                return Promise.reject('Não foi possível obter as notas fiscais');
            });
    },

    // soma todas as notas de um determinado codigo
    sumItems(code) {
        const filterItems = partialize(filterItemsByCode, code);
        const sumItems = pipe(
            getItemsFromNotas,
            filterItems,
            sumItemsValue,
        );

        return this
            .listAll()
            .then(sumItems) // point-free
            .then(notasM => notasM.getOrElse(0))
    },
};
