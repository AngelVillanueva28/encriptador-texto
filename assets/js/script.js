const btnEncriptar = document.getElementById("btnEncriptar");
const btnDesencriptar = document.getElementById("btnDesencriptar");
const btnCopiar = document.getElementById("btnCopiar");
const entrada = document.getElementById("entrada");
const salida = document.getElementById("salida");
const salidaVacia = document.getElementById("cajavacia");

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

btnEncriptar.addEventListener("click", () => {
  let texto = String(entrada.value).replace(
    /(e)|(i)|(a)|(o)|(u)/g,
    (letter) => letterToWord[letter]
  );

  salida.value = texto;
  console.log(salida.value);

  entrada.value = "";
  mostrarBotonCopiar();
});

btnDesencriptar.addEventListener("click", () => {
  let texto = String(entrada.value).replace(
    /(enter)|(imes)|(ai)|(ober)|(ufat)/g,
    (word) => wordToLetter[word]
  );

  salida.value = texto;
  console.log(salida.value);
  entrada.value = "";
  mostrarBotonCopiar();
});

btnCopiar.addEventListener("click", () => {
  let texto = String(salida.value);

  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(texto);
    return;
  }
  navigator.clipboard.writeText(texto).then(
    function () {
      const entrada = document.createElement("div");
      entrada.innerHTML = "¡Contenido copiado al portapapeles!";
      entrada.classList.add("mensaje-confirmacion");
      document.body.appendChild(entrada);

      mostrarMensajeConfirmacion(entrada);
    },
    (err) => {
      console.error("Error al copiar texto al portapapeles: ", err);
    }
  );

  salida.value = "";
});

function mostrarMensajeConfirmacion(entrada) {
  entrada.classList.add("mostrar");
  setTimeout(() => {
    entrada.classList.remove("mostrar");
  }, 3000);
  setTimeout(() => {
    entrada.remove();
  }, 3300);
  ocultarBotonCopiar();
}

const mostrarBotonCopiar = () => {
  btnCopiar.classList.remove("input__btnCopiar-ocultar");
  btnCopiar.classList.add("btn", "input__btnCopiar");

  mostrarTexto();
  mostrarMensaje();
};
const ocultarBotonCopiar = () => {
  btnCopiar.classList.remove("btn", "input__btnCopiar");
  btnCopiar.classList.add("input__btnCopiar-ocultar");

  ocultarTexto();
  ocultarMensaje();
};

function ocultarMensaje(){
  salidaVacia.classList.remove("box-output__fill");
  salidaVacia.classList.add("box-output__empty");
}

function mostrarMensaje(){
  salidaVacia.classList.remove("box-output__empty");
  salidaVacia.classList.add("box-output__fill");
}

function ocultarTexto(){
  salida.classList.remove("output__output");
  salida.classList.add("output__output-ocultar");
}

function mostrarTexto(){
  salida.classList.remove("output__output-ocultar");
  salida.classList.add("output__output");
}