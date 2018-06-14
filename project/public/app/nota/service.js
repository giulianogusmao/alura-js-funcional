import { handleStatus } from '../utils/promise-helpers.js';

const API = 'http://localhost:3000/notas';



export const notasService = {
    listAll: () => {
        return fetch(API)
            .then(handleStatus)
            .catch(err => {
                console.error(err);
                return Promise.reject('Não foi possível obter as notas fiscais');
            });
    },
    sumItems: code => {
        return this.listAll();
    },
};
