import { Router } from "express";
import {
  agregarProducto,
  borrar,
  crear,
  obtenerCarrito,
  obtenerCarritos,
	actualizar,
} from "../controllers/carrito.controller.js";


const carritoRutas = Router();

carritoRutas.get("/", obtenerCarritos);
carritoRutas.get("/:CId", obtenerCarrito); //arreglar respuesta por error
carritoRutas.post("/", crear);
carritoRutas.post("/agregarproducto", agregarProducto);
carritoRutas.delete("/borrarCarrito/:CId", borrar);
/* faltan modificar */
carritoRutas.put("/actualizarProducto/:CId", actualizar);

export default carritoRutas;
