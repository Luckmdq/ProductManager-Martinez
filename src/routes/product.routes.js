import { Router } from "express";
import {
  addProduct,
  getProducts,
  getById,
  deleteProduct,
  modProduct,
  getByCode,
} from "../dao/manager/productManager.js";

const products = Router();
/* -limit permitirá devolver sólo el número de elementos solicitados al momento de la petición, en caso de no recibir limit, éste será de 10.
page permitirá devolver la página que queremos buscar, en caso de no recibir page, ésta será de 1
query, el tipo de elemento que quiero buscar (es decir, qué filtro aplicar), en caso de no recibir query, realizar la búsqueda general
sort: asc/desc, para realizar ordenamiento ascendente o descendente por precio, en caso de no recibir sort, no realizar ningún ordenamiento


El método GET deberá devolver un objeto con el siguiente formato:
{
	status:success/error
payload: Resultado de los productos solicitados
totalPages: Total de páginas
prevPage: Página anterior
nextPage: Página siguiente
page: Página actual
hasPrevPage: Indicador para saber si la página previa existe
hasNextPage: Indicador para saber si la página siguiente existe.
prevLink: Link directo a la página previa (null si hasPrevPage=false)
nextLink: Link directo a la página siguiente (null si hasNextPage=false)
}

Se deberá poder buscar productos por categoría o por disponibilidad, y se deberá poder realizar un ordenamiento de estos productos de manera ascendente o descendente por precio.



*/
products.get("/", async (req, res) => {
  let { limit=10, page=1, sort='', query='' } = req.query;
  let rta = await getProducts(limit,page,sort,query);
  if(!rta){
    res.status(400).json({message:'not found'})
  }
  res.send(rta);
});

products.post("/", async (req, res) => {
  const product = req.body;
  let respuesta = await addProduct(product);
  res.send(respuesta);
});

products.get("/:PId", async (req, res) => {
  const { PId } = req.params;
  let data = await getById(PId);
  res.json(data);
});

products.get("/bycode/:code", async (req, res) => {
  const { code } = req.params;
  let data = await getByCode(code);
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
  let productUpdate = req.body;
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
