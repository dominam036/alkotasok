const elvalaszto = document.createElement('hr'); // hogy a html-en egyszeruen megtalalhato legyen az elvalaszto oop es sima kozott
 document.body.appendChild(elvalaszto); // hozzáadjk a bodyhoz az elválasztó vonalat

const mezoLista = [ // egy tömb, benne objektumokkal
    { fieldid: 'szerzo', fieldLabel: 'Szerző' }, // elso mezo id, felirat
    { fieldid: 'mufaj', fieldLabel: 'Műfaj' }, // masodik mezo id, felirat
    { fieldid: 'cim', fieldLabel: 'cím' } // harmadik mezo id, felirat
];
const manager = new Manager(); // létrehozzunk egy manager osztálypéldányt
const table = new Table('table', manager); // létrehozunk egy új 'Table' osztálypéldányt 
const form = new Form('form', mezoLista, manager); // létrehozunk egy új Form osztálypéldányt 
const fileUploader = new UploadDownload('upload', manager); // a fájlfeltöltőnk példányosítása
const filterOop = new Filter('filter', manager); // a szűrésünk példányosítása