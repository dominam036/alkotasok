class Area {//létrehozunk egy osztályt
    /**
     * @type {HTMLDivElement}
     */
    #div; //privát változó amit csak osztályon belül látni

    /**
     * @type {Manager}
     */
    #manager;
    /**
     * @returns {HTMLDivElement}
     */
    get div(){// getter metódus hogy el lehessen érni a privát div-et
        return this.#div;// visszaadja a #div értékét
    }

    /**
     * @returns {Manager} 
     */
    get manager(){ // getter metódus hogy el lehessen érni a privát managert-et
        return this.#manager; // visszaadja a #manager értékét
    }
    
    /**
     * @param {string} className - amit létre szeretnénk hozni pl 'table'
     * @param {Manager} manager
     */
    constructor(className, manager) { // konstruktor, kap egy class nevet
        this.#manager = manager; // beállítjuk a privát #manager változót a kapott értékre
        const container = this.#getContainerDiv(); // itt hívjuk meg a privát metódust amit egy változóban tárolunk el
        this.#div = document.createElement('div'); // létrehoz egy új divet a kapott class-hoz
        this.#div.className = className; // beállítja a class nevet amit paraméterként kapott
        container.appendChild(this.#div); // berakja az új divet a containeroop divbe
    }

    /**
     * @returns {HTMLElement} containsDiv elemmel tér vissza
     */
    #getContainerDiv(){
        let containsDiv = document.querySelector('.containeroop'); // megnézi van-e már ilyen nevű container
        if (!containsDiv) { // ha nincs ilyen, akkor csinál egyet
            containsDiv = document.createElement('div'); // létrehoz egy új divet
            containsDiv.className = 'containeroop'; // beállítja a class nevét
            document.body.appendChild(containsDiv); // hozzáadja a bodyhoz
        }
        return containsDiv; // visszatérünk a containsDivvel
    }
    /**
     * 
     * @param {string} label 
     * @returns {HTMLButtonElement}
     */
    createGomb(label){ // létrehoz egy gomb elemet
        const gomb = document.createElement('button'); // létrehoz egy button elemet
        gomb.type = 'submit'; // beállítja a gomb típusát submit értékre
        gomb.textContent = label; // beállítja a gomb szövegét a kapott label értékére
        return gomb // visszatér a létrehozott gomb elemmel
    }    
}

class Table extends Area { // létrehozunk egy Table nevű osztályt, ami az Area ősosztályból öröklődik
    /**
     * @param {string} cssClass megadjuk kívülről amit kreálni szeretnénk vele
     * @param {Manager} manager
     */
    constructor(cssClass, manager){ // konstruktor, kap egy css class nevet
        super(cssClass, manager); // meghívjuk az Area osztály konstruktorát vele
        const tbody = this.#makeTabla(); // csinálunk egy tbody elemet

        this.manager.setaddSzerzoCallback(this.#addSzerzoCallback(tbody)); // beállítja az add szerzo callbacket 
        this.manager.setRenderTableCallback(this.#renderTableCallback(tbody)); // beállítja a render table callbacket 
    }

    /**
     * @param {HTMLElement} tbody megkapja a tbody-t
     * @returns {renderTableCallback}
     */
    #renderTableCallback(tbody){ // táblázat újrarenderelése
        return (array) => { // callback függvény beállítása a táblázat újrarendereléséhez
            tbody.innerHTML = ''; // táblázat kiürítése
            for (const mu of array) { // végigmegyünk az művek tömbjén
                this.#createMuRow(mu, tbody); // új sorokat hozunk létre az művek alapján
            }
        };
    }
    /**
     * @param {HTMLElement} tbody megkapja a tbody-t
     * @returns {addSzerzoCallback}
     */
    #addSzerzoCallback(tbody){ // új sor hozzáadása a táblázathoz
        return (mu) => { // arrow function 
            this.#createMuRow(mu, tbody); // meghívjuk azt a függvényt ami egy sort csinál
        }
    }

