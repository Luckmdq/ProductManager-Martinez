import { createHash, isMatch } from "../config/bcrypt.js";
import usuarioModel from "./models/usuario.model.js";
/* creacion de usuario */

export default class usuario {
  existente = async (email) => {
    return await usuarioModel.findOne({ email });
  };
  buscaId = async (_id) => {
    console.log(`Buscando el id ${_id}`);
    let resultado = await usuarioModel.findOne({ _id: _id });
    console.log(`el resultado :${typeof(resultado)}`);
    return resultado;
  };
  crear = async (first_name, last_name, email, age, password, role) => {
    /* cartId*/
    try {
      const userExist = await this.existente(email);
      const opcionesFetch = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (!!userExist) {
        return userExist;
      }
      let carrito = await fetch(
        "http://localhost:8080/api/carritos/",
        opcionesFetch
      )
        .then((respuesta) => respuesta.json())
        .catch(console.error);
      const newUser = await new usuarioModel({
        first_name: first_name,
        last_name: last_name,
        email: email,
        age: age,
        password: await createHash(password),
        cart: carrito._id,
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
      return (!user && !(await isMatch(user, password))) ? false : user;
    } catch (error) {
      console.log(error);
    }
  };
}
