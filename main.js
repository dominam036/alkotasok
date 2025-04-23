/**
 * @typedef {{szerzo:String, cim:string, mufaj:string}}Mu
 * 
 * @type {Mu[]} array
 */
const array = []; // létrehozunk egy array tömböt

const containerDiv = makeDiv('container'); // létrehoz egy divet a 'container' osztállyal
document.body.appendChild(containerDiv); // hozzáadja a divet a dokumentum törzséhez

tablaKrealas(containerDiv, (bodyOfTable) => { // létrehozza a táblázatot
    createForm(bodyOfTable, containerDiv, array); // létrehoz egy űrlapot
    createFileUploader(bodyOfTable, containerDiv, array); // létrehoz egy fájlfeltöltő funkciót
    fajlLetoltes(containerDiv, array); // hozzáad egy letöltési funkciót
    szurtFilter(containerDiv, bodyOfTable, array); // hozzáad egy szűrési funkciót
});
