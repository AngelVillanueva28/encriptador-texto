const btnEncriptar = document.getElementById("btnEncriptar");
const btnDesencriptar = document.getElementById("btnDesencriptar");
const btnCopiar = document.getElementById("btnCopiar");
const entrada = document.getElementById("entrada");
const salida = document.getElementById("salida");
const salidaVacia = document.getElementById("cajavacia");
const contador = document.getElementById("counter");

const letterToWord = {
  e: "enter",
  i: "imes",
  a: "ai",
  o: "ober",
  u: "ufat",
};
const wordToLetter = {
  enter: "e",
  imes: "i",
  ai: "a",
  ober: "o",
  ufat: "u",
};

function validarMayusculasAcentos(texto) {
  let patron = /[A-ZÁÉÍÓÚÜáéíóúü]/;
  return patron.test(texto);
}

function verificarContenido(texto) {
  if (texto.length !== 0 && !validarMayusculasAcentos(texto)) {
    salida.value = texto;
    entrada.value = "";
    entrada.style.height = "auto";
    mostrarBotonCopiar();
  } else {
    const status = crearMensajeEstado(
      texto.length == 0
        ? "Debe ingresar un texto en el campo"
        : "Debe ingresar un texto con solo letras minúsculas y sin acento"
    );
    mostrarMensajeEstado(status, "badge__status-failure");
  }
}

btnEncriptar.addEventListener("click", () => {
  let texto = String(entrada.value).replace(
    /(e)|(i)|(a)|(o)|(u)/g,
    (letter) => letterToWord[letter]
  );

  verificarContenido(texto);
});

btnDesencriptar.addEventListener("click", () => {
  let texto = String(entrada.value).replace(
    /(enter)|(imes)|(ai)|(ober)|(ufat)/g,
    (word) => wordToLetter[word]
  );

  verificarContenido(texto);
});

btnCopiar.addEventListener("click", () => {
  let texto = String(salida.value);
  let status;

  if (navigator.userAgent.match(/ipad|iphone/i)) {
    // En iOS, debemos crear un elemento temporal para seleccionar el texto
    let campoTemporal = document.createElement("textarea");
    campoTemporal.value = texto;
    document.body.appendChild(campoTemporal);
    campoTemporal.select();
    document.execCommand("copy");
    document.body.removeChild(campoTemporal);
    status = crearMensajeEstado("¡Contenido copiado al portapapeles!");
    mostrarMensajeEstado(status, "badge__status-success");
  } else {
    // En otros dispositivos móviles, podemos seleccionar el texto directamente
    salida.select();
    document.execCommand("copy");
    status = crearMensajeEstado("¡Contenido copiado al portapapeles!");
    mostrarMensajeEstado(status, "badge__status-success");
  }

  salida.value = "";
});


function crearMensajeEstado(mensaje) {
  const status = document.createElement("div");
  status.innerHTML = mensaje;
  status.classList.add("badge");
  document.body.appendChild(status);
  return status;
}

function mostrarMensajeEstado(status, estilo) {
  setTimeout(() => {
    status.classList.add("mostrar", estilo);
  }, 10);
  setTimeout(() => {
    status.classList.remove("mostrar");
  }, 4000);
  setTimeout(() => {
    status.remove();
  }, 4300);
  ocultarBotonCopiar();
}

const mq = window.matchMedia("(max-width: 768px)");

const mostrarBotonCopiar = () => {
  btnCopiar.classList.remove("input__btnCopiar-ocultar");
  btnCopiar.classList.add("btn", "input__btnCopiar");

  toggleClass(salida, "output__output-ocultar", "output__output");
  toggleClass(salidaVacia, "box-output__empty", "box-output__fill");

  if (mq.matches) {
    salida.style.minHeight = "auto";
  }

  contador.textContent = entrada.value.length + "/450";
};
const ocultarBotonCopiar = () => {
  btnCopiar.classList.remove("btn", "input__btnCopiar");
  btnCopiar.classList.add("input__btnCopiar-ocultar");

  toggleClass(salida, "output__output", "output__output-ocultar");
  toggleClass(salidaVacia, "box-output__fill", "box-output__empty");
};

function toggleClass(tag, classToRemove, classToAdd) {
  tag.classList.remove(classToRemove);
  tag.classList.add(classToAdd);
}

entrada.addEventListener("input", () => {
  if (entrada.value.length > 450) {
    entrada.value = entrada.value.substring(0, 450);
  }

  contador.textContent = entrada.value.length + "/450";
  entrada.style.height = "auto";
  entrada.style.height = entrada.scrollHeight + "px";
});

salida.addEventListener("input", () => {
  salida.style.height = "auto";
  salida.style.height = salida.scrollHeight + "px";
});
