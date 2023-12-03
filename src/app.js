import express from "express";
import { ProductManager }  from "./ProductManager/ProductManager.js";

const app = express();
const PORT = 8080;
const manager = new ProductManager("./src/ProductManager/productos.json");

app.get('/', (req,res)=>{
	res.send('Homepage');
});

app.get('/products/',async (req,res)=>{
	/* prueba de ubicacion de carpeta para llamar a get products */
	var productos=await manager.getProducts();
	res.send(`${productos}`);
});

app.listen(PORT, () => {
  console.log(`servidor funcionando en ${PORT}`);
});
