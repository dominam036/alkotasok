/**
 * @param {string} className - a div elem amit megadunk neki kívülről
 * @returns {HTMLElement} a div elem amit létrehozott 
 */
const makeDiv = (className) => { // csinál egy divet a megadott class névvel arrow functionnel
    const div = document.createElement('div'); // létrehoz egy új div elemet
    div.className = className; // beállítja a class nevét
    return div; // visszaadja a divet
}

/**
 * @param {function(HTMLElement):void} callback
 * @param {HTMLDivElement} container - az a div amelybe a táblázatot helyezzük
 */
const tablaKrealas = (container, callback) => {
    const tableDiv = makeDiv('table'); // csinál egy table nevű divet
    container.appendChild(tableDiv);

    const simaTable = document.createElement('table'); // csinál egy table elemet
    tableDiv.appendChild(simaTable); // belerakja a tableDiv-be (amit korábban csináltunk)
    
    const tableHead = document.createElement('thead'); // létrehozza a fejléc részt
    simaTable.appendChild(tableHead); // hozzáadja a táblázathoz a fejlécet
    
    const tableHeadRow = document.createElement('tr'); // egy sor a thead részbe
    tableHead.appendChild(tableHeadRow); // hozzáadjuk a sort a thead-hez
    
    const fejlecNevek = ['Szerző', 'cím', 'műfaj']; // a fejléc cellák tartalma, tömbbe tároljuk el
    for (const fejlec of fejlecNevek) { // végigmegyünk a tömb elemein
        const theadCella = document.createElement('th'); // csinálunk egy új th elemet
        theadCella.innerText = fejlec; // beleírjuk a cellába az aktuális elemet
        tableHeadRow.appendChild(theadCella); // hozzáadjuk a cellát a fejléchez
    }
    
    const tbody = document.createElement('tbody'); // létrehozzuk a table body részét
    simaTable.appendChild(tbody); // berakjuk a table-be
    callback(tbody); // meghívja a callback függvényt a létrehozott táblázat törzsével (tbody)
}


const formDiv = makeDiv('form'); // form divet is csinálunk

/**
 * @param {HTMLElement} tablebody
 * @param {HTMLDivElement} containerDiv 
 * @param {Mu[]} muArray
 */
const createFileUploader =(tablebody, containerDiv, muArray) => { // filefeltöltést itt csináljuk
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
                cim: mezok[1], // cím megadasa
                mufaj: mezok[2] // műfaj megadasa
            }

            muArray.push(alkotas) // hozzáadjuk az objektumot a tömbhöz
            addRow(alkotas, tablebody); // meghívjuk az addRow függvényt
        }
    }
    beolvaso.readAsText(file) // elindítjuk a fájl szövegként való beolvasását
})
}

/**
* @param {HTMLElement} tableBody 
* @param {HTMLElement} containerDiv
* @param {Mu[]} muArray
*/
const createForm = (tableBody, containerDiv, muArray) => { // létrehozzuk a formot
    const urlapDiv = makeDiv('form'); // letrehoz egy form elemet
    containerDiv.appendChild(urlapDiv); // hozzáadja a formDiv-hez

    const urlapElem = document.createElement('form'); // letrehoz egy form elemet
    urlapDiv.appendChild(urlapElem); // hozzáadja a formDiv-hez
    
    const mezoListA = [ // egy tömb, benne objektumokkal
        { fieldid: 'szerzo', fieldLabel: 'Szerző' }, // elso mezo id, felirat
        { fieldid: 'cim', fieldLabel: 'cím' }, // masodik mezo id, felirat
        { fieldid: 'mufaj', fieldLabel: 'műfaj' } // harmadik mezo id, felirat
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
            muArray.push(valueObject); // hozzáadjuk a valueObjectet a muArray-hoz
            addRow(valueObject, tableBody) // meghívjuk at addRow függvényt
        }
    });
}

/**
 * @param {Mu} alkotas
 * @param {HTMLTableSectionElement} tableBody
 */
