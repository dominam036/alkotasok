class Area {//létrehozunk egy osztályt
    /**
     * @param {HTMLDivElement}
     */
    #div; //privát változó amit csak osztályon belül látni

    /**
     * @returns {HTMLDivElement}
     */
    get div(){// getter metódus hogy el lehessen érni a privát div-et
        return this.#div;// visszaadja a #div értékét
    }
    
    /**
     * @param {string} className - amit létre szeretnénk hozni pl 'table'
     */
    constructor(className) { // konstruktor, kap egy class nevet
        let containsDiv = document.querySelector('.containeroop'); // megnézi van-e már ilyen nevű container

        if (!containsDiv) { // ha nincs ilyen, akkor csinál egyet
            containsDiv = document.createElement('div'); // létrehoz egy új divet
            containsDiv.className = 'containeroop'; // beállítja a class nevét
            document.body.appendChild(containsDiv); // hozzáadja a bodyhoz
        }

        this.#div = document.createElement('div'); // létrehoz egy új divet a kapott class-hoz
        this.#div.className = className; // beállítja a class nevet amit paraméterként kapott
        containsDiv.appendChild(this.#div); // berakja az új divet a containeroop divbe
    }
}

class Table extends Area { // létrehozunk egy Table nevű osztályt, ami az Area ősosztályból öröklődik
    /**
     * 
     * @param {string} cssClass megadjuk kívülről amit kreálni szeretnénk vele
     */
    constructor(cssClass){ // konstruktor, kap egy css class nevet
        super(cssClass); // meghívjuk az Area osztály konstruktorát vele
        
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
    }
}

class Form extends Area { // Form nevű osztály, amely az Area osztályból öröklődik
    /**
     * @param {string} cssClass 
     */
    constructor(cssClass) { // konstruktor, megkapja a css osztály nevét
        super(cssClass); // meghívja az Area osztály konstruktorát a cssClass paraméterrel

        const urlapElem = document.createElement('form'); // létrehozunk egy <form> HTML elemet
        this.div.appendChild(urlapElem); // a létrehozott form-ot hozzáadjuk a div-hez, amit az Area osztályban hoztunk létre

        const mezoLista = [ // egy tömb, benne objektumokkal
            { fieldid: 'szerzo', fieldLabel: 'Szerző' }, // elso mezo id, felirat
            { fieldid: 'mufaj', fieldLabel: 'Műfaj' }, // masodik mezo id, felirat
            { fieldid: 'cim', fieldLabel: 'cím' } // harmadik mezo id, felirat
        ];

        for (const mezoObjektum of mezoLista) { // végigmegyünk minden mező objektumon a tömbben
            const mezoDiv = makeDiv('field'); // létrehozunk egy div-et a 'field' class névvel 
            urlapElem.appendChild(mezoDiv); // a div-et hozzáadjuk az űrlaphoz

            const label = document.createElement('label'); // létrehozunk egy label elemet
            label.htmlFor = mezoObjektum.fieldid; // beállítjuk, hogy melyik inputhoz tartozik ez a label 
            label.textContent = mezoObjektum.fieldLabel; // beállítjuk a label szövegét
            mezoDiv.appendChild(label); // a label-t hozzáadjuk a div-hez

            const input = document.createElement('input'); // létrehozunk egy input mezőt
            input.id = mezoObjektum.fieldid; // beállítjuk az input mező id-jét
            mezoDiv.appendChild(document.createElement('br')); // beszúrunk egy sortörést a label és az input közé
            mezoDiv.appendChild(input); // hozzáadjuk az input mezőt is a div-hez
        }

        const hozzaadasGomb = document.createElement('button'); // létrehozunk egy button gomb elemet
        hozzaadasGomb.textContent = 'hozzáadás'; // beállítjuk a gomb feliratát
        urlapElem.appendChild(hozzaadasGomb); // a gombot hozzáadjuk az űrlaphoz
    }
}