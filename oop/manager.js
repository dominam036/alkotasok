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
     * @param {function:void} callback 
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

    /**
     * @returns {string} letöltési szöveg
     */
    generateOutputString() { // a letöltéshez szükséges szöveget generaljuk itt
        const tartalomTomb = ['szerző;műfaj;cím'] // létrehozunk egy tömböt fejléc sorral
        
        for(const mu of this.#array){ // végigmegyünk az adatokon
            tartalomTomb.push(`${mu.szerzo};${mu.mufaj};${mu.cim}`); // összefűzzük az adatokat és betoljuk a tömbbe
        }
        return tartalomTomb.join('\n'); // a sorokat egy szöveggé fűzzük össze sortöréssel elválasztva
    }
}