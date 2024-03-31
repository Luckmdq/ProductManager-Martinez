import { createHash, isMatch } from "../config/bcrypt.js";
import usuarioModel from "./models/usuario.model.js";
/* creacion de usuario */

export default class usuario {
  existente = async (email) => {
    return await usuarioModel.findOne({ email });
  };
  buscaId = async (_id) => {
    return await usuarioModel.findById(_id);
  };
  crear = async (
    first_name,
    last_name,
    email,
    age,
    password,
    role = "user"
  ) => {
    /* cartId*/
    try {
      const userExist = await this.existente(email);
      if (!userExist) {
        return userExist;
      }
      const newUser = await new usuarioModel({
        first_name: first_name,
        last_name: last_name,
        email: email,
        age: age,
        password: createHash(password),
        role: role,
      });
      return await usuarioModel.create(newUser);
    } catch (error) {
      console.log(error);
    }
  };

  ingreso = async (email, password) => {
    try {
      const user = await this.existente(email);
      return !user & !(await isMatch(user, password)) ? false : user;
    } catch (error) {
      console.log(error);
    }
  };
}
