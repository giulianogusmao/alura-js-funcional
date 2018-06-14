import { handleStatus } from '../utils/promise-helpers.js';
import { partialize, composer } from '../utils/operators.js';

const API = 'http://localhost:3000/notas';

const getItemsFromNotas = notas => notas.$flatMap(nota => nota.itens);
const filterItemsByCode = (code, notas) => notas.filter(item => item.codigo == code);
const sumItemsValue = notas => notas.reduce((total, item) => total + item.valor, 0);

export const notasService = {
    // carrega notas
    listAll() {
        return fetch(API)
            .then(handleStatus)
            .catch(err => {
                console.error(err);
                return Promise.reject('Não foi possível obter as notas fiscais');
            });
    },

    // soma todas as notas de um determinado codigo
    sumItems(code) {
        const filterItems = partialize(filterItemsByCode, code);
        const sumItems = composer(
            sumItemsValue,
            filterItems,
            getItemsFromNotas
        );

        return this
            .listAll()
            .then(sumItems); // point-free
    },
};
