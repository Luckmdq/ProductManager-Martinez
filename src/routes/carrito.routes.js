//Implementar, en el router de carts, la ruta /:cid/purchase, la cual permitirá finalizar el proceso de compra de dicho carrito.
//La compra debe corroborar el stock del producto al momento de finalizarse
//Si el producto tiene suficiente stock para la cantidad indicada en el producto del carrito, entonces restarlo del stock del producto y continuar.
//Si el producto no tiene suficiente stock para la cantidad indicada en el producto del carrito, entonces no agregar el producto al proceso de compra. 
//Al final, utilizar el servicio de Tickets para poder generar un ticket con los datos de la compra.
//En caso de existir una compra no completada, devolver el arreglo con los ids de los productos que no pudieron procesarse.
//Una vez finalizada la compra, el carrito asociado al usuario que compró deberá contener sólo los productos que no pudieron comprarse. Es decir, se filtran los que sí se compraron y se quedan aquellos que no tenían disponibilidad.


import { Router } from "express";
import {
  agregarProducto,
  borrar,
  crear,
  obtenerCarrito,
  obtenerCarritos,
	actualizar,
} from "../dto/controllers/carrito.controller.js";
import { existeProducto } from "../dto/middlewares/productos.js";


const carritoRutas = Router();

carritoRutas.get("/", obtenerCarritos);
carritoRutas.post("/", crear);
carritoRutas.get("/:CId", obtenerCarrito); //arreglar respuesta por error
carritoRutas.post("/modificar/:CId", existeProducto, agregarProducto);
carritoRutas.delete("/modificar/:CId", borrar);
/* faltan modificar */
carritoRutas.put("/modificar/:CId", actualizar);

export default carritoRutas;
