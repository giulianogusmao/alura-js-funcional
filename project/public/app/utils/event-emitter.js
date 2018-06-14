const events = new Map();

export const EventEmitter = {
    /**
     * 
     * @param {string} event  - Nome do tópico que será chamado
     * @param {function} listener - função que irá receber os parâmetros de callback
     */
    on(event, listener) {
        // verifia se já existe o evento criado, caso contrário instância
        if (!events.has(event)) events.set(event, []);

        // insere o listener na fila do evento
        events.get(event).push(listener);
    },

    /**
     * 
     * @param {string} event - Nome do tópico que será escutado
     * @param {any} data - Parâmetros que serão enviados para o listener
     */
    emit(event, data) {
        const listeners = events.get(event);

        if (listeners.length > 0) {
            listeners.forEach(listener => listener(data));
        }
    },
};