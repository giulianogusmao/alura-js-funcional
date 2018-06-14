export const handleStatus = res =>
    res.ok ? res.json() : Promise.reject(res.statusText);

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

export const delayPromise = (milliseconds) => value =>
    new Promise(resolve => setTimeout(() => {
        resolve(value);
    }, milliseconds));
