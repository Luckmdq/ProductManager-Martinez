import { Router } from "express";
import {
  actualizarProducto,
  agregarProducto,
  borrarProducto,
  obtenerPorCodigo,
  obtenerPorId,
  obtenerProductos,
  productosGenerados,
} from "../dto/controllers/productos.controller.js";
import { authToken } from "../dto/config/jwt.config.js";

const productosRutas = Router();

//productosRutas.get("/", obtenerProductos);
productosRutas.post("/",authToken, agregarProducto);
productosRutas.get("/:PId", obtenerPorId);
productosRutas.post("/:PId", authToken , actualizarProducto);
productosRutas.delete("/:PId", borrarProducto);
productosRutas.get("/falseando", productosGenerados);
productosRutas.get("/porCodigo/:codigo", obtenerPorCodigo);

export default productosRutas;
