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
}

class Table extends Area { // létrehozunk egy Table nevű osztályt, ami az Area ősosztályból öröklődik
    /**
     * 
     * @param {string} cssClass megadjuk kívülről amit kreálni szeretnénk vele
     * @param {Manager} manager
     */
    constructor(cssClass, manager){ // konstruktor, kap egy css class nevet
        super(cssClass, manager); // meghívjuk az Area osztály konstruktorát vele
        const tabla = this.#makeTabla(); // csinálunk egy table elemet

        this.manager.setaddSzerzoCallback((adatok) => { // arrow function 
            const tbRow = document.createElement('tr'); // csinálunk egy új sort a táblába
            tabla.appendChild(tbRow); // belerakjuk a tbody-be amivel a #makeTabla metodus tér vissza
        
            const szerzoCell = document.createElement('td'); // szerzőnek nek létrehozunk egy cellát
            szerzoCell.textContent = adatok.szerzo; // cella szövegébe a szerző
            tbRow.appendChild(szerzoCell); // hozzáadjuk a sorhoz
        
            const mufajCell = document.createElement('td'); // mufaj cella
            mufajCell.textContent = adatok.mufaj; // kiírjuk a beírt műfajt
            tbRow.appendChild(mufajCell); // hozzáadjuk a sorhoz
            
            const cimCell = document.createElement('td'); // cim cella létrehozása
            cimCell.textContent = adatok.cim; // szövegbe az cim
            tbRow.appendChild(cimCell); // hozzáadjuk a sorhoz
        })
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

        const fejlecNevek = ['Szerző', 'műfaj', 'cím']; // fejléc mezők szövegeit tároljuk itt egy tömbben
        for(const fejlec of fejlecNevek){ // végigmegyünk a tömb elemein
            const theadCella = document.createElement('th'); // csinálunk egy th elemet
            theadCella.innerText = fejlec; // beleírjuk a szöveget
            theadRow.appendChild(theadCella); // hozzáadjuk a sort a fejlécbe
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
        const urlapElem = document.createElement('form'); // létrehozunk egy <form> HTML elemet
        this.div.appendChild(urlapElem); // a létrehozott form-ot hozzáadjuk a div-hez, amit az Area osztályban hoztunk létre

        for (const mezoObjektum of mezoLista) { // végigmegyünk minden mező objektumon a tömbben
            const formField = new FormField(mezoObjektum.fieldid, mezoObjektum.fieldLabel); // létrehozunk egy új FormField objektumot az adott mező alapján
            this.#tombInput.push(formField); // eltároljuk a mezőt az tombInputban tömbben
            urlapElem.appendChild(formField.getDiv()); // hozzáadjuk a mezőhöz tartozó HTML elemeket a form-hoz
        }

        const hozzaadasGomb = document.createElement('button'); // létrehozunk egy button gomb elemet
        hozzaadasGomb.textContent = 'hozzáadás'; // beállítjuk a gomb feliratát
        urlapElem.appendChild(hozzaadasGomb); // a gombot hozzáadjuk az űrlaphoz

        urlapElem.addEventListener('submit', (e)=> { // eseménykezelő ami a gomb lenyomására aktiválódik
            e.preventDefault(); // megakadályozza az alapértelmezett viselkedést
            const inputFieldList = e.target.querySelectorAll('input'); // lekéri az összes input mezőt
            const valueObject = {}; // létrehoz egy üres objektumot
        
            for(const inputField of inputFieldList){ // bejárjuk a inputFieldListet
                valueObject[inputField.id] = inputField.value; // minden input id alapján hozzáadja az értéket az objektumhoz
            }
        
            const szerzo = new Adat(valueObject.szerzo, valueObject.mufaj, valueObject.cim); // új adat objektumot hoz létre a beírt értékekkel
            this.manager.addSzerzo(szerzo); // hozzáadja az adatot a managerhez
        });
        
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