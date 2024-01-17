import mongoose from "mongoose";
import { cartModel } from "../models/cart.model.js";

export const getCarts = async () => {
  const respuesta = {};
  try {
    respuesta.dato = await cartModel.find();
    respuesta.message = "datos obtenidos";
  } catch (error) {
    respuesta.dato = error;
    respuesta.message = "Error al obtener los carritos";
  }
  return respuesta;
};

export const addCart = async () => {
  try {
    await cartModel.create({ products: [] });
    respuesta.message = `carrito agregado`;
  } catch (error) {
    respuesta.dato = error;
    respuesta.message = `carrito no agregado`;
  }
  return respuesta;
};

export const deleteProductOnCart = async (cartId) => {
  const respuesta = {};
  try {
    let deleted = await cartModel.findOne({ _id: cartId });
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
    respuesta.dato = await cartModel.findOne({ _id: cartId });
  } catch (error) {
    respuesta.dato = error;
    respuesta.message = "carrito no encontrado";
  }
  return respuesta;
};
export const getProductsCartById = async (cartId) => {
  const respuesta = {};
  try {
    respuesta.dato = await cartModel
      .findOne({ _id: cartId })
      .populate("products.product");
    respuesta.message =
      "Productos del carro de compras obtenidos correctamente";
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
    { _id: cartId },
    { products: cart.dato.products }
  );
  if (!modificado.modifiedCount) {
    cart.message = "no modificado";
  }
  return cart;
};

export const setCart = async (cartID, cart) => {
  try {
    let rta = await cartModel.updateOne({ _id: cartID }, cart);
    if (rta.modifiedCount > 0) {
      return {
        sucess: rta.modifiedCount > 0,
        message: "modificado",
      };
    }
    return {
      sucess: false,
      message: "no modificado",
    };
  } catch (error) {
    return {
      ...error,
      sucess: false,
      message: "no modificado",
    };
  }
};
