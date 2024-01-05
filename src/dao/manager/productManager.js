import { productModel } from "../models/product.model.js";

export const getProducts = async () => {
  let respuesta = {};
  try {
    respuesta.dato = await productModel.find();
    respuesta.message = "datos obtenidos";
  } catch (error) {
    respuesta.dato = error;
    respuesta.message = "no se encontrar datos";
  }
  return respuesta;
};

export const addProduct = async (producto) => {
  const respuesta = {};
  try {
    await productModel.create(producto);
    respuesta.message = "agregado";
  } catch (error) {
    respuesta.dato = error;
    respuesta.message = "no agregado";
  }
  return respuesta;
};

export const getById = async (productId) => {
  const respuesta = {};
  try {
    respuesta.dato = await productModel.findOne({ _id: productId });
    respuesta.message = "encontrado";
  } catch (error) {
    respuesta.dato = error;
    respuesta.message = "no encontrado";
  }
  return respuesta;
};

export const deleteProduct = async (productId) => {
  let respuesta = {
    succes: true,
  };
  try {
    respuesta.dato = await productModel.deleteOne({ _id: productId });
    if (!respuesta.dato.deletedCount) {
      respuesta.message = "dato no encontrado";
      respuesta.succes = false;
      return respuesta;
    }
    respuesta.message = "dato borrado";
    return respuesta;
  } catch (error) {
    respuesta.dato = error;
    respuesta.succes = false;
    respuesta.message = "dato no borrado";
  }
  return respuesta;
};

export const modProduct = async (productId, product) => {
  let modificado = await productModel.updateOne(
    { _id: productId },
    { ...product }
  );
  return(!!modificado.modifiedCount)
};
