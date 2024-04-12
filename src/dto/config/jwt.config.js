import jwt from "jsonwebtoken";
import { obtencionConstantes } from "../../config.js";

const { SECRET } = obtencionConstantes("jwt");

const firmaToken = async (payload) => {
  return await jwt.sign(payload, SECRET, { expiresIn: "1h" });
};

const verificacionToken = async (token) => {
  jwt.verify(token, SECRET,(err,resultado)=>{
    if(err){
      req.logger.error("fallo en la validacion:"+err)
      return false
    }
    return resultado
  });
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
  const cookies = req.headers.cookie;
  let cookieAuth = cookies
    .split(" ")
    .find((cookie) => cookie.split("=")[0] === "cookieAuth");
  if (!cookieAuth) {
    req.logger.info("No hay usuario logueado");
    return next();
  }
  const token = cookieAuth.split("=")[1];
  let valido=await verificacionToken(token)
  if (!valido){
    return res.render({mensaje:"token alterado"})
  }
  req.user = valido;
  next();/* 
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
