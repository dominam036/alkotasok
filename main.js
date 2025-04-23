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

containerDiv.appendChild(tableDiv); // belerakjuk a table divet a containerbe
containerDiv.appendChild(formDiv); // aztán berakjuk a form divet is