import products from "./routes/product.routes.js";
import carts from "./routes/carts.routes.js";
import views from "./routes/views.routes.js";
import sessionRoutes from "./routes/session.routes.js";

import express from "express";
import Axios from "axios";
import mongoose from "mongoose";

import { Server } from "socket.io";
import handlebars from "express-handlebars";
import axios from "axios";

import MongoStore from "connect-mongo";
import session from "express-session";
import FileStore from "session-file-store";
/* la organizacion se me ocurrio sobre la marcha, nose si esta bien, osea el router enruta desde la ruta al utils que es el que almacena los archivos por asi decirlo, nose si esta bien o hay algun otro modo, mas que nada para no matar la persistencia de archivos, por ahi mas adelante se ve otro modo xD */

/* inicializacion express */
const fileStore=FileStore(session)
const app = express();
const PORT = 8080;
const bdConect = {
  user: "LucianoM",
  pass: "4149",
  bd: "ecommerce",
};

mongoose.connect(
  `mongodb+srv://${bdConect.user}:${bdConect.pass}@cluster0.tfngdf0.mongodb.net/${bdConect.bd}`
);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* session */

app.use(
  session({
    secret: "C0d3rh0us3", //clave secreta para encriptar las sesiones
    store: MongoStore.create({
      mongoUrl: `mongodb+srv://${bdConect.user}:${bdConect.pass}@cluster0.tfngdf0.mongodb.net/${bdConect.bd}`,
    }),
    resave: true,
    saveUninitialized: true,
  })
);

/* handlebars */

app.engine("handlebars", handlebars.engine());
app.set("views", "src/views");
app.set("view engine", "handlebars");

/* routes */
app.use("/api/products", products);
app.use("/api/carts", carts);
app.use('/api/session',sessionRoutes)
app.use("/", views);

const httpServer = app.listen(PORT, () => {
  console.log(`servidor funcionando en ${PORT}`);
});

/* inicializacion web socket */

const io = new Server(httpServer);

io.on("connect", (socket) => {
  socket.on("editar", async (idElemento) => {
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
      `http://localhost:8080/api/products/bycode/${dato.code}`
    );
    console.log(productActual);
    await Axios.put(
      `http://localhost:8080/api/products/${productActual._id}`,
      dato
    );
    const { data: productos } = await axios.get(
      `http://localhost:8080/api/products`
    );
    socket.emit("renderPrincipal", productos);
  });

  socket.on("productAdd", async (dato) => {
    await axios.post(`http://localhost:8080/api/products`);
    const { data: productos } = await axios.get(
      `http://localhost:8080/api/products`
    );
    socket.emit("renderPrincipal", productos);
  });
  socket.on("renderizado", async () => {
    const { data: productos } = await axios.get(
      `http://localhost:8080/api/products`
    );
    socket.emit("renderPrincipal", productos);
  });
});
