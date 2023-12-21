import { Router } from "express";
import { ProductManager } from "../utils/Products/ProductManager.js";

const products = Router();

const manager = new ProductManager("./src/utils/Products/productos.json");

products.get("/", async (req, res) => {
  let { limit } = req.query;
  limit = parseInt(limit);
  /* prueba de ubicacion de carpeta para llamar a get products */
  var productos = await manager.getProducts();
  /* al existir el limite se utiliza y se hace el slice de productos */
  if (limit) {
    productos = productos.slice(0, limit);
  }
  res.send(productos);
});

products.get("/:id", async (req, res) => {
  let id = req.params.id;
  id = parseInt(id);
  let producto = await manager.getProductById(id);
  res.send(producto);
});
products.get("/idByCode/:code", async (req, res) => {
  let code = req.params.code;
  let product = await manager.getIdByCode(code);
  res.send(product);
});

const checkUser = async (req, res, next) => {
  const product = req.body;
  if (
    !product.title ||
    !product.description ||
    !product.price ||
    !product.code ||
    !product.stock ||
    !product.category
  ) {
    return res.status(400).send({ message: "product invalid" });
  }
  const id=await manager.getIdByCode(products.code)
  if (!id){
    return res.status(400).send({ message: "code invalid" });
  }
  next();
};

products.post("/", checkUser, async (req, res) => {
  /* se inicializa el id */
  const producto = req.body;
  await manager.addProducts(producto);
  res.send({ message: `producto agregado` });
});

products.put("/:id", (req, res) => {
  const pid = parseInt(req.params.id);
  const producto = req.body;
  manager.updateProduct(pid, producto);
  res.send({ message: `product updated ${pid}` });
});
products.delete("/:id", (req, res) => {
  const pid = parseInt(req.params.id);
  manager.deleteProduct(pid);
  res.send({ message: `producto borrado id:${pid}` });
});

export default products;
