export default class Carta {
  /**
   * @param {number} id;
   * @param {string} urlScryFall;
   * @param {string} nombre;
   * @param {string} urlImagen;
   * @param {number} precio;
   */

  constructor(id, nombre, urlImagen, precio, urlScryFall) {
    this.id = id;
    this.nombre = nombre;
    this.urlImagen = urlImagen;
    this.precio = precio;
    this.urlScryFall = urlScryFall;
  }

  toJsonString() {
    return JSON.stringify(this, null, 2);
  }

  static createFromJsonString(json) {
    const data = JSON.parse(json);
    return new Carta(
      data.id,
      data.nombre,
      data.urlImagen,
      data.precio,
      data.urlScryFall,
    );
  }

  createHTMLElement(){
    const magicCard = document.createElement('div');
    magicCard.id = this.id;
    magicCard.classList.add('magic-card');

    const nombre = document.createElement('p')
    nombre.classList.add('nombre')
    nombre.innerText = this.nombre;

    const img = document.createElement('img');
    img.classList.add('portada');
    img.src = this.urlImagen;
    img.alt = `Portada: ${this.nombre}`

    const precio = document.createElement('div');
    precio.classList.add('precio')
    precio.innerText = `Precio: ${this.precio}`;

    const imgLink = document.createElement('a');
    imgLink.classList.add('card-link');
    imgLink.href = this.urlScryFall;
    imgLink.target = '_blank';
    imgLink.appendChild(img);

    const botonFavoritos = document.createElement('button');
    botonFavoritos.classList.add('boton-favoritos');
    botonFavoritos.innerText = 'Guardar'
    botonFavoritos.id = this.id;
    botonFavoritos.style.backgroundColor = 'var(--color-terciario)';

    magicCard.appendChild(nombre);
    magicCard.appendChild(imgLink);
    magicCard.appendChild(precio);
    magicCard.appendChild(botonFavoritos);
    return magicCard;
  }

}
