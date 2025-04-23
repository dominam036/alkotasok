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