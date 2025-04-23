class Adat { // egy Adat nevű osztályt definiálunk, ez reprezentál egy adatbejegyzést
    /**
     * @type {string}
     */
    #szerzo; // privát változó, a szerzo nevét tárolja
    /**
     * @type {string}
     */
    #mufaj; // privát változó, az műfajt tárolja
    /**
     * @type {string}
     */
    #cim; // privát változó, tárolja a cimet

    /**
     * @returns {string} - a szerzo neve
     */
    get szerzo() { // getter a szerzo mezőhöz
        return this.#szerzo; // visszaadja a privát szerzo értékét
    }

    /**
     * @returns {string} - a műfaj
     */
    get mufaj() { // getter az műfaj mezőhöz
        return this.#mufaj; // visszaadja a privát műfaj értékét
    }

    /**
     * @returns {string} - a cim
     */
    get cim() { // getter a cim mezőhöz
        return this.#cim; // visszaadja a privát cim értékét
    }

    /**
     * @param {string} szerzo - a szerzo neve
     * @param {string} mufaj - a műfaj
     * @param {string} cim - a cím
     */
    constructor(szerzo, mufaj, cim) { // konstruktor, ami létrehoz egy új példányt
        this.#szerzo = szerzo; // beállítja a privát szerzo értéket
        this.#mufaj = mufaj; // beállítja a privát műfaj értéket
        this.#cim = cim; // beállítja a privát cim értéket
    }
}