    /**
     * @param {Adat} mu az aktualis sor adatai
     * @param {string} tableBody a táblázat tableBody eleme
     */
    #createMuRow(mu, tableBody){ // privát függvény létrehozása ami egy sort csinál az adatokkal
        const tbRow = document.createElement('tr'); // csinálunk egy új sort a táblába

        this.#createCella(tbRow, mu.szerzo) // hozzáadjuk a szerzo oszlop adatát
        this.#createCella(tbRow, mu.cim) // hozzáadjuk a cim oszlop adatát
        this.#createCella(tbRow, mu.mufaj) // hozzáadjuk a mufaj oszlop adatát

        tableBody.appendChild(tbRow); // belerakjuk a tbody-be amivel a #makeTable metodus tér vissza
    }

    /**
     * @param {string} sor az amihez a sort adjuk
     * @param {string} textContent a cella tartalma
     * @param {string} [type="td"] a cella típusa
     */
    #createCella(sor, textContent, type='td'){ // létrehoz egy cellát az adott típus alapján alapértelmezetten td típust használva
        const cella = document.createElement(type); // létrehozza a cellát az adott típus alapján
        cella.textContent = textContent; // beállítja a cella szövegét
        sor.appendChild(cella); // hozzáadja a cellát a megadott sorhoz
    }
    

    /**
     * @returns {HTMLElement} tbody elem
     */
    #makeTabla(){ // létrehozunk egy privát függvényt
        const table = document.createElement('table'); // csinálunk egy table elemet
        this.div.appendChild(table); // hozzáadjuk a divhez amit az Area hozott létre

        const thead = document.createElement('thead'); // létrehozzuk a táblázat fejléce részét
        table.appendChild(thead); // hozzáadjuk a table-hez

        const theadRow = document.createElement('tr'); // létrehozunk egy sort a fejléchez
        thead.appendChild(theadRow); // hozzáadjuk a sort a thead-be

        const fejlecNevek = ['Szerző', 'cim', 'műfaj']; // fejléc mezők szövegeit tároljuk itt egy tömbben
        for(const fejlec of fejlecNevek){ // végigmegyünk a tömb elemein
            this.#createCella(theadRow, fejlec, 'th');
        }
        
        const tbody = document.createElement('tbody'); // csinálunk egy üres tbody részt is
        table.appendChild(tbody); // hozzáadjuk a table-hez
        return tbody; // visszaadjuk a tbodyt
    }
}

class Form extends Area { // Form nevű osztály, amely az Area osztályból öröklődik
    /**
     * @type {FormField[]}
     */
    #tombInput // privát változó
    /**
     * @param {string} cssClass 
     * @param {{fieldid:string,fieldLabel:string}[]} mezoLista
     * @param {Manager} manager
     */
    constructor(cssClass, mezoLista, manager) { // konstruktor, megkapja a css osztály nevét, egy tömböt és a managert
        super(cssClass, manager); // meghívja az Area osztály konstruktorát a cssClass paraméterrel
        this.#tombInput = []; // a tombInputot inicializáljuk
        const urlapElem = this.#formLetrehozas(mezoLista); // létrehozunk egy <form> HTML elemet
        urlapElem.addEventListener('submit', this.#formEsemenyKezelo()); // addeventlistener meghívása
    }
    /**
     * @param {{fieldid:string,fieldLabel:string}[]} mezoLista 
     * @returns {HTMLElement} 
     */ 
    #formLetrehozas(mezoLista){ // létrehoz egy form HTML elemet a mezőkkel és a gombbal
        const urlapElem = document.createElement('form'); // form html elem létrehozása
        this.div.appendChild(urlapElem); // az uralapElem-et belerakjuk a fő div-be

        for (const mezoObjektum of mezoLista) { // végigmegyünk minden mező objektumon a tömbben
            const formField = new FormField(mezoObjektum.fieldid, mezoObjektum.fieldLabel); // létrehozunk egy új FormField objektumot az adott mező alapján
            this.#tombInput.push(formField); // eltároljuk a mezőt az tombInputban tömbben
            urlapElem.appendChild(formField.getDiv()); // hozzáadjuk a mezőhöz tartozó HTML elemeket a form-hoz
        }

        const hozzaadasGomb = this.createGomb('Hozzáadás'); // létrehozunk egy button gomb elemet
        urlapElem.appendChild(hozzaadasGomb); // formhoz adjuk a gombot
        
        return urlapElem; // visszatérünk a form elemmel
    }
    /**
     * @returns {EventListener} az event listener függvénnyel tér vissza
     */
    #formEsemenyKezelo(){ // létrehoz egy event listener-t a form submit eseményére
        return (e)=> { // eseménykezelő ami a gomb lenyomására aktiválódik
            e.preventDefault(); // megakadályozza az alapértelmezett viselkedést
            if(this.#mezoValidalas()){ // ha trueval tér vissz a függvény
                const valueObject = this.#objektumErtek(); // lekérjük a mezők értékeit
                const szerzo = new Adat(valueObject.szerzo, valueObject.cim, valueObject.mufaj); // új adat objektumot hoz létre a beírt értékekkel
                this.manager.addSzerzo(szerzo); // hozzáadja az adatot a managerhez
            }
        };
    }
    /**
     * @returns {boolean} true hogyha minden mező kitöltött
     */
    #mezoValidalas(){ // ellenőrzi, hogy minden mező ki van-e töltve
        let validE = true; // validE true lesz alapból
        for(const errorField of this.#tombInput){ // vegigmegyünk az összes FormField mezőn
            errorField.error = ''; // töröljük az esetlegesen korabban megjelenített hibaüzenetet
            if(errorField.value === ''){ // ha az adott mező üres
                errorField.error = 'Add meg ezt is!'; // beállítjuk a hibaüzenetet a mező alá
                validE = false; // az validE-t hamisra állítjuk
            }
        }
        return validE; // visszatérünk egy true/falseal
    }
    /**
     * @returns {{szerzo:string, cim: string, mufaj:string}} az objektum ami a mezoknek tartalmazza az értékeit
     */
    #objektumErtek(){ // mezők értéke egy objektumba
        const valueObject = {}; // létrehoz egy üres objektumot
        for(const objekErtek of this.#tombInput){ // vegigmegyünk az összes FormField mezőn
        valueObject[objekErtek.id] = objekErtek.value; // Az objektumba mentjük a mező azonosítója alapján az értéket
        }
        return valueObject; // objektum visszaadasa
    }
    
}

class UploadDownload extends Area { // létrehozunk egy upload nevű osztályt ami örökli az area osztályt
    /**
     * 
     * @param {string} cssClass 
     * @param {Manager} manager 
     */
    constructor(cssClass, manager) { // konstruktor kap egy css osztálynevet meg a managert
        super(cssClass, manager) // meghívjuk az area konstruktorát ezekkel

        const input = document.createElement('input') // létrehozunk egy input elemet
        input.id = 'fileinput' // beállítjuk az id-t hogy fileinput legyen
        input.type = 'file' // beállítjuk a típust fájl feltöltésre
        this.div.appendChild(input) // hozzáadjuk a divhez amit az area osztályból örököltünk
        input.addEventListener('change', this.#fajlFeltoltesEventListener()); // eseménykezelő a fájlfeltöltéshez

        const letoltesGomb = this.createGomb('Letöltés'); // csinálunk egy gombot
        this.div.appendChild(letoltesGomb); // hozzáadjuk a containerhez a gombot
        letoltesGomb.addEventListener('click', this.#letoltesGombEventListener()); // eseménykezelő a fájl letöltéshez
    }

    /**
     * 
     * @returns {EventListener}
     */
    #letoltesGombEventListener(){ // privát metódus a letöltési eseményhez
        return () => { // ezzel térünk vissza
            const link = document.createElement('a'); // csinálunk egy <a> elemet ami majd letöltésre lesz
            const tartalom = this.manager.generateOutputString(); // lekérjük a managerből a letöltendő szöveget
            const file = new Blob([tartalom]) // csinálunk egy blob fájlt a szövegből
            link.href = URL.createObjectURL(file); // generálunk egy ideiglenes fájlelérési linket
            link.download = 'newdata.csv' // beállítjuk hogy milyen néven mentse le a fájlt
            link.click(); // elindítjuk a letöltést
            URL.revokeObjectURL(link.href); // töröljük az ideiglenes linket hogy ne szemeteljen
        }
    } 
    /**
     * 
     * @returns {EventListener}
     */
    #fajlFeltoltesEventListener(){ // privát metódus a fájlfeltöltéshez
        return (e) => { // amikor fájlt választanak ki akkor ez lefut
            const file = e.target.files[0] // lekéri a kiválasztott fájlt
            const beolvaso = new FileReader() // létrehozunk egy új fájlolvasót

            beolvaso.onload = () => { // amikor betöltötte a fájlt ez fut le
                const fileLines = beolvaso.result.split('\n') // feldarabolja sorokra
                const elsoSorNelkul = fileLines.slice(1) // lehagyjuk az első sort mert az a fejléc

                for(const line of elsoSorNelkul){ // végigmegyünk minden soron
                    const tisztitottSor = line.trim() // leszedjük a felesleges szóközöket
                    const mezok = tisztitottSor.split(';') // szétvágjuk pontosvesszőknél

                    const adat = new Adat(mezok[0], mezok[1], mezok[2]) // létrehozunk egy új adat objektumot a sor alapján
                    this.manager.addSzerzo(adat) // hozzáadjuk a managernél a szerzőt
                }
            }
            beolvaso.readAsText(file) // elindítjuk a fájl olvasását szövegként
        }
    }
}


