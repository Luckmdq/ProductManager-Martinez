import { Router } from "express";
import {
  addCart,
  addProductOnCart,
  deleteCart,
  deleteProductOnCart,
  getById,
  getCarts,
  setCart,
} from "../dao/manager/cartManager.js";

/* 
DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado.

PUT api/carts/:cid deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.

PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body

DELETE api/carts/:cid deberá eliminar todos los productos del carrito 

Esta vez, para el modelo de Carts, en su propiedad products, el id de cada producto generado dentro del array tiene que hacer referencia al modelo de Products. Modificar la ruta /:cid para que al traer todos los productos, los traiga completos mediante un “populate”. De esta manera almacenamos sólo el Id, pero al solicitarlo podemos desglosar los productos asociados.

*/

const carts = Router();

/* get */
carts.get("/", async (req, res) => {
  const value = await getCarts();
  res.send(value.dato);
});

carts.get("/:CId", async (req, res) => {
  const { CId } = req.params;
  let resp = await getById(CId);
  if (!resp.dato.name) {
    return res.send(resp.dato);
  }
  res.status(404).json({ msg: "No se encontro el carrito" });
});

/* post */

carts.post("/", async (req, res) => {
  let respuesta = await addCart();
  res.json({ respuesta });
});

carts.post("/:CId/:Pid", async (req, res) => {
  const { CId, Pid } = req.params;
  let data = await addProductOnCart(CId, Pid);
  res.send(data.message);
});

/* delete */

carts.delete("/:CId", async (req, res) => {
  const { CId } = req.params;
  let resp = await deleteCart(CId);
  res.send(resp.message);
});

carts.delete("/:CId/products/:PId", async (req, res) => {
  const { CId, PId } = req.params;
  let resp = await deleteProductOnCart(CId, PId);
  res.send(resp.message);
});

/* put */
carts.put("/:CId", async (req, res) => {
  const { CId } = req.params;
  let cart  = req.body;
  let respuesta = await setCart(CId, cart);
  res.send(respuesta);
});

/* 
const manager = new CartManager("./src/utils/Cart/cart.json");

carts.post("/", (req, res) => {
	const cart=req.body;
	console.log(cart)
	manager.addCart(cart);
	res.send({message:"carrito agregado"})
});



carts.get("/", async (req, res) => {
	const carts=await manager.getCarts();
	res.send(carts);
});

carts.get("/:cid", async (req, res) => {
	const id= await parseInt(req.params.cid);
	const productos=await manager.getProductosOfCartbyId(id);
	res.send(productos);
});


carts.post("/:cid/:pid", async (req, res) => {
	const {cid,pid}= req.params;
	await manager.addProductOnCart(cid,pid)
	res.send({"message":`producto agregado al carrito:${pid}`})
});

*/
export default carts;
