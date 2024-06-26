import productos from "../../dao/productos.dao.js";
import { productoGenerado } from "../config/mock.js";

const servicio = new productos();

export const obtenerProductos = async (req, res) => {
  try {
    let { limite = 10, pagina = 1, ordenar = "", buscar = "" } = req.query;
    const resultado = await servicio.obtenerProductos(
      limite,
      pagina,
      ordenar,
      buscar
    );
    if (!resultado) return res.status(404).json({ msg: "No hay registros" });
    res.json(resultado);
  } catch (error) {
    console.log(error);
  }
};

export const agregarProducto = async (req, res) => {
  if (!req.user){
    res.redirect("/login")
    return
  }
  if(req.user.role==="user"){//solo puede agregar administrador o premium
    res.send("pida autorizacion a algun administrador")
    return
  }
  try { 
    const producto = req.body;
    const respuesta = await servicio.agregarProducto({...producto,owner:req.user.id,status:true});
    console.log(respuesta);
  } catch (error) {
    console.log(error)
  }
  /* 
  try {
    if (!respuesta.completada) {
      return res.status(400).json({ msg: "Error al insertar el producto" });
    }
    res.json({ mensaje: "producto agregado con exito" });
  } catch (error) {
    console.log(error);
  } */
};

export const obtenerPorId = async (req, res) => {
  const { PId } = req.params;
  try {
    const resultado = await servicio.obtenerPorId(PId);
    if (!resultado) {
      return res.status(400).json({ msg: "id invalido" });
    }
    console.log(resultado)
    res.render("modificacion",resultado)
  } catch (error) {
    return error;
  }
};

export const obtenerPorCodigo = async (req, res) => {
  const { codigo } = req.params;
  try {
    const resultado = await servicio.obtenerPorCodigo(codigo);
    if (Error) {
      return res.status(400).json({ mensaje: "codigo invalido" });
    }
    res.json(resultado);
  } catch (error) {
    return error;
  }
};

export const borrarProducto = async (req, res) => {
  const { PId } = req.params;
  try {
    const resultado = await servicio.borrarProducot(PId);
    return resultado
      ? res.status(200).json({ mensaje: "borrado" })
      : res.status(203).json({ mensaje: "no borrado" });
  } catch (error) {
    return error;
  }
};

export const actualizarProducto = async (req, res) => {
  let { PId } = req.params;
  let producto = req.body;
  console.log(PId)
  console.log(producto)
  /* let respuesta = await servicio.actualizarProducto(PId, producto);
  return respuesta
    ? res.status(201).json({ mensaje: "modificado" })
    : res.status(500).json({ mensaje: "hubo un error" });
   */  
};

export const productosGenerados = async (req, res) => {
  const productos = [];
  for (let i =0  ;i < 100; i++){
    productos.push(productoGenerado())
  }
  res.json({ status: "succes", payload: productos });
};
