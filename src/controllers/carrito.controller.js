import carritos from "../dao/carrito.dao.js";

const servicio = new carritos();

export const obtenerCarritos = async (req, res) => {
  try {
    const respuesta = await servicio.obtenerCarritos();
    return respuesta
      ? res.status(200).json(respuesta)
      : res.status(404).send({ mensaje: "No hay carritos" });
  } catch (error) {
    console.log(error);
  }
};

export const obtenerCarrito = async (req, res) => {
  try {
    const { CId } = req.params;
    const respuesta = await servicio.obtenerCarrito(CId);
    if (!respuesta) {
      return res.status(2003).json({ mensaje: "no encontrado el carrito" });
    }
    return res.status(200).json(respuesta);
  } catch (error) {
    console.log(error);
  }
};

export const crear = async (req, res) => {
  try {
    const respuesta = await servicio.agregarCarrito();
    if (!respuesta.sucess) {
      return res.status(500).json({ mensaje: "Error al crear el carrito" });
    }
    return res.json({
      mensaje: "Se ha creado correctamente",
      ...respuesta._doc,
    });
  } catch (error) {
    console.log(error);
  }
};

export const agregarProducto = async (req, res) => {
  
};

export const borrar = async (req, res) => {
  const { CId } = req.params;
  try {
    const respuesta = await servicio.borrarCarrito(CId);
    if (!respuesta) {
      return res
        .status(401)
        .json({ mensaje: "No se pudo eliminar el carrito" });
    }
    return res
      .status(200)
      .json({ mensaje: "El carrito fue eliminado con exito" });
  } catch (error) {
    console.log(error);
  }
};

export const actualizar = async (req, res) => {
  let  { CId } = req.params
};
