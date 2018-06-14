/**
 * Nossa classe Maybe nada mais é do que um tipo monádico. Quem considera mônada 
 * uma coisa do outro mundo, acabamos de criar uma mônada, no caso, uma maybe monad. 
 * Uma mônada deste tipo também é um functor para um tipo de dado e todo functor 
 * possui a função map. Em suma, nosso maybe nomad embrulha um dado para evitar 
 * acesso ao dado null ou undefined. Todavia, uma mônada brilha quando estamos 
 * dentro da programação funcional, pois ela evita a proliferação de if nas funções, 
 * principalmente naquelas envolvidas em composições.
 */

export class Maybe {

    constructor(value) {
        this._value = value;
    }

    static of(value) {
        return new Maybe(value);
    }

    isNothing() {
        return this._value === null || this._value === undefined;
    }

    map(fn) {
        if (this.isNothing()) return Maybe.of(null);
        const value = fn(this._value);
        return Maybe.of(value);
    }

    getOrElse(value) {
        if (this.isNothing()) return value;
        return this._value;
    }
}
