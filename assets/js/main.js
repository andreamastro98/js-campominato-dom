//L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
//Ogni cella ha un numero progressivo, da 1 a 100.
//Ci saranno quindi 10 caselle per ognuna delle 10 righe.
//Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
//Bonus
//Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
//- con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
//- con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
//- con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;


//trovo dove stampare l'elemento
let griglia = document.querySelector(`.griglia`)


document.getElementById(`play-button`).addEventListener(`click`, function(){
//targettizzo il valore del selct nell'html con il suo valore selezionato
    var select = document.getElementById('select');
    var selectvalue = select.options[select.selectedIndex].value;


    griglia.innerHTML = ""
    //Stampa della griglia in base alla scelta della difficoltá
    if (selectvalue == 1){
        creaGriglia( 100 )
        //imposto la griglia da 9x9
        myFunction_set(100)
        //definisco box tot che mi servirá per le bombe     


    } else if (selectvalue == 2){
        creaGriglia( 81 )
        //imposto la griglia da 9x9
        myFunction_set(81)
        //definisco box tot che mi servirá per le bombe
        
        
    } else if (selectvalue == 3){
        creaGriglia( 49 )
        //imposto la griglia da 7x7
        myFunction_set(49)
        //definisco box tot che mi servirá per le bombe
        
    }
})
    

////////////////////darkmode/////////////////////////

//seleziono elemento root dal css
const r = document.querySelector(`:root`);

//variabile darkmode falsa
let darkmode = false

//funzione per settare una variabile
function FunctionDarkMode(){
    r.style.setProperty(`--sfondo`, `#1e644dcb`);
    r.style.setProperty(`--cellaAttiva`, `rgb(175, 175, 175)`);
}

//evento che al click mi attiva/disattiva la darkmode

document.getElementById(`dark-mode`).addEventListener(`click`, function(){
    if(!darkmode){
        FunctionDarkMode()
        darkmode = true
    } else {
        r.style.setProperty(`--sfondo`, `#7FFFD4`);
        r.style.setProperty(`--cellaAttiva`, `aliceblue`);
        darkmode = false
    }
})



//************************* FUNZIONI ****************************//

//FUNZIONE CREA ELEMENTO
function creaElementoHtml(tagHtml, classi, text){
    let elemento = document.createElement ( tagHtml );
    elemento.className = classi;
    elemento.innerText = text;
    return elemento //<div class="box grid-100">1</div>
}

//FUNZIONE STAMPA GRIGLIA
function creaGriglia( totbox ){
    //creo un array per le 16 bombe
    var arrayBombe = []

    //creo 16 bombe
    while( arrayBombe.length < 16){

        //genero un numero randomico che va da 1 al numero totale dei box
        let bomb = numRandom( 1 , totbox)

        //controllo se il numero generato é giá presente nell'array
        if ( !arrayBombe.includes(bomb)){

            //pusho il numero nell'array
            arrayBombe.push (bomb)
        }
    }

    console.log(arrayBombe)

    for (let i = 1; i <= totbox; i++){
        //associamo la funzione all'elemento che vogliamo creare
        const divbox = creaElementoHtml ("div", "box", i)

        //rendo cliccabile l'elemento
        divbox.addEventListener(`click`, function(){
            if(!arrayBombe.includes(i)){
                //aggiungo la classe aliceblue
                this.classList.toggle(`aliceblue`)
            } else {
                this.classList.add(`red`)
            }            
        })
        griglia.append( divbox )
    }

}

function numRandom( min, max ){
    let num = Math.floor( Math.random() * max ) + min
    return num
}

function myFunction_set(x){
    //radice quadrata del numero totale delle celle
    x = Math.sqrt(x)

    r.style.setProperty(`--numeroCelle`, x );
}




