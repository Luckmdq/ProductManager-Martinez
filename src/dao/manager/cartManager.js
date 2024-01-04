import cartModel from "../models/cart.model";

export class CartManager {
  async getCarts() {
    const respuesta = {};
    try {
      const carts = await cartModel.find();
      respuesta.dato = carts;
      respuesta.message = "datos obtenidos";
    } catch (error) {
      respuesta.dato = error;
      respuesta.message = "Error al obtener los carritos";
    }
  }
}
