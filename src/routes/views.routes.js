import Axios from "axios";
import { Router } from "express";
import { getProducts } from "../dao/manager/productManager.js";
import { authToken, verificacionToken } from "../dto/config/jwt.config.js";

const viewsRoutes = Router();

/* Usuarios */
viewsRoutes.get("/", authToken, (req, res) => {
  res.render("index", req.user);
});

viewsRoutes.get("/login", authToken, (req, res) => {
  if (!req.user) {
    res.render("login");
  }
  res.redirect("/");
});

viewsRoutes.get("/register", authToken, (req, res) => {
  if (!req.user) {
    res.render("register");
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
      res.send({ mensaje: "Acceso no autorizado" });
      return;
    }
    console.log(verificado)
    return res.render("new-contraseña", verificado );
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

export default viewsRoutes;
