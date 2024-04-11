import jwt from "jsonwebtoken";
import { obtencionConstantes } from "../../config.js";

const { SECRET } = obtencionConstantes("jwt");

export const generacionToken = async (usuario) => {
  const serializedUser = {
    id: usuario._id,
    name: `${usuario.first_name} ${usuario.last_name}`,
    role: usuario.role,
    email: usuario.email,
  };
  return await jwt.sign(serializedUser, SECRET, { expiresIn: "24h" });
};

export const authToken = (req, res, next) => {
  //extraigo las cookies con autorizaciones para filtrarlas
  const cookies = req.headers.cookie;
  let cookieAuth = cookies
    .split(" ")
    .find((cookie) => cookie.split("=")[0] === "cookieAuth");
  if (!cookieAuth) {
    req.logger.info("No hay usuario logueado");
    return next();
  }
  const token = cookieAuth.split("=")[1];
  jwt.verify(token, SECRET, (err, credenciales) => {
    if (err) {
      return res.render("login", {
        message: "token alterado ingrese nuevamente",
      });
    }
    req.user = credenciales;
    next();
  });
};
