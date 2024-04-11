/*
**Cambiar todo error

Realizar un sistema de recuperación de contraseña, la cual envíe por medio de un correo un botón que redireccione a una página para restablecer la contraseña (no recuperarla).
  link del correo debe expirar después de 1 hora de enviado.
  Si se trata de restablecer la contraseña con la misma contraseña del usuario, debe impedirlo e indicarle que no se puede colocar la misma contraseña
  Si el link expiró, debe redirigir a una vista que le permita generar nuevamente el correo de restablecimiento, el cual contará con una nueva duración de 1 hora.

Establecer un nuevo rol para el schema del usuario llamado “premium” el cual estará habilitado también para crear productos
Modificar el schema de producto para contar con un campo “owner”, el cual haga referencia a la persona que creó el producto
  Si un producto se crea sin owner, se debe colocar por defecto “admin”.
  El campo owner deberá guardar sólo el correo electrónico (o _id, lo dejamos a tu conveniencia) del usuario que lo haya creado (Sólo podrá recibir usuarios premium)
Modificar los permisos de modificación y eliminación de productos para que:
Un usuario premium sólo pueda borrar los productos que le pertenecen.
El admin pueda borrar cualquier producto, aún si es de un owner.

Se debe tener documentado el módulo de productos.
Se debe tener documentado el módulo de carrito
No realizar documentación de sesiones


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
import { addLogger } from "./dto/config/logger.js";

/* inicializacion express */
const fileStore = FileStore(session);
const app = express();
const { PORT, BD_STRING, SESSION_SECRET } = obtencionConstantes("bd");

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

inicioPassport();
app.use(passport.initialize());
app.use(passport.session());

/* manejo de errores */

app.use(ErrorHandler);
app.use(addLogger);

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
