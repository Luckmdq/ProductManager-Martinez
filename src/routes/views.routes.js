import Axios from "axios";
import { Router } from "express";

const views = Router();

views.get("/", async (req, res) => {
  const { data: productos } = await Axios.get(
    "http://localhost:8080/api/products"
  );
  return res.render("home", {productos});
});

views.get("/realtimeproducts", async(req, res) => {
    const { data: productos } = await Axios.get(
      "http://localhost:8080/api/products"
    );
  return res.render("realTimeProducts", {productos});
});

export default views;
