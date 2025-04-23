/**
  * @callback addSzerzoCallback
  * @param {HTMLTableSectionElement} tbody megkapja a tbody-t
  * @returns {void}
  */
class Manager { // egy Manager nevű osztály, kezeli az adatokat
    /**
     * @type {Adat[]}
     */
    #array; // privát tömb, amiben az Adat objektumokat tároljuk

    /**
     * @type {addSzerzoCallback}
     */
    #addSzerzoCallback; // privát callback függvény, amit meghívunk új adat hozzáadásánál

    constructor() { // konstruktor, ami létrehozza az objektumot
        this.#array = []; // inicializáljuk a privát tömböt üresen
    }

    /**
     * @param {Function:void} callback 
     */
    setaddSzerzoCallback(callback) { // beállítjuk a callback függvényt kívülről
        this.#addSzerzoCallback = callback; // eltároljuk a megadott callbacket privát változóban
    }

    /**
     * @param {Adat} adat 
     */
    addSzerzo(szerzo) { // új adatot adunk a listához
        this.#array.push(szerzo); // belerakjuk az új adatot a privát tömbbe
        this.#addSzerzoCallback(szerzo); // meghívjuk a callbacket az új adattal
    }
}