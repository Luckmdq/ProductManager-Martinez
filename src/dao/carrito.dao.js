import carritoModel from "./models/cart.model.js";

export default class carritos {
  obtenerCarritos = async () => {
    try {
      const respuesta = await carritoModel.find();
      return respuesta;
    } catch (error) {
      return error;
    }
  };

  obtenerCarrito = async (id) => {
    try {
      const encontrado = await carritoModel.findById(id);
      if (!encontrado) {
        return "No se ha encontrado el carrito.";
      }
      return encontrado;
    } catch (error) {
      console.log(error);
    }
  };

  agregarCarrito = async () => {
    const carritoNuevo = { products: [] };
    const respuesta = await carritoModel.create(carritoNuevo);
    return { ...respuesta, sucess: true };
  };

  borrarCarrito = async (id) => {
		let respuesta= await carritoModel.deleteOne( { _id : id} );
		return (respuesta.deletedCount>0)
	};
}
