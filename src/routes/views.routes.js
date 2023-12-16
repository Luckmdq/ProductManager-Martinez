import Axios from "axios";
import { Router } from "express";

const views = Router();

views.get("/", async (req, res) => {
  const { data: productos } = await Axios.get(
    "http://localhost:8080/api/products"
  );
  console.log(productos);
  return res.render("home", productos);
});

views.get("/realtimeproducts", (req, res) => {
  data = { title: "productos" };
  return res.render("realTimeProducts", data);
});

export default views;
