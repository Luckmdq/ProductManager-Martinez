import { productModel } from "../models/product.model.js";

/* 
{
  status:success/error
  payload: Resultado de los productos solicitados
  totalPages: Total de páginas
  prevPage: Página anterior
  nextPage: Página siguiente
  page: Página actual
  hasPrevPage: Indicador para saber si la página previa existe
  hasNextPage: Indicador para saber si la página siguiente existe.
  prevLink: Link directo a la página previa (null si hasPrevPage=false)
  nextLink: Link directo a la página siguiente (null si hasNextPage=false)
}
*/

/* 
export const getProducts = async (limit, page, sort, query) => {
  let respuesta = {};
  try {
      respuesta.dato = await productModel.find();
      respuesta.msg = "datos obtenidos";
    } catch (error) {
      respuesta.dato = error;
      respuesta.msg = "no se encontrar datos";
    }
  return respuesta;
}; */

/* no puedo filtrar con el query me tira error no se si es conceptual, pongo title en el query y me da un error */
export const getProducts = async (limit, page, sort, query) => {
  try {
    const [code, value] = query.split(":");
    const parseProducts = await productModel.paginate(
      { [code]: value },
      {
        limit,
        page,
        sort: sort ? { price: sort } : {},
      }
    );
    parseProducts.payload = parseProducts.docs;
    delete parseProducts.docs;
    return { message: "ok", ...parseProducts };
  } catch (error) {
    return { message: "error", dato: error };
  }
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
export const getByCode = async (codigo) => {
  const respuesta = {};
  try {
    respuesta.dato = await productModel.findOne({ code: codigo });
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
  return !!modificado.modifiedCount;
};
