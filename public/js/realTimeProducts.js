/* Sugerencias

Ya que la conexión entre una consulta HTTP y websocket no está contemplada dentro de la clase. Se recomienda que, para la creación y eliminación de un producto, Se cree un formulario simple en la vista  realTimeProducts.handlebars. Para que el contenido se envíe desde websockets y no HTTP. Sin embargo, esta no es la mejor solución, leer el siguiente punto.
Si se desea hacer la conexión de socket emits con HTTP, deberás buscar la forma de utilizar el servidor io de Sockets dentro de la petición POST. ¿Cómo utilizarás un emit dentro del POST?
 */

const socket = io();

const mainRender = document.getElementById("selector");

const formulario = document.getElementById("form");

const title = document.getElementById("titleProduct");
const description = document.getElementById("descriptionProduct");
const price = document.getElementById("priceProduct");
const thumbnail = document.getElementById("thumbnailProduct");
const code = document.getElementById("codeProduct");
const stock = document.getElementById("stockProduct");
const btnFun = document.getElementById("funcionalidad");

/* rendericado de productos */
socket.on("renderPrincipal", (productos) => {
  let item = "";
  productos.map((producto) => {
    item += `
    <li id="${producto.id}">
		nombre:${producto.title} /
		Precio:$ ${producto.price} //
		Cantidad: ${producto.stock} //
		<button aria-label="${producto.id}">editar</button> //
		<button aria-label="${producto.id}">eliminar</button>
	  </li>`;
  });
  mainRender.innerHTML = item;
});

socket.emit("renderizado");

socket.on("productoSolicitado", (producto) => {
  /* se modifcan los valores con los valores del producto seleccionado */
  title.value = producto.title;
  description.value = producto.description;
  price.value = producto.price;
  thumbnail.value = producto.thumbnail;
  code.value = producto.code;
  stock.value = producto.stock;
  btnFun.innerText = "Modificar";
});

/* renderizado de productos actualizados */

mainRender.addEventListener("click", (e) => {
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

btnFun.addEventListener("click", (e) => {
  e.preventDefault();
  let accion = btnFun.innerText;
  const producto = {
    title: title.value,
    description: description.value,
    price: parseInt(price.value),
    thumbnail: thumbnail.value,
    code: code.value,
    stock: parseInt(stock.value),
  };
  socket.emit(`product${accion}`, producto);
});
