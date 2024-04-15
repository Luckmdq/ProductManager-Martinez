import jwt from "jsonwebtoken";
import { obtencionConstantes } from "../../config.js";

const { SECRET } = obtencionConstantes("jwt");

export const firmaToken = async (payload) => {
  return await jwt.sign(payload, SECRET, { expiresIn: "1h" });
};

export const verificacionToken = async (token) => {
  let verificacion = await jwt.verify(token, SECRET, async (err, resultado) => {
    if (err) {
      return false;
    }
    return resultado;
  });
  return verificacion;
};

export const generacionToken = async (usuario) => {
  const serializedUser = {
    id: usuario._id,
    name: `${usuario.first_name} ${usuario.last_name}`,
    role: usuario.role,
    email: usuario.email,
  };
  return await firmaToken(serializedUser);
};

export const authToken = async (req, res, next) => {
  //extraigo las cookies con autorizaciones para filtrarlas
  try {
    const cookies = req.headers.cookie;
    if (!cookies){
      res.send({succes:false,mensaje:"usuario no ingresado"})
      next()
    }
    let cookieAuth = cookies
      .split(" ")
      .find((cookie) => cookie.split("=")[0] === "cookieAuth");
    if (!cookieAuth) {
      req.logger.info("No hay usuario logueado");
      return next();
    }
    const token = cookieAuth.split("=")[1];
    let valido = await verificacionToken(token);
    if (!valido) {
      return res.render(valido.mensaje);
    }
    req.user = valido;
    next();
  } catch (error) {
    console.log(error);
  }
  /* 
  jwt.verify(token, SECRET, (err, credenciales) => {
    if (err) {
      return res.render("login", {
        message: "token alterado ingrese nuevamente",
      });
    }
    req.user = credenciales;
    next();
  }); */
};
