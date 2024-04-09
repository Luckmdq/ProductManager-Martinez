/* Generar un módulo de Mocking para el servidor, con el fin de que, al inicializarse pueda generar y entregar 100 productos con el mismo formato que entregaría una petición de Mongo. Ésto solo debe ocurrir en un endpoint determinado (‘/mockingproducts’)

Además, generar un customizador de errores y crear un diccionario para tus errores más comunes al crear un producto, agregarlo al carrito, etc.

definir un sistema de niveles que tenga la siguiente prioridad (de menor a mayor):
debug, http, info, warning, error, fatal
 
implementar un logger para desarrollo y un logger para producción, el logger de desarrollo deberá loggear a partir del nivel debug, sólo en consola

Sin embargo, el logger del entorno productivo debería loggear sólo a partir de nivel info.
Además, el logger deberá enviar en un transporte de archivos a partir del nivel de error en un nombre “errors.log”
Agregar logs de valor alto en los puntos importantes de tu servidor (errores, advertencias, etc) y modificar los console.log() habituales que tenemos para que muestren todo a partir de winston.
Crear un endpoint /loggerTest que permita probar todos los logs


 */

import viewRoutes from "./routes/views.routes.js";
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
import passport from "passport";
import inicioPassport from "./dto/config/passport.config.js";
import { obtencionConstantes } from "./config.js";


import carritoRutas from "./routes/carrito.routes.js";
import productosRutas from "./routes/productos.routes.js";
import { ErrorHandler } from "./dto/config/errors/error.js";


/* inicializacion express */
const fileStore = FileStore(session);
const app = express();
const {PORT,BD_STRING,SESSION_SECRET} = obtencionConstantes("bd");


const hbs = handlebars.create({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
  },
});

mongoose.connect(BD_STRING);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* session */

// permite que los datos de sesión estén disponibles para cualquier ruta en la aplicación
app.use(
  session({
    secret: SESSION_SECRET,
    store: MongoStore.create({ mongoUrl: BD_STRING }),
    resave: true,
    saveUninitialized: true,
  })
);

inicioPassport()
app.use(passport.initialize());
app.use(passport.session());

/* handlebars */

app.engine("handlebars", hbs.engine);
app.set("views", "src/views");
app.set("view engine", "handlebars");

/* routes */
app.use("/api/productos", productosRutas);
app.use("/api/carritos", carritoRutas);
app.use("/api/session", sessionRoutes);
app.use("/", viewRoutes);

const httpServer = app.listen(PORT, () => {
  console.log(`servidor funcionando en ${PORT}`);
});

/* manejo de errores */

app.use(ErrorHandler)

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
