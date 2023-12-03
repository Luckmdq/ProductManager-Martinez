import express from "express";
import { ProductManager } from "./ProductManager/ProductManager.js";

const app = express();
const PORT = 8080;
const manager = new ProductManager("./src/ProductManager/productos.json");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Homepage");
});

/* busqueda de ID */

app.get("/products/:id", async (req, res) => {
	/* retorna el producto por el console.log del product manager (lo encuentra), pero al mostrarlo por aqui esta vacio el producto obtenido */
  let id = req.params.id;
	id=parseInt(id);
	let producto=manager.getProductById(id)
	res.send(producto);
});

/* get con query */
app.get("/products", async (req, res) => {
  let {limit} = req.query;
	limit=parseInt(limit)
  /* prueba de ubicacion de carpeta para llamar a get products */
  var productos = await manager.getProducts();
	/* al existir el limite se utiliza y se hace el slice de productos */
	if(limit){
		productos=productos.slice(0,limit)
	}
  res.send(productos);
});

app.listen(PORT, () => {
  console.log(`servidor funcionando en ${PORT}`);
});
