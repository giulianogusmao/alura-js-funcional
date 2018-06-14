import { handleStatus } from '../utils/promise-helpers.js';

const API = 'http://localhost:3000/notas';

const sumItems = code => notas =>
    notas
        .$flatMap(nota => nota.itens)
        .filter(item => item.codigo == code)
        .reduce((total, item) => total + item.valor, 0)

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
