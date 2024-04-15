/* falta configurar mail de envio */

import usuario from "../../dao/usuario.dao.js";
import { firmaToken, generacionToken } from "../config/jwt.config.js";
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
  try {
    const { email } = req.body;
    let user = await servicio.existente(email);
    if (!user) {
      req.logger.info("no existe usuario");
    }
    // se genera un token de ingreso(hasheando el id)
    const token = await generacionToken(user);
    //una vez obtenido se manda junto al mail para acceder a una pagina de restauracion:
    let respuesta = recuperacion(token);
    console.log(respuesta);
  } catch (error) {
    console.log(error);
  }
};

export const actualizar = async (req, res) => {
  const respuesta = await servicio.actualizo(req.params.id, req.body.password);
  if (!respuesta.succes){
    res.send({message:"Error en la operación"})
    return
  }
  const token = await generacionToken(servicio.buscaId(req.params.id));
  /* seteo de tiempo de expiracion */
  res.cookie("cookieAuth", token, { expire: new Date() + 9999 }).redirect("/");
};
