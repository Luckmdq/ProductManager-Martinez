import productoModel from "../models/product.model.js";
/* se instancia el servicio */

/* 
    const [code, value] = query.split(":");
    const parseProducts = await productModel
      .paginate(
        { [code]: value },
        {
          limit,
          page,
          sort: sort ? { price: sort } : {},
          lean:true
        }
      );
    parseProducts.payload = parseProducts.docs;
    delete parseProducts.docs;
    return { message: "ok", ...parseProducts };
  } catch (error) {
    return { message: "error", dato: error };
  } */

export default class Productos {
  obtenerProductos = async (limite, pagina, ordenar, buscar) => {
    try {
      let [code, value] = buscar.split(":");
      const resultado = await productoModel.paginate(
        { [code]: value },
        {
          limite,
          pagina,
          sort: ordenar ? { precio: ordenar } : {},
          lean: true,
        }
      );
      console.log(resultado);
      resultado.payload = resultado.docs;
      delete resultado.docs;
      return { message: "ok", ...resultado };
    } catch (error) {
      console.log(error);
    }
  };
  agregarProducto = async (producto) => {
    try {
      await productoModel.create(producto);
      return { completada: true };
    } catch (error) {
      return { completada: true, mensaje: "Ocurrio un error en el servidor" };
    }
  };

  obtenerPorId = async (id) => {
    try {
      const respuesta = await productoModel.findById(id).lean();
      return respuesta;
    } catch (error) {
      return error;
    }
  };

  obtenerPorCodigo = async (codigo) => {
    try {
      const respuesta = await productoModel.find({ code: codigo });
      if (!respuesta || !respuesta[0])
        throw new Error("No se encontró el producto");
    } catch (error) {
      return error;
    }
  };

  obtenerPorCodigo = async (codigo) => {
    try {
      const respuesta = await productoModel.find({ code: codigo });
      if (!respuesta || !respuesta[0])
        throw new Error("No se encontró el producto");
    } catch (error) {
      return error;
    }
  };

  borrarProducot = async (id) => {
    try {
      let respuesta = await productoModel.deleteOne({ _id: id });
      if (respuesta.deletedCount > 0) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  };

  actualizarProducto = async (id, producto) => {
    try {
      let data = await productoModel.findById(id);
      if (!data) throw new Error("El producto no existe");
      let  resultado = await productoModel.updateOne(
        { _id: id },
        { ...producto }
      );
      return !!resultado.modifiedCount;
    } catch (error) {}
  };
}
