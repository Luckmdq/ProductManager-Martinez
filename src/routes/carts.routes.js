import { Router } from "express";
import { CartManager } from "../dao/managerFs/Cart/CartManager.js";

const carts = Router();

const manager = new CartManager("./src/utils/Cart/cart.json");

/* 

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


carts.post("/:cid/product/:pid", async (req, res) => {
	const {cid,pid}= req.params;
	await manager.addProductOnCart(cid,pid)
	res.send({"message":`producto agregado al carrito:${pid}`})
});

export default carts */