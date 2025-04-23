class Area {//létrehozunk egy osztályt
    constructor(className) { // konstruktor, kap egy class nevet
        let containsDiv = document.querySelector('.containeroop'); // megnézi van-e már ilyen nevű container

        if (!containsDiv) { // ha nincs ilyen, akkor csinál egyet
            containsDiv = document.createElement('div'); // létrehoz egy új divet
            containsDiv.className = 'containeroop'; // beállítja a class nevét
            document.body.appendChild(containsDiv); // hozzáadja a bodyhoz
        }
        
        const div = document.createElement('div'); // létrehoz egy új divet a kapott class-hoz
        div.className = className; // beállítja a class nevet amit paraméterként kapott
        containsDiv.appendChild(div); // berakja az új divet a containeroop divbe
    }
}