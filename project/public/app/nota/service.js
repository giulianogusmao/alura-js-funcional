import { handleStatus } from '../utils/promise-helpers.js';
import { partialize } from '../utils/operators.js';

const API = 'http://localhost:3000/notas';

const getItemsFromNotas = notas => notas.$flatMap(nota => nota.itens);
const filterItemsByCode = (code, notas) => notas.filter(item => item.codigo == code);
const sumItemsValue = notas => notas.reduce((total, item) => total + item.valor, 0);

const sumItems = code => notas => {
    const filterItems = partialize(filterItemsByCode, code);
    return sumItemsValue(
        filterItems(
            getItemsFromNotas(notas)
        )
    );
};

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
        return this
            .listAll()
            .then(sumItems(code));
    },
};
