let puntosUsuario = 0;
let puntosPC = 0;

let instrucciones = document.querySelector("#instrucciones");
let contenedorPuntosUsuario = document.querySelector("#puntos-usuario");
let contenedorPuntosPC = document.querySelector("#puntos-computadora");
let mensaje = document.querySelector("#mensaje");
let contenedorGanaPunto = document.querySelector("#gana-punto");
let elegiTuArma = document.querySelector("#elegi-tu-arma");

let contenedorEleccionUsuario = document.querySelector("#eleccion-usuario");
let contenedorEleccionPC = document.querySelector("#eleccion-computadora");

let botonesArmas = document.querySelectorAll(".arma");
botonesArmas.forEach(boton => {
    boton.addEventListener("click", iniciarTurno);
});

function iniciarTurno(e) {
    
    let eleccionPC = Math.floor(Math.random() * 3);
    let eleccionUsuario = e.currentTarget.id;

    // hidro bomba  => 0
    // mega rayo => 1
    // hiper fuego  => 2

    if (eleccionPC === 0) {
        eleccionPC = "Aquabomba💧";
    } else if (eleccionPC === 1) {
        eleccionPC = "Llamarada🔥"
    } else if (eleccionPC === 2) {
        eleccionPC = "hipactrueno⚡"
    }

    // hidro bomba vence a hiper fuego
    // hiper fuego vence a mega rayo 
    // mega rayo vence a hidro bomba 
    // si son iguales es empate

    if (
        (eleccionUsuario === "Aquabomba💧" && eleccionPC === "Llamarada🔥") ||
        (eleccionUsuario === "Llamarada🔥" && eleccionPC === "hipactrueno⚡") ||
        (eleccionUsuario === "hipactrueno⚡" && eleccionPC === "Aquabomba💧")
    ) {
        ganaUsuario();
    } else if (
        (eleccionPC === "Aquabomba💧" && eleccionUsuario === "Llamarada🔥") ||
        (eleccionPC === "Llamarada🔥" && eleccionUsuario === "hipactrueno⚡") ||
        (eleccionPC === "hipactrueno ⚡" && eleccionUsuario === "Aquabomba💧")
    ) {
        ganaPC();
    } else {
        empate();
    }

    mensaje.classList.remove("disabled");
    contenedorEleccionUsuario.innerText = eleccionUsuario;
    contenedorEleccionPC.innerText = eleccionPC;

    if (puntosUsuario === 5 || puntosPC === 5) {

        if (puntosUsuario === 5) {
            instrucciones.innerText = "🔥¡Ganaste el juego!🔥"
        }

        if (puntosPC === 5) {
            instrucciones.innerText = "😭¡La computadora ganó el juego!😭"
        }

        elegiTuArma.classList.add("disabled");
        reiniciar.classList.remove("disabled");
        reiniciar.addEventListener("click", reiniciarJuego);
    }


}

function ganaUsuario() {
    puntosUsuario++;
    contenedorPuntosUsuario.innerText = puntosUsuario;
    contenedorGanaPunto.innerText = "¡Ganaste un punto!🔥"
}

function ganaPC() {
    puntosPC++;
    contenedorPuntosPC.innerText = puntosPC;
    contenedorGanaPunto.innerText = "¡La computadora ganó un punto!😭"
}

function empate() {
    contenedorGanaPunto.innerText = "¡Empate!😱"
}

function reiniciarJuego() {
    reiniciar.classList.add("disabled");
    elegiTuArma.classList.remove("disabled");
    mensaje.classList.add("disabled");

    puntosUsuario = 0;
    puntosPC = 0;
    
    contenedorPuntosUsuario.innerText = puntosUsuario;
    contenedorPuntosPC.innerText = puntosPC;

    instrucciones.innerText = "El primero en llegar a 5 puntos gana!"
}