const addRow = (alkotas, tableBody) => { // sorokat hozunk létre
    const tableBodyRow = document.createElement('tr') // létrehozunk egy új sort a táblázatba
    tableBody.appendChild(tableBodyRow) // hozzáadjuk a táblázat törzséhez

    const szerzoCell = document.createElement('td') // létrehozunk egy cellát a szerzőnek
    szerzoCell.textContent = alkotas.szerzo // beállítjuk a szerző nevét cellába
    tableBodyRow.appendChild(szerzoCell) // hozzáadjuk a sorhoz

    const cimCell = document.createElement('td') // létrehozunk egy cellát a címnek
    cimCell.textContent = alkotas.cim // beállítjuk a címet a cellába
    tableBodyRow.appendChild(cimCell) // hozzáadjuk a sorhoz

    const mufajCell = document.createElement('td') // létrehozunk egy cellát a műfajnak
    mufajCell.textContent = alkotas.mufaj // beállítjuk a műfajt a cellába
    tableBodyRow.appendChild(mufajCell) // hozzáadjuk a sorhoz
}


/**
 * @param {HTMLElement} container
 * @param {Mu[]} muArray
 */
const fajlLetoltes = (container, muArray) => { // fajlLetoltes fuggvény
    const letoltesGomb = document.createElement('button'); // csinálunk egy gombot
    letoltesGomb.textContent = 'Letöltés'; // beállítjuk a gomb szövegét hogy letöltés
    container.appendChild(letoltesGomb); // hozzáadjuk a containerhez a gombot
    
    letoltesGomb.addEventListener('click', () => { // ha rákattintanak a gombra ez lefut
        const link = document.createElement('a'); // csinálunk egy <a> elemet ami majd letöltésre lesz
    
        const tartalomTomb = ['szerző;cím;műfaj'] // létrehozunk egy tömböt fejléc sorral
    
        for(const mu of muArray){ // végigmegyünk az adatokon
            tartalomTomb.push(`${mu.szerzo};${mu.cim};${mu.mufaj}`); // összefűzzük az adatokat és betoljuk a tömbbe
        }
    
        const tartalom = tartalomTomb.join('\n'); // a tömb elemeit összerakjuk egy hosszú szöveggé sortöréssel
    
        const file = new Blob([tartalom]) // csinálunk egy blob fájlt a szövegből
    
        link.href = URL.createObjectURL(file); // generálunk egy ideiglenes fájlelérési linket
        link.download = 'newdata.csv' // beállítjuk hogy milyen néven mentse le a fájlt
        link.click(); // elindítjuk a letöltést
        URL.revokeObjectURL(link.href); // töröljük az ideiglenes linket hogy ne szemeteljen
    })
}
/**
 * @param {HTMLDivElement} container
 * @param {HTMLTableSectionElement} tableBody
 * @param {Mu[]} muArray
 */
const szurtFilter = (container, tableBody, muArray) => { // létrehoz egy szűrési űrlapot és hozzáadja a megadott container elemhez

    const szurtFormDiv = makeDiv('filterForm'); // létrehoz egy divet az űrlap számára
    container.appendChild(szurtFormDiv); // hozzáadja a divet a container elemhez

    const szurtForm = document.createElement('form'); // létrehoz egy form elemet
    szurtFormDiv.appendChild(szurtForm); // hozzáadja a formot a divhez

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

        const rendezettArray = [...muArray]; // másolatot készít az eredeti tömbről

        if (filterKey === ''){
            tableBody.innerHTML = ''; // Törli a táblázat tartalmáts
            for (const elem of rendezettArray) { // végigmegy a rendezett tömb elemein
                addRow(elem, tableBody); // hozzáad egy sort a táblázathoz az aktuális elemből
            }
        }else{
        const n = rendezettArray.length; // tömb hosszának lekérése
        for (let i = 0; i < n - 1; i++) { // külső ciklus a teljes tömb hosszáig
            for (let j = 0; j < n - i - 1; j++) { // belső ciklus az aktuális résztömb hosszáig
                if (rendezettArray[j][filterKey].toLowerCase() > rendezettArray[j + 1][filterKey].toLowerCase()) { // osszehasonlítja a két elemet
                    const temp = rendezettArray[j]; // cseréljük az elemeket ha az if teljesül
                    rendezettArray[j] = rendezettArray[j + 1]; // cseréljük az elemeket ha az if teljesül
                    rendezettArray[j + 1] = temp; // cseréljük az elemeket ha az if teljesül
                }
            }
        }
        tableBody.innerHTML = ''; // törli a táblázat tartalmát

        for (const elem of rendezettArray) { // végigmegy a rendezett tömb elemein
            addRow(elem, tableBody); // hozzáad egy sort a táblázathoz az aktuális elemből
        }
        }
    });
}