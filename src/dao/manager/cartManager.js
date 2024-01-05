import { cartModel } from "../models/cart.model.js";

export const getCarts = async () => {
  const respuesta = {};
  try {
    const carts = await cartModel.find();
    respuesta.dato = carts;
    respuesta.message = "datos obtenidos";
  } catch (error) {
    respuesta.dato = error;
    respuesta.message = "Error al obtener los carritos";
  }
  return respuesta;
};

export const addCart = async (products) => {
  const respuesta = {};
  try {
    await cartModel.create({ products });

    respuesta.message = `carrito agregado`;
  } catch (error) {
    respuesta.dato = error;
    respuesta.message = `carrito no agregado`;
  }
  return respuesta;
};

export const deleteCart = async (cartId) => {
  const respuesta = {};
  try {
    let deleted = await cartModel.deleteOne({ _id: cartId });
    if (!deleted.deletedCount) {
      respuesta.message = `carrito no encontrado`;
      return message;
    }
    respuesta.message = `carrito borrado`;
  } catch (error) {
    respuesta.dato = error;
    respuesta.message = `carrito no borrado`;
  }
  return respuesta;
};

export const getById = async (cartId) => {
  const respuesta = {};
  try {
    respuesta.dato = await cartModel.findById(cartId);
  } catch (error) {
    respuesta.dato = error;
    respuesta.message = "carrito no encontrado";
  }
  return respuesta;
};

export const addProductOnCart = async (cartId, ProductId) => {
  let cart = await getById(cartId);
  cart.dato.products.map((producto) => {
    if (producto.productId == ProductId) {
      producto.cantidad += 1;
      cart.message = "modificado";
    }
  });
  let modificado = await cartModel.updateOne(
    { _id: cartId},
    { products: cart.dato.products}
  );
  if(!modificado.modifiedCount){
    cart.message="no modificado"
  }
  return(cart)
};
