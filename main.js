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
const mezoListA = [ // egy tömb, benne objektumokkal
    { fieldid: 'szerzo', fieldLabel: 'Szerző' }, // elso mezo id, felirat
    { fieldid: 'mufaj', fieldLabel: 'Műfaj' }, // masodik mezo id, felirat
    { fieldid: 'cim', fieldLabel: 'cím' } // harmadik mezo id, felirat
];

for (const mezoObjektum of mezoListA) { // végigmegyünk minden mezőn
    const mezoDiv = makeDiv('field'); // field class-hoz tartozó div létrehozasa
    urlapElem.appendChild(mezoDiv); // hozzaadas az urlaphoz

    const label = document.createElement('label'); // létrehozunk egy cimket (label)
    label.htmlFor = mezoObjektum.fieldid; // beallitjuk hogy melyik inputhoz tartozik
    label.textContent = mezoObjektum.fieldLabel; // beállitjuk a cimke szövegét
    mezoDiv.appendChild(label); // hozzáadjuk a cimket a field divhez
    mezoDiv.appendChild(document.createElement('br')); // sortörés beszurása

    const input = document.createElement('input'); // létrehozunk egy input mezot
    input.id = mezoObjektum.fieldid; // beállitjuk az id-t
    mezoDiv.appendChild(input); // input hozzáadasa a field divhez

    mezoDiv.appendChild(document.createElement('br')); // sortörés beszurása
    const hiba = document.createElement('span'); // csinalunk egy span elemet hiba üzenetnek
    hiba.className = 'error'; // beállitjuk az osztályt hogy error legyen
    mezoDiv.appendChild(hiba); // hozzáfűzzük a hiba üzenet span-t a mezohöz
}

const hozzaadasGomb = document.createElement('button'); // letrehozunk egy gombot
hozzaadasGomb.textContent = 'Hozzáadás'; // beállitjuk a gomb szöveget
urlapElem.appendChild(hozzaadasGomb); // hozzáadjuk az urlaphoz

urlapElem.addEventListener('submit', (e) => { // eseményfigyelő a form beküldésére 
    e.preventDefault(); // megakadályozza az alapértelmezett működést (pl újratöltést)
    const valueObject = {}; // létrehozunk egy üres objektumot, amibe az inputok értékei kerülnek
    const bemenetiMezok = e.target.querySelectorAll('input'); // lekérjük az összes input mezőt az űrlapon belül
    let validE = true; // adunk a validE változónak egy kezdeti true értéket

    for (const mezo of bemenetiMezok) { // végigmegyünk az összes input mezőn
        const error = mezo.parentElement.querySelector('.error'); // lekérjük az inputhoz tartozó hibaüzenet mezőt
        if(!error){ // ha nincs ilyen mező
            console.error('nincs errorfield'); // kiírjuk a hibát a konzolra
            return; // megszakítjuk a függvény futását
        }
        error.textContent = ''; // ürítjük az esetleges korábbi hibaüzenetet
        if(mezo.value === ''){ // ha nincs megadva érték
            error.textContent = 'Add meg ezt is!!'; // beírjuk a hibaüzenetet
            validE = false; // beállítjuk hogy nem valid a form
        }
        valueObject[mezo.id] = mezo.value; // az objektumba kulcs-érték párokat mentünk
    }    
    if(validE){ // hogyha true akkor lefut
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
    }
    
});

containerDiv.appendChild(tableDiv); // belerakjuk a table divet a containerbe
containerDiv.appendChild(formDiv); // aztán berakjuk a form divet is

const fileInput = document.createElement('input') // létrehozunk egy új input elemet
containerDiv.appendChild(fileInput) // hozzáadjuk a containerdiv-hez
fileInput.id = 'fileinput' // beállítjuk az id-jét fileinput-ra
fileInput.type = 'file' // típusát fájl feltöltésre állítjuk

fileInput.addEventListener('change', (e) => { // esemény amikor fájlt választanak ki
    const file = e.target.files[0] // lekérjük a kiválasztott első fájlt
    const beolvaso = new FileReader() // létrehozunk egy fájlbeolvasó objektumot

    beolvaso.onload = () => { // amikor kész a fájl beolvasása
        const fileLines = beolvaso.result.split('\n') // feldaraboljuk a fájl tartalmát sorokra
        const elsoSorNelkul = fileLines.slice(1) // levágjuk az első sort mert az fejléc

        for(const line of elsoSorNelkul){ // végigmegyünk minden soron
            const tisztitottSor = line.trim() // levágjuk a felesleges szóközöket elöl hátul
            const mezok = tisztitottSor.split(';') // a sort feldaraboljuk pontosvessző mentén

            const alkotas = { // létrehozunk egy új objektumot az adatokkal
                szerzo: mezok[0], // szerzo megadasa
                mufaj: mezok[1], // mufaj megadasa
                cim: mezok[2] // cim megadasa
            }

            array.push(alkotas) // hozzáadjuk az objektumot a tömbhöz

            const tableBodyRow = document.createElement('tr') // létrehozunk egy új sort a táblázatba
            tbody.appendChild(tableBodyRow) // hozzáadjuk a táblázat törzséhez

            const szerzoCell = document.createElement('td') // létrehozunk egy cellát a szerzőnek
            szerzoCell.textContent = alkotas.szerzo // beállítjuk a szerző nevét cellába
            tableBodyRow.appendChild(szerzoCell) // hozzáadjuk a sorhoz

            const mufajCell = document.createElement('td') // létrehozunk egy cellát a műfajnak
            mufajCell.textContent = alkotas.mufaj // beállítjuk a műfajt a cellába
            tableBodyRow.appendChild(mufajCell) // hozzáadjuk a sorhoz

            const cimCell = document.createElement('td') // létrehozunk egy cellát a címnek
            cimCell.textContent = alkotas.cim // beállítjuk a címet a cellába
            tableBodyRow.appendChild(cimCell) // hozzáadjuk a sorhoz
        }
    }
    beolvaso.readAsText(file) // elindítjuk a fájl szövegként való beolvasását
})