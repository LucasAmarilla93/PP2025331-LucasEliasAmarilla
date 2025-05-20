import Carta from "./carta.js";

function renderCartasFavoritas(favoritos){
    const favoritosContenedor = document.getElementById('cartas-favoritas');

    favoritosContenedor.innerHTML="";
    for(const carta of favoritos){
        let c = new Carta(carta.id,carta.nombre,carta.urlImagen, carta.precio, carta.urlScryFall);
        favoritosContenedor.appendChild(c.createHTMLElement(true));
    }
    
    return favoritos;
}


let favoritos = JSON.parse(localStorage.getItem('cartas')) || [];
renderCartasFavoritas(favoritos);

const ordenarPorNombre = document.getElementById('ordenarNombre');
const ordenarPorId = document.getElementById('ordenarId');

ordenarPorNombre.addEventListener('click', () => {
    favoritos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    renderCartasFavoritas(favoritos)
});

ordenarPorId.addEventListener('click', () => {
    favoritos.sort((a, b) => a.id - b.id);
    renderCartasFavoritas(favoritos)
});