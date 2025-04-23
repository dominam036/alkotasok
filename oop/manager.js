/**
 * @callback renderTableCallback
 * @param {Adat[]} 
 * @returns {void}
 */
/**
 * @callback addSzerzoCallback
 * @param {Adat} 
 * @returns {void}
 */
/**
 * nagyobbe az adat1 az adat2nél
 * @callback nagyobbE
 * @param {Adat} adat1 
 * @param {Adat} adat2
 * @returns {boolean}
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

    /**
     * @type {renderTableCallback}
     */
    #renderTableCallback; // privát változó

    constructor() { // konstruktor, ami létrehozza az objektumot
        this.#array = []; // inicializáljuk a privát tömböt üresen
    }

    /**
     * @param {addSzerzoCallback} callback 
     */
    setaddSzerzoCallback(callback) { // beállítjuk a callback függvényt kívülről
        this.#addSzerzoCallback = callback; // eltároljuk a megadott callbacket privát változóban
    }
    /**
    * @param {renderTableCallback} callback 
    */
    setRenderTableCallback(callback){
        this.#renderTableCallback = callback; // privát változóba tároljuk a callbacket
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
        const tartalomTomb = ['szerző;cím;műfaj'] // létrehozunk egy tömböt fejléc sorral
        
        for(const mu of this.#array){ // végigmegyünk az adatokon
            tartalomTomb.push(`${mu.szerzo};${mu.cim};${mu.mufaj}`); // összefűzzük az adatokat és betoljuk a tömbbe
        }
        return tartalomTomb.join('\n'); // a sorokat egy szöveggé fűzzük össze sortöréssel elválasztva
    }

    /**
     * @param {nagyobbE} nagyobbe
     */
    sorbaRendezes(nagyobbe) { // buborékrendezést végez a tömbön a megadott feltétel alapján
        const rendezoArray = []; // létrehozunk egy új tömböt a rendezéshez
        for (const i of this.#array) { // végigmegyünk az eredeti tömb elemein
            rendezoArray.push(i); // az elemeket átmásoljuk a rendezoarray tömbbe
        }
    
        for (let i = 0; i < rendezoArray.length - 1; i++) { // külső ciklus amely végigmegy a tömb elemein a rendezéshez
            for (let j = 0; j < rendezoArray.length - i - 1; j++) { // belső ciklus az aktuális résztömb hosszáig
                if (nagyobbe(rendezoArray[j], rendezoArray[j + 1])) { // meghívjuk a nagyobbe függvényt a két elem összehasonlítására
                    const temp = rendezoArray[j]; // ideiglenesen elmentjük az első elemet egy változóba
                    rendezoArray[j] = rendezoArray[j + 1]; // az első elem helyére a második kerül
                    rendezoArray[j + 1] = temp; // a második elem helyére az első kerül
                }
            }
        }
        this.#renderTableCallback(rendezoArray); // a rendezett tömböt megjelenítjük a callback függvény segítségével
    }
    
    /**
     * @returns {void}
     */
    renderSima() { // megjeleníti az eredeti rendezés nélküli tömböt
        this.#renderTableCallback(this.#array); // meghívja a callback függvényt az eredeti tömbbel
    }
    
}