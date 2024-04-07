import usuario from "../../dao/usuario.dao.js";
import { generacionToken } from "../config/jwt.config.js";

const servicio = new usuario();

export const registro = async (req, res) => {
  if(!req.user){
    console.log("error al ingresar")
  }
  const token = await generacionToken(req.user);
  res.cookie("cookieAuth", token, { maxAge: 36000 }).redirect({redirect:"http://localhost:8080/"});
};

export const ingreso = async (req, res) => {
  if (!req.user) {
    return res.status(400).send({ message: "credenciales invalidades" });
  }
  const token = await generacionToken(req.user);
  /* seteo de tiempo de expiracion */
  res.cookie("cookieAuth", token,{expire : new Date() + 9999} ).redirect("/");
};

export const egreso = async (req, res) => {
  try {
    console.log(req.cookies)
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
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "unauthorized" });
    }
    user.password = createHash(password);
    await user.save();
    res.send({ message: "password updated" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
};
