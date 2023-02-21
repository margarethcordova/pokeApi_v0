//Inicializacion de variables
let uncoveredCards = 0;
let tarjet1 = null;
let tarjet2 = null;
let firstResult = null;
let secondResult = null;
let movements = 0;
let correct = 0;
let timer = false;
let time = 30;
let timeInitial = 30;
let regressiveTimeId = null;

//Apuntando a documento HTML
let showMoves = document.getElementById('movimientos');
let showCorrect = document.getElementById('aciertos');
let showTimer = document.getElementById('t-restante');

let winAudio = new Audio('./sounds/win.wav');
let loseAudio = new Audio('./sounds/lose.wav');
let clicAudio = new Audio('./sounds/clic.wav');
let goodAudio = new Audio('./sounds/good.wav');
let badAudio = new Audio('./sounds/bad.wav');

let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numbers = numbers.sort(()=>{return Math.random()-0.5});

//Funciones
function countTime() {
    regressiveTimeId = setInterval(()=>{
        time--;
        showTimer.innerHTML = `Tiempo: ${time} segundos`;
        if (time == 0) {
            clearInterval(regressiveTimeId);
            blockTarjet(numbers);
            loseAudio.play();
        }
    }, 1000);
}

function blockTarjet() {
    for (let i = 0; i <= 15; i++) {
        let blockTarjet = document.getElementById(i);
        blockTarjet.innerHTML = `<img src="./img/pokes/${numbers[i]}.png" alt="" class="img-main">`;
        blockTarjet.disabled = true;
    }
}

//Funtion principal
function destapar(id) {
    //se ejecute una vez parelalmente al comienzo del juego
    if (timer == false) {
        countTime();
        timer = true;
    }

    uncoveredCards++;

    if (uncoveredCards == 1) {
        //Mostrar primer numero
        tarjet1 = document.getElementById(id);
        firstResult = numbers[id];
        tarjet1.innerHTML = `<img src="./img/pokes/${firstResult}.png" alt="" class="img-main">`;
        clicAudio.play();

        //Desabilizar primer boton
        tarjet1.disabled = true;

    }else if (uncoveredCards == 2){
        //Mostrar segundo numero
        tarjet2 = document.getElementById(id);
        secondResult = numbers[id];
        tarjet2.innerHTML = `<img src="./img/pokes/${secondResult}.png" alt="" class="img-main">`;

        //Desabilizar segundo boton
        tarjet2.disabled = true;

        //Incrementar movimientos
        movements++;
        showMoves.innerHTML = `Movimientos: ${movements}`;

        if(firstResult == secondResult) {
            //Encerar contador de tarjetad destapadas
            uncoveredCards = 0;

            //Aumentar aciertos
            correct++;
            showCorrect.innerHTML = `Aciertos: ${correct}`;
            goodAudio.play();

            if (correct == 8) {
                winAudio.play();
                clearInterval(regressiveTimeId);
                showCorrect.innerHTML = `Aciertos: ${correct} &#129297;`;
                showTimer.innerHTML = `Excelente &#127881; ${timeInitial - time} segundos`;
                showMoves.innerHTML = `Movimientos: ${movements} &#x270C;&#128526;`; 
            }

        }else{
            badAudio.play();
            //Mostrar momentaneamente valores y volver a tapar
            setTimeout(()=>{
                tarjet1.innerHTML = ' ';
                tarjet2.innerHTML = ' ';
                tarjet1.disabled = false;
                tarjet2.disabled = false;
                uncoveredCards = 0;
            },800);
        }
    }

}
