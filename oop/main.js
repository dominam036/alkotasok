const elvalaszto = document.createElement('hr'); // hogy a html-en egyszeruen megtalalhato legyen az elvalaszto oop es sima kozott
document.body.appendChild(elvalaszto); // hozzáadjk a bodyhoz az elválasztó vonalat

const mezoLista = [ // egy tömb, benne objektumokkal
    { fieldid: 'szerzo', fieldLabel: 'Szerző' }, // elso mezo id, felirat
    { fieldid: 'mufaj', fieldLabel: 'Műfaj' }, // masodik mezo id, felirat
    { fieldid: 'cim', fieldLabel: 'cím' } // harmadik mezo id, felirat
];
const table = new Table('table'); // létrehozunk egy új 'Table' osztálypéldányt 
const form = new Form('form', mezoLista); // létrehozunk egy új Form osztálypéldányt 