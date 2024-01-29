import Axios from "axios";
import { Router } from "express";
import { getProducts } from "../dao/manager/productManager.js";
import { checkAout, checkExistingUser } from "../middlewares/outh.js";

const viewsRoutes = Router();

/* Usuarios */
viewsRoutes.get("/", checkAout, (req, res) => {
  const { user } = req.session;
  res.render("index", user);
});

viewsRoutes.get("/login", checkExistingUser, (req, res) => {
  res.render("login");
});

viewsRoutes.get("/register", checkExistingUser, (req, res) => {
  res.render("register");
});

viewRoutes.get("/restore-password", checkExistingUser, (req, res) => {
  res.render("restore-password");
});

viewRoutes.get("/faillogin", (req, res) => {
  res.render("faillogin");
});
viewRoutes.get("/failregister", (req, res) => {
  res.render("failregister");
});

viewsRoutes.get("/home", async (req, res) => {
  const { data: productos } = await Axios.get(
    "http://localhost:8080/api/products"
  );
  return res.render("home", { productos });
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
