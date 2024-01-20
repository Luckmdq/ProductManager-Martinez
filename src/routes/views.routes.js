import Axios from "axios";
import { Router } from "express";
import { getProducts } from "../dao/manager/productManager.js";
import { checkAout, checkExistingUser } from "../middlewares/outh.js";

const views = Router();


views.get('/', checkAout, (req, res) => {
  const {user} = req.session;
  res.render('index', user);
});

views.get('/login', checkExistingUser, (req, res) => {
  res.render('login');
});

views.get('/register', checkExistingUser, (req, res) => {
  res.render('register');
})

views.get("/home", async (req, res) => {
  const { data: productos } = await Axios.get(
    "http://localhost:8080/api/products"
  );
  return res.render("home", { productos });
});

views.get("/realtimeproducts", async (req, res) => {
  const { data: productos } = await Axios.get(
    "http://localhost:8080/api/products"
  );
  return res.render("realTimeProducts", { productos });
});

views.get("/products", async (req, res) => {
  let { limit = 2, page = 1, query = "", sort = "" } = req.query;
  const products = await getProducts(limit, page, sort, query);
  res.render("products", products);
});

export default views;
