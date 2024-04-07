import { Router } from "express";
import {
  actualizarProducto,
  agregarProducto,
  borrarProducto,
  obtenerPorCodigo,
  obtenerPorId,
  obtenerProductos,
} from "../dto/controllers/productos.controller.js";

const productosRutas = Router();

productosRutas.get("/", obtenerProductos);
productosRutas.post("/", agregarProducto);
productosRutas.get("/:PId", obtenerPorId);
productosRutas.get("/porCodigo/:codigo", obtenerPorCodigo);
productosRutas.delete("/:PId", borrarProducto);
productosRutas.put("/:PId", actualizarProducto);

export default productosRutas;
