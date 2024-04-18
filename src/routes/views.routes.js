import Axios from "axios";
import { Router } from "express";
import { getProducts } from "../dao/manager/productManager.js";
import { authToken, verificacionToken } from "../dto/config/jwt.config.js";
import { obtenerPorId } from "../dto/controllers/productos.controller.js";

const viewsRoutes = Router();

/* Usuarios */
viewsRoutes.get("/", authToken, (req, res) => {
  console.log(req.user);
  if (!req.user) {
    res.redirect("/login");
    return;
  }
  res.render("index", req.user);
});

viewsRoutes.get("/login", authToken, (req, res) => {
  if (!req.user) {
    res.render("login");
    return;
  }
  res.redirect("/");
});

viewsRoutes.get("/register", authToken, (req, res) => {
  if (!req.user) {
    res.render("register");
    return;
  }
  res.redirect("/");
});

viewsRoutes.get("/restore-password", authToken, (req, res) => {
  if (!req.user) {
    res.render("restore-password");
    return;
  }
  res.redirect("/");
});

viewsRoutes.get("/restore-password/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const verificado = await verificacionToken(token);
    if (!verificado) {
      res
        .send({ mensaje: "Acceso no autorizado" })
        .redirect("/restore-password");
      return;
    }
    console.log(verificado);
    return res.render("new-contraseña", verificado);
  } catch (error) {
    console.log(error);
  }
});

viewsRoutes.get("/new-password", (req, res) => {
  res.render("new-password");
});

viewsRoutes.get("/home", async (req, res) => {
  await fetch("http://localhost:8080/api/productos/")
    .then((respuesta) => respuesta.json())
    .then((data) => {
      console.log("respuesta", data);
      return res.render("home", { data });
    });
});

/* productos */
viewsRoutes.get("/realtimeproducts", async (req, res) => {
  const { data: productos } = await Axios.get(
    "http://localhost:8080/api/products"
  );
  return res.render("realTimeProducts", { productos });
});

viewsRoutes.get("/products", async (req, res) => {
  let { limit = 2, page = 1, query = "", sort = "" } = req.query;
  const products = await getProducts(limit, page, sort, query);
  res.render("products", products);
});

viewsRoutes.get("/producto-nuevo", authToken, (req, res) => {
  if (!req.user) {
    res.redirect("/login");
    return;
  }
  res.render("producto-nuevo");
});

viewsRoutes.get("/modificacion-producto/:PId", authToken, obtenerPorId);

export default viewsRoutes;
