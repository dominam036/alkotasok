const array = []; // létrehozunk egy array tömböt
/**
 * @param {string} className - a div elem amit megadunk neki kívülről
 * @returns {HTMLElement} a div elem amit létrehozott 
 */
const makeDiv = (className) => { // csinál egy divet a megadott class névvel arrow functionnel
    const div = document.createElement('div'); // létrehoz egy új div elemet
    div.className = className; // beállítja a class nevét
    return div; // visszaadja a divet
}

const containerDiv = makeDiv('container'); // container nevű divet csinál
document.body.appendChild(containerDiv); // hozzáadja a bodyhoz a container divet
const tableDiv = makeDiv('table'); // csinál egy table nevű divet

const simaTable = document.createElement('table'); // csinál egy table elemet
tableDiv.appendChild(simaTable); // belerakja a tableDiv-be (amit korábban csináltunk)

const tableHead = document.createElement('thead'); // létrehozza a fejléc részt
simaTable.appendChild(tableHead); // hozzáadja a táblázathoz a fejlécet

const tableHeadRow = document.createElement('tr'); // egy sor a thead részbe
tableHead.appendChild(tableHeadRow); // hozzáadjuk a sort a thead-hez

const fejlecNevek = ['Szerző', 'műfaj', 'cím']; // a fejléc cellák tartalma, tömbbe tároljuk el
for (const fejlec of fejlecNevek) { // végigmegyünk a tömb elemein
    const theadCella = document.createElement('th'); // csinálunk egy új th elemet
    theadCella.innerText = fejlec; // beleírjuk a cellába az aktuális elemet
    tableHeadRow.appendChild(theadCella); // hozzáadjuk a cellát a fejléchez
}

const tbody = document.createElement('tbody'); // létrehozzuk a table body részét
simaTable.appendChild(tbody); // berakjuk a table-be

const formDiv = makeDiv('form'); // form divet is csinálunk

const urlapElem = document.createElement('form'); // letrehoz egy form elemet
formDiv.appendChild(urlapElem); // hozzáadja a formDiv-hez

// mezők adatai: id és felirat szöveg
const mezoLista = [ // egy tömb, benne objektumokkal
    { fieldid: 'szerzo', fieldLabel: 'Szerző' }, // elso mezo id, felirat
    { fieldid: 'mufaj', fieldLabel: 'Műfaj' }, // masodik mezo id, felirat
    { fieldid: 'cim', fieldLabel: 'cím' } // harmadik mezo id, felirat
];

for (const mezoObjektum of mezoLista) { // végigmegyünk minden mezőn
    const mezoDiv = makeDiv('field'); // field class-hoz tartozó div létrehozasa
    urlapElem.appendChild(mezoDiv); // hozzaadas az urlaphoz

    const label = document.createElement('label'); // létrehozunk egy cimket (label)
    label.htmlFor = mezoObjektum.fieldid; // beallitjuk hogy melyik inputhoz tartozik
    label.textContent = mezoObjektum.fieldLabel; // beállitjuk a cimke szövegét
    mezoDiv.appendChild(label); // hozzáadjuk a cimket a field divhez

    const input = document.createElement('input'); // létrehozunk egy input mezot
    input.id = mezoObjektum.fieldid; // beállitjuk az id-t
    mezoDiv.appendChild(document.createElement('br')); // sortörés beszurása
    mezoDiv.appendChild(input); // input hozzáadasa a field divhez
}

const hozzaadasGomb = document.createElement('button'); // letrehozunk egy gombot
hozzaadasGomb.textContent = 'Hozzáadás'; // beállitjuk a gomb szöveget
urlapElem.appendChild(hozzaadasGomb); // hozzáadjuk az urlaphoz

urlapElem.addEventListener('submit', (e) => { // eseményfigyelő a form beküldésére 
    e.preventDefault(); // megakadályozza az alapértelmezett működést (pl újratöltést)
    const valueObject = {}; // létrehozunk egy üres objektumot, amibe az inputok értékei kerülnek
    const bemenetiMezok = e.target.querySelectorAll('input'); // lekérjük az összes input mezőt az űrlapon belül

    for (const mezo of bemenetiMezok) { // végigmegyünk az összes input mezőn
        valueObject[mezo.id] = mezo.value; // az objektumba kulcs-érték párokat mentünk 
    }
    array.push(valueObject); // elmentjük az értékeket az array nevű tömbbe 

    const tbRow = document.createElement('tr'); // létrehozunk egy új sort a táblázatba
    tbody.appendChild(tbRow); // hozzáadjuk a sort a táblázat törzséhez (tbody)

    const szerzo = document.createElement('td'); // új cella a szerző mezőhöz
    szerzo.textContent = valueObject.szerzo; // a cellába a szerző értéke kerül
    tbRow.appendChild(szerzo); // cella hozzáadása a sorhoz

    const mufaj = document.createElement('td'); // új cella a műfaj mezőhöz
    mufaj.textContent = valueObject.mufaj; // a cellába a műfaj értéke kerül
    tbRow.appendChild(mufaj); // cella hozzáadása a sorhoz

    const cim = document.createElement('td'); // új cella a cím mezőhöz
    cim.textContent = valueObject.cim; // a cellába a cím értéke kerül
    tbRow.appendChild(cim); // cella hozzáadása a sorhoz
});

containerDiv.appendChild(tableDiv); // belerakjuk a table divet a containerbe
containerDiv.appendChild(formDiv); // aztán berakjuk a form divet is