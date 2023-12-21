import express from "express";
import products from "./routes/product.routes.js";
import carts from "./routes/carts.routes.js";
import Axios from "axios";

import { Server } from "socket.io";
import handlebars from "express-handlebars";
import views from "./routes/views.routes.js";
import axios from "axios";

/* la organizacion se me ocurrio sobre la marcha, nose si esta bien, osea el router enruta desde la ruta al utils que es el que almacena los archivos por asi decirlo, nose si esta bien o hay algun otro modo, mas que nada para no matar la persistencia de archivos, por ahi mas adelante se ve otro modo xD */

/* inicializacion express */
const app = express();
const PORT = 8080;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* handlebars */

app.engine("handlebars", handlebars.engine());
app.set("views", "src/views");
app.set("view engine", "handlebars");

/* routes */
app.use("/api/products", products);
app.use("/api/carts", carts);
app.use("/", views);
app.use("/realtimeproducts", views);

const httpServer = app.listen(PORT, () => {
  console.log(`servidor funcionando en ${PORT}`);
});

/* inicializacion web socket */

const io = new Server(httpServer);

io.on("connect", (socket) => {

  socket.on("editar", async (idElemento) => {
    idElemento = parseInt(idElemento);
    const { data: producto } = await Axios.get(
      `http://localhost:8080/api/products/${idElemento}`
    );
    /* envia el producto a editar al cliente que lo solicita*/
    socket.emit("productoSolicitado", producto);
  });

  socket.on("eliminar", async (idElemento) => {
    idElemento = parseInt(idElemento);
    await axios.delete(`http://localhost:8080/api/products/${idElemento}`);
    /* notificamos todos los demas usuarios de la eliminacion del elemento */
    const { data: productos } = await axios.get(
      `http://localhost:8080/api/products`
    );
    socket.emit("renderPrincipal", productos);
  });

  socket.on("productModificar", async (dato) => {
    const { data: productActual } = await Axios.get(
      `http://localhost:8080/api/products/idByCode/${dato.code}`
    );
    /* productActual.id del producto actual a modificar */
    await Axios.put(
      `http://localhost:8080/api/products/${productActual.id}`,
      dato
    );
    /* renderizar productos actualizados */
    const { data: productos } = await axios.get(
      `http://localhost:8080/api/products`
    );
    socket.emit("renderPrincipal", productos);
  });

  socket.on("productAdd", async (dato) => {

  });
  socket.on("renderizado", async () => {
    const { data: productos } = await axios.get(
      `http://localhost:8080/api/products`
    );
    socket.emit("renderPrincipal", productos);
  });
});