class FormField {
    /**
     * @type {string}
     */
    #id; // privát mező az azonosító tárolására
    /**
     * @type {HTMLElement}
     */
    #inputElem; // privát mező az input elemre
    /**
     * @type {HTMLElement}
     */
    #labelElem; // privát mező a label elemre
    /**
     * @type {HTMLElement}
     */
    #hibaElem; // privát mező a hibát megjelenítő span elemre

    /** 
     * @returns {string} a mező azonosítója
     */
    get id(){ // get metódus az id értékének eléréséhez
        return this.#id; // id visszaadása
    }

    /** 
     * @returns {string} a mező értéke
     */
    get value(){ // get metódus az input mező értékének eléréséhez
        return this.#inputElem.value; // input mezot visszaadjuk
    }

    /** 
     * @param {string} value a megjelenítendő hibaüzenet
     */
    set error(value){ // set metódus a hibaüzenet beállításához
        this.#hibaElem.textContent = value; // error üzenetet beállítjuk
    }

    /** 
     * @param {string} id a mező azonosítója
     * @param {string} labelContent a mezőhöz tartozó szöveg
     */
    constructor(id, labelContent){ // konstruktor bemeneti paraméterként kap egy azonosítót és egy címkefeliratot
        this.#id = id; // elmentjük az id értékét privát változóba
        this.#labelElem = document.createElement('label'); // létrehozunk egy label elemet
        this.#labelElem.htmlFor = id; // beállítjuk hogy melyik inputhoz tartozik a label
        this.#labelElem.textContent = labelContent; // beállítjuk a címke szövegét

        this.#inputElem = document.createElement('input'); // létrehozunk egy input elemet
        this.#inputElem.id = id; // beállítjuk az input id értékét

        this.#hibaElem = document.createElement('span'); // létrehozunk egy span elemet hibaüzenethez
        this.#hibaElem.className = 'error'; // beállítjuk az osztály nevét error-ra
    }

    /**
     * @returns {HTMLDivElement}
     */
    getDiv(){ // metódus ami visszaad egy divet az összes mezővel együtt
        const div = makeDiv('field'); // létrehozunk egy field osztályú divet

        const br1 = document.createElement('br'); // első sortörés
        const br2 = document.createElement('br'); // második sortörés

        const elemek = [this.#labelElem, br1, this.#inputElem, br2, this.#hibaElem]; // elemeket egy tömbbe rakjuk

        for(const elem of elemek){ // végigmegyünk az összes elemeken
            div.appendChild(elem); // hozzáadjuk a divhez az aktuális elemet
        }

        return div; // visszatérünk a divvel
    }
}