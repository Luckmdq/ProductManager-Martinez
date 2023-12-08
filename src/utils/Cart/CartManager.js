import * as fs from "node:fs";

export class CartManager {
  static id = 0;

  constructor(path) {
    this.path = path;
  }

  async addCart(cart){
    CartManager.id++;
    const cartInit={
        id:CartManager.id,
        cart:cart,
    }
    const elementos=await this.getCarts();
    elementos.push(cartInit);
    await fs.promises.writeFile(this.path,JSON.stringify(elementos),"utf-8")
  }

  async getCarts(){
    try{
        const datos=await fs.promises.readFile(this.path,"utf-8");
        let carts=JSON.parse(datos);
        return carts;
    }catch (error){
        return [];
    }
  }

  async getCartbyId(id){
    let carts= await this.getCarts()
    let encontrado= carts.find(e=>e.id===id);
    return encontrado?encontrado:undefined;
  }

  async getProductosOfCartbyId(id){
    let cart= await this.getCartbyId(id);
    return cart.productos;
  }

  async addProductOnCart(productId,cartId){
    const productos= await this.getProductosOfCartbyId(cartId)
    console.log(productos)
    let encontrado=productos.find(e=>{e.id==productId});
    console.log(typeof(encontrado));
    
    console.log(`${(productId)}....${(cartId)}`)
  }

};