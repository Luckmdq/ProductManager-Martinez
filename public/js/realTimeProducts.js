/* Sugerencias

Ya que la conexión entre una consulta HTTP y websocket no está contemplada dentro de la clase. Se recomienda que, para la creación y eliminación de un producto, Se cree un formulario simple en la vista  realTimeProducts.handlebars. Para que el contenido se envíe desde websockets y no HTTP. Sin embargo, esta no es la mejor solución, leer el siguiente punto.
Si se desea hacer la conexión de socket emits con HTTP, deberás buscar la forma de utilizar el servidor io de Sockets dentro de la petición POST. ¿Cómo utilizarás un emit dentro del POST?
 */

const socket = io();

const selector = document.getElementById("selector");

const formulario = document.getElementById("form");

const title = document.getElementById("titleProduct");
const description = document.getElementById("descriptionProduct");
const price = document.getElementById("priceProduct");
const thumbnail = document.getElementById("thumbnailProduct");
const code = document.getElementById("codeProduct");
const stock = document.getElementById("stockProduct");

socket.on("productoSolicitado", (producto) => {
  title.placeholder = producto.title;
  description.placeholder = producto.description;
  price.placeholder = producto.price;
  thumbnail.placeholder = producto.thumbnail;
  code.placeholder = producto.code;
  stock.placeholder = producto.stock;
});

const seleccion = selector.addEventListener("click", (e) => {
  /* todo en el "panel de seleccion de los productos" para no generar uno por cada boton o campo de botones (fieldSet) */
  /* siendo:
         e.target.innerHTML el contenido de lo seleccionado 
         e.target.localName el tipo de elemento seleccionado 
         utilizando el aria label para poder identificar el id */
  if (e.target.localName === "button") {
    /* ya sabiendo que se preciono en un boton se pueden aislar las variables del mismo, ya que solo se encontrarian estas en la lista de productos */
    const idElemento = e.target.ariaLabel;
    const funcion = e.target.innerHTML;
    (funcion === "editar" || funcion === "eliminar") &&
      socket.emit(funcion, idElemento);
  }
});
