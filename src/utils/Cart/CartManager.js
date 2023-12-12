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
/* 
  async getProductosOfCartbyId(id){
    let cart= await this.getCartbyId(+id);
    console.log(cart.proucts)
    return cart;
  } */

  async addProductOnCart(cartId,productId){
    const carts= await this.getCarts();
    const cartsActualizado=carts.map(puntero=>{
      if(puntero.id==cartId){
        const existe=puntero.products.find(e=>e.id==productId)
        if (existe){
          existe.quantity++
        }else{
          puntero.products=[...puntero.products,{id:+productId, quantity:1}];
        }
      }
      return puntero
    })
    await fs.promises.writeFile(this.path,JSON.stringify(cartsActualizado),'utf-8');
  }

};