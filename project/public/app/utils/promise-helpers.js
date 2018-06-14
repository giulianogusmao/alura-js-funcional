/**
 * Realiza o parse para json() da primeira resposta da promise caso
 * o response seja ok ou rejeita caso tenha algum problema.
 * 
 * @param {response} res 
 */ 
export const handleStatus = res =>
    res.ok ? res.json() : Promise.reject(res.statusText);


/**
 * Determina um tempo limite para aguarada a resposta de uma promise
 * 
 * @param {number} milliseconds - Tempo limite da resposta
 * @param {promise} promise - Requisição
 */
export const timeoutPromise = (milliseconds, promise) => {
    const timeout = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(`Limite da promise excedido (limite: ${milliseconds} ms)`)
        }, milliseconds);
    });

    return Promise.race([
        timeout,
        promise
    ]);
};


/**
 * Determina um tempo de espera em milisegundos que o parâmetro recebido 
 * será passado adiante.
 * 
 * @param {number} milliseconds - Tempo de espera da resposta
 */
export const delayPromise = (milliseconds) => value =>
    new Promise(resolve => setTimeout(() => {
        resolve(value);
    }, milliseconds));


/**
 * Sempre que uma promise retornada da fn for executada e falhar a Retry
 * irá realizar um dterminado número tentativas(retries) dentro de um 
 * intervalo de tempo(milliseconds).
 * 
 * @param {number} retries - Numero de tentativas
 * @param {number} milliseconds - Tempo entre cada tentativa
 * @param {function} fn - função que retorna uma promise com a requisição
 */
export const retry = (retries, milliseconds, fn) =>
    fn().catch(err => {
        console.log(retries);
        return delayPromise(milliseconds)().then(() =>
            retries > 1
                ? retry(retries - 1, milliseconds, fn)
                : Promise.reject(err));
    });
