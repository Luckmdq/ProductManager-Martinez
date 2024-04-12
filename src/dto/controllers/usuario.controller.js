/* falta configurar mail de envio */

import usuario from "../../dao/usuario.dao.js";
import { generacionToken } from "../config/jwt.config.js";
import { recuperacion } from "../config/mail.js";

const servicio = new usuario();

export const registro = async (req, res) => {
  if (!req.user) {
    console.log("error al ingresar");
  }
  const token = await generacionToken(req.user);
  res
    .cookie("cookieAuth", token, { maxAge: 36000 })
    .redirect({ redirect: "http://localhost:8080/" });
};

export const ingreso = async (req, res) => {
  if (!req.user) {
    return res.status(400).send({ message: "credenciales invalidades" });
  }
  const token = await generacionToken(req.user);
  /* seteo de tiempo de expiracion */
  res.cookie("cookieAuth", token, { expire: new Date() + 9999 }).redirect("/");
};

export const egreso = async (req, res) => {
  try {
    console.log(req.cookies);
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "logount failed" });
      }
    });
    res.send({ redirect: "http://localhost:8080/login" });
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const restauracionContraseña = async (req, res) => {
  const { email } = req.body;
  let user =await servicio.existente( email );
  if(!user){
    req.logger.info("no existe usuario")
  }
  // se genera un token de ingreso(hasheando el id)
  const token=await generacionToken(user)
  //una vez obtenido se manda junto al mail para acceder a una pagina de restauracion:
  let respuesta= await recuperacion(token)
  console.log(respuesta)
};

export const mailing = async (req, res) => {
  let respuesta = await recuperacion();
  req.logger.fatal(respuesta);
};
