import express from "express";
import  products  from "./routes/product.routes.js";
import  carts  from "./routes/carts.routes.js";

/* la organizacion se me ocurrio sobre la marcha, nose si esta bien, osea el router enruta desde la ruta al utils que es el que almacena los archivos por asi decirlo, nose si esta bien o hay algun otro modo, mas que nada para no matar la persistencia de archivos, por ahi mas adelante se ve otro modo xD */


const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use("/api/products", products);
app.use("/api/carts",carts);



app.listen(PORT, () => {
  console.log(`servidor funcionando en ${PORT}`);
});
