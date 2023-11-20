/* 
title (nombre del producto)
description (descripción del producto)
price (precio)
thumbnail (ruta de imagen)
code (código identificador)
stock (número de piezas disponibles)
 */

class ProductManager {
  static id = 0;

  constructor() {
    this.product = [];
  }

  getProducts() {
    return this.products;
  }

  addProducts(title, description, price, thumbnail, code, stock) {
    /* al ingresar y ser undefined algun campo tendria que salir por no ser valido el campo */
    const camposValido =
      title && description && price && thumbnail && code && stock;
    const elementos = this.getProducts();
		if (!camposValido){
			return console.log(`campo invalido`)
		}
    if (elementos.some((e) => e.code == code)) {
      return "El codigo ya existe";
      /* al retornar eso ya seria suficiente si no por defecto generaria el producto para el push */
      /* el include seria para un array y some para un array de objetos por el callback? no entendi muy bien */
    }
    ProductManager.id++;
    const product = {
      id: ProductManager.id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.product.push(product);
  }

  getProductById(id) {
    const encontrado = this.getProducts().find((e) => e.id == id);
    return encontrado ? encontrado : console.log(`Not Found`);
  }
}
