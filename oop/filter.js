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

            const rendezettArray = [...this.manager.getArray()];

            if (filterKey !== '') { // csak akkor rendez ha a mező ki van választva
                rendezettArray.sort((a, b) => a[filterKey].localeCompare(b[filterKey])); // betűrendbe állítja a kiválasztott mező alapján
            }

            this.div.innerHTML = ''; // kiüríti a táblázat jelenlegi tartalmát

            for (const elem of rendezettArray) { // végigmegy a rendezett tömb elemein
                addRow(elem, this); // hozzáad egy sort a táblázathoz az aktuális elemből
            }
        });
    }
}