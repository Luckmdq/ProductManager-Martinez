import { Router } from "express";
import { CartManager } from "../utils/Cart/CartManager.js";

const carts = Router();

const manager = new CartManager("./src/utils/Cart/cart.json");


/* 
cart=[
	{
		id:...,
		products=[
			{
			id:..,
			cantidad:..,
			},
			{
			id:..,
			cantidad:..,
			},
			{
			id:..,
			cantidad:..,
			},
		]
	}
]
*/

carts.post("/", (req, res) => {
	/* reciviendo un array de un producto con respectiva cantidad sin id, ya que no existe */
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

/* 
	product={
		id:..,
		cantidad:..,
	}
*/

carts.post("/:cid/product/:pid", async (req, res) => {
	const cid= await parseInt(req.params.cid);
	const pid= await parseInt(req.params.pid);
	if (!await manager.getCartbyId(cid)){
		return res.send({"message":"carrito no encontrad"})
	}
	await manager.addProductOnCart(pid,cid)
	res.send({"message":`producto agregado al carrito:${pid}`})
});

export default carts