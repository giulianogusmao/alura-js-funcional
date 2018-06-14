/*
 * A função Function.bind cria uma nova função. Seu primeiro argumento é o valor
 *  de this que desejamos que a nova função utilize como contexto. Porém, como
 *  declaramos a função através de arrow function que não aceita a modificação
 *  do seu contexto, simplesmente passamos null. Mesmo que tivéssemos passado
 *  outro valor ele seria ignorado.
 * 
 * Os demais parâmetros são todos aqueles que desejamos assumir como argumentos 
 * já fornecidos toda vez que a função resultante de bind() for chamada. No caso, 
 * estamos indicando que o primeiro parâmetro será sempre 2.
*/ 
export const partialize = (fn, ...params) => fn.bind(null, ...params);