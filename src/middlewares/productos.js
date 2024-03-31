import Productos from "../dao/productos.dao.js"

const servicios=new Productos()

export const existeProducto=async(req,res,next)=>{
    let encontrado=await servicios.obtenerPorId(req.body.PId)
    console.log(encontrado)
    next()
}