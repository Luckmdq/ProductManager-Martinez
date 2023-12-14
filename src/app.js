import express from "express";
import products from "./routes/product.routes.js";
import carts from "./routes/carts.routes.js";

import { Server } from "socket.io";
import  handlebars  from "express-handlebars";

/* la organizacion se me ocurrio sobre la marcha, nose si esta bien, osea el router enruta desde la ruta al utils que es el que almacena los archivos por asi decirlo, nose si esta bien o hay algun otro modo, mas que nada para no matar la persistencia de archivos, por ahi mas adelante se ve otro modo xD */

/* inicializacion express */
const app = express();
const PORT = 8080;

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* handlebars */

app.engine("handlebars", handlebars.engine());
app.set("views", "src/views");
app.set("view engine", "handlebars");

/* routes */
app.use("/api/products", products);
app.use("/api/carts", carts);

app.get("/", (req, res) => {
  res.render("index");
});

const httpServer = app.listen(PORT, () => {
  console.log(`servidor funcionando en ${PORT}`);
});

/* inicializacion web socket */

const io = new Server(httpServer);
