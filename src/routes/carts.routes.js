import { Router } from "express";
import {
  addCart,
  addProductOnCart,
  deleteCart,
  getById,
  getCarts,
} from "../dao/manager/cartManager.js";

const carts = Router();

carts.get("/", async (req, res) => {
  const value = await getCarts();
  res.send(value.dato);
});

carts.post("/", async (req, res) => {
  const { products } = req.body;
  let respuesta = await addCart(products);
  res.send(respuesta.message);
});

carts.delete("/:CId", async (req, res) => {
  const { CId } = req.params;
  let resp = await deleteCart(CId);
  res.send(resp.message);
});

carts.get("/:CId", async (req, res) => {
  const { CId } = req.params;
  let resp = await getById(CId);
  if (!resp.dato.name) {
    return res.send(resp.dato);
  }
  res.status(404).json({ msg: "No se encontro el carrito" });
});

carts.post("/:CId/:Pid", async (req, res) => {
	const { CId,Pid } = req.params;
	let data=await addProductOnCart(CId,Pid);
	res.send(data.message)
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
