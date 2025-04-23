class Filter extends Area {
    constructor(cssclass, manager){
        super(cssclass, manager);
     
        const szurtForm = document.createElement('form'); // létrehoz egy form elemet
        this.div.appendChild(szurtForm); // hozzáadja a formot a divhez

        const select = document.createElement('select'); // létrehoz egy legördülő menüt
        szurtForm.appendChild(select); // hozzáadja a legördülő menüt a formhoz

        const options = [ // tömb létrehozása
            { value: '', innerText: 'üres' }, // üres opció
            { value: 'cim', innerText: 'cím' }, // opció a cím mezőhöz
            { value: 'szerzo', innerText: 'szerző' } // opció a szerző mezőhöz
        ];
        for (const option of options) { // bejáruk a fentebbi tömb objektumait
            const optionElement = document.createElement('option'); // létrehoz egy option elemet
            optionElement.value = option.value; // beállítja az option value attribútumát
            optionElement.innerText = option.innerText; // beállítja az option szövegét
            select.appendChild(optionElement); // hozzáadja az option elemet a legördülő menühöz
        }

        const button = document.createElement('button'); // létrehoz egy gombot
        button.innerText = 'Szűrés'; // beállítja a gomb szövegét
        szurtForm.appendChild(button); // hozzáadja a gombot a formhoz

        szurtForm.addEventListener('submit', (e) => { // eseményfigyelőt állít be a form elküldésére
            e.preventDefault(); // megakadályozza az alapértelmezett elküldési viselkedést

            const filterKey = select.value; // lekéri a kiválasztott mező értékét
            if (filterKey === '') { // ellenőrzi hogy a kiválasztott mező üres-e
                this.manager.renderSima(); // ha üres megjeleníti az alapértelmezett táblázatot
            } else { // ha nem üres akkor rendezést végez
                this.manager.sorbaRendezes((adat1, adat2) => { // meghívja a rendezési metódust és megadja a feltételt
                    if (adat1[filterKey].toLowerCase() > adat2[filterKey].toLowerCase()) { // összehasonlítja a két elem adott mezőjének értékét kisbetűsítve
                        return true; // ha az első nagyobb visszaadja hogy igaz
                    }
                    return false; // különben visszaadja hogy hamis
                });
            }
        });
    }
}