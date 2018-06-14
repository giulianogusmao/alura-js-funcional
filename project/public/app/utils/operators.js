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
export const partialize = (fn, ...params) =>
    fn.bind(null, ...params);

    
/*
 * Ela receberá como parâmetro um número indeterminado de funções e retornará uma 
 * função que terá apenas um argumento. No contexto do problema que estamos resolvendo, 
 * essa função representará a extinta função sumItemsWithCode. Esta função, quando 
 * chamada, passará seu parâmetro para a última função da lista de funções passada para 
 * compose e seu resultado será passado para a função anterior sucessivamente até 
 * chegarmos ao resultado final.
 * 
 * Como queremos reduzir a lista de funções a um valor apenas no final, nada mais 
 * justo do que usarmos a função reduce. No entanto, como queremos aplicar as funções 
 * da direita para a esquerda, usamos reduceRight. Quando usamos reduce ou reduceRight, 
 * podemos indicar qual será o valor inicial utilizado na redução, no caso, usamos 
 * value que será o array recebido por sumItemsWithCode. Esse valor será o previousValue 
 * na primeira chamada de fn(previousValue). Em nosso contexto, na primeira iteração 
 * de reduceRight, fn será a função getItemsFromNotas. Seu resultado será o previousValue 
 * passado para a função anterior e assim sucessivamente.
*/ 
export const composer = (...fns) =>
    value =>
        fns.reduceRight((previousValue, fn) =>
            fn(previousValue), value);