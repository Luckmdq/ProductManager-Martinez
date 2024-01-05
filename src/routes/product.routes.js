import { Router } from "express";
import {
  addProduct,
  getProducts,
  getById,
  deleteProduct,
  modProduct,
} from "../dao/manager/productManager.js";

const products = Router();

products.get("/", async (req, res) => {
  let { limit } = req.query;
  let productos = await getProducts();
  res.send(productos.dato);
});

products.post("/", async (req, res) => {
  const product = req.body;
  let respuesta = await addProduct(product);
  res.send(respuesta.message);
});

products.get("/:PId", async (req, res) => {
  const { PId } = req.params;
  let data = await getById(PId);
  res.send(data.dato);
});

products.delete("/:PId", async (req, res) => {
  let { PId } = req.params;
  let rta = await deleteProduct(PId);
  if (rta.succes) {
    return res.status(200).send(rta.message);
  }
  return res.status(400).send(rta.message);
});

products.put("/:PId", async (req, res) => {
  let { PId } = req.params;
  let  productUpdate  = req.body;
  let rta = await modProduct(PId, productUpdate);
  rta ? res.send({ msg: "modificado" }) : res.send({ msg: "no modificado" });
});
/*
const manager = new ProductManager("./src/utils/Products/productos.json");

products.get("/", async (req, res) => {
  let { limit } = req.query;
  limit = parseInt(limit);
  var productos = await manager.getProducts();
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
 */
export default products;
