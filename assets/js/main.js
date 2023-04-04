//Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).
//Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
//In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
//La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
//Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
//BONUS:
//Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
//- difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
//- difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
//- difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;


//trovo dove stampare l'elemento
let griglia = document.querySelector(`.griglia`)


document.getElementById(`play-button`).addEventListener(`click`, function(){
//targettizzo il valore del selct nell'html con il suo valore selezionato
    var select = document.getElementById('select');
    var selectvalue = select.options[select.selectedIndex].value;

    griglia.innerHTML = ""
    document.getElementById("result").style.display = "none";
    //Stampa della griglia in base alla scelta della difficoltá
    if (selectvalue == 1){
        creaGriglia( 100 )
        //imposto la griglia da 9x9
        myFunction_set(100)
        //definisco il valore del calc dei box     


    } else if (selectvalue == 2){
        creaGriglia( 81 )
        //imposto la griglia da 9x9
        myFunction_set(81)
        //definisco il valore del calc dei box
        
        
    } else if (selectvalue == 3){
        creaGriglia( 49 )
        //imposto la griglia da 7x7
        myFunction_set(49)
        //definisco il valore del calc dei box
        
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

    let isGameOver = false
    let score = 0

    for (let i = 1; i <= totbox; i++){
        //associamo la funzione all'elemento che vogliamo creare
        const divbox = creaElementoHtml ("div", "box", i)

        //rendo cliccabile l'elemento
        divbox.addEventListener(`click`, function(){
            //controllo che il gioco non sia finito
            if (!isGameOver){
                //controllo se il box selezionato é nell'array e quindi é una bomba
                if(!arrayBombe.includes(i)){
                    //aggiungo la classe aliceblue
                    this.classList.toggle(`aliceblue`)
                    score++
                } else {
                    //aggiungo la classe red
                    this.classList.add(`red`)
                    //metto l'icona delle bombe al posto del numero
                    this.innerHTML = `<i class="fa-solid fa-bomb fa-bounce" style="color: #000000;"></i>`
                    //cambio il display del div RESULT
                    document.getElementById("result").style.display = "block";
                    //faccio uscire il messaggio nel div RESULT con lo score 
                    document.getElementById("result").innerHTML = `Hai perso :( <br> Il tuo risultato é ${score}pt. <br> Clicca sul pulsante gioca o un qualsiasi quadrato per iniziare un'altra partita.`;
                    //dico che il game é finito
                    isGameOver = true
                }       
            } else {
                griglia.innerHTML = ""
                document.getElementById("result").style.display = "none";
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




