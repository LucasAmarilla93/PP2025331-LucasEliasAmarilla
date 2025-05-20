import Carta from "./carta.js";

async function getCartas(id, cantidad) {
  const cartas = [];
  let i = id + 1;

  while (cartas.length < cantidad) {
    try {
      const promise = await fetch(
        `https://api.allorigins.win/raw?url=https://examenesutn.vercel.app/api/cartas/${i}`
      );

      //Si se resolvio correctamente
      if (promise.status === 200) {
        const data = await promise.json();

        if (
          data.id &&
          data.nombre &&
          data.urlImagen &&
          data.precio &&
          data.urlScryFall
        ) {
          const carta = new Carta(
            data.id,
            data.nombre,
            data.urlImagen,
            data.precio,
            data.urlScryFall
          );
          cartas.push(carta);
        }
      } else if (promise.status !== 200) {
        console.log(`Carta con ID ${i} no encontrada`);
        break;
      }
    } catch (error) {
      console.error(`Error al obtener la carta con id: ${i}`);
      break;
    }
    i++;
  }
  return cartas;
}

async function renderCartas(id, cantidad) {
  const cartasContenedor = document.getElementById("cartas");
  const cartas = await getCartas(id, cantidad);

  //Limpio el contenedor
  cartasContenedor.innerHTML = "";
  if (cartas.length > 0) {
    for (const carta of cartas) {
      const cartaElemento = carta.createHTMLElement();
      cartasContenedor.appendChild(cartaElemento);
    }
    manejarBotonFavoritos(cartas);
  } else {
    console.log("No hay cartas para mostrar");
  }
  return cartas;
}

//Funciones de Paginas
async function paginaAnterior() {
  lastId -= 6;
  if (paginaActual === 2) {
    anterior.disabled = true;
    lastId = 0;
  }

  cartas = await renderCartas(lastId, CANTIDAD_CARTAS);
  paginaActual--;
}

async function paginaSiguiente() {
  lastId = cartas[cartas.length - 1].id;
  if (anterior.disabled) {
    anterior.disabled = false;
  }
  cartas = await renderCartas(lastId, CANTIDAD_CARTAS);
  paginaActual++;
}

//Funcion para guardar en el localStorage.
function guardarCarta(carta) {
  let favoritos = JSON.parse(localStorage.getItem("cartas")) || [];
  const cartaGuardada = favoritos.some((fav) => fav.id === carta.id);
  if (cartaGuardada) {
    return false; // No la agregamos de nuevo
  }
  favoritos.push(carta);
  localStorage.setItem("cartas", JSON.stringify(favoritos));
}

function manejarBotonFavoritos(cartas) {
  const botonFavoritos = document.querySelectorAll(".boton-favoritos");
  botonFavoritos.forEach((boton) => {
    boton.addEventListener("click", () => {
      const id = parseInt(boton.id);
      const carta = cartas.find((c) => c.id === id);
      guardarCarta(carta);
    });
  });
}

const CANTIDAD_CARTAS = 6;
let lastId = 0;
let paginaActual = 1;

let cartas = await renderCartas(lastId, CANTIDAD_CARTAS);

const anterior = document.getElementById("anterior");
const siguiente = document.getElementById("siguiente");

anterior.addEventListener("click", paginaAnterior);
siguiente.addEventListener("click", paginaSiguiente);
