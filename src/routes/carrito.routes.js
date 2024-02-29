import { Router } from "express";
import { obtenerCarritos } from "../controllers/carrito.controller.js";

const carritoRutas = Router();

carritoRutas.get("/", obtenerCarritos);

export default carritoRutas
