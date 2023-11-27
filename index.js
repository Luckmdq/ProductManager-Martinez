const fs = require("fs");

class ProductManager {
  static id = 0;

  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    /* retorna un array vacio junto a un mensaje, o el array con un json */
    try {
      const datos = await fs.promises.readFile(this.path, "utf-8");
      const productos = JSON.parse(datos);
      return productos;
    } catch (error) {
      console.log("No se encontraron datos");
      return [];
    }
  }

  async addProducts(product) {
    /* al ingresar y ser undefined algun campo tendria que salir por no ser valido el campo */
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.code ||
      !product.stock
    ) {
      return console.log(`Datos de productos no completados`);
    }

    const elementos = await this.getProducts();

    if (
      elementos > 0 &&
      elementos.findIndex((e) => e.code === product.code) > -1
    ) {
      console.log(`El codigo ya existe`);
      return;
      /* al retornar eso ya seria suficiente si no por defecto generaria el producto para el push */
      /* el include seria para un array y some para un array de objetos por el callback? no entendi muy bien */
    }
    ProductManager.id++;
    product.id = ProductManager.id;
    /* le remplazo el dato del id al product manager */
    elementos.push(product);
    await fs.promises.writeFile(this.path, JSON.stringify(elementos), "utf-8");
  }

  async getProductById(id) {
    const productos = await this.getProducts();
    const encontrado = productos.find((e) => e.id == id);
    return encontrado ? encontrado : console.log(`Not Found`);
  }

  async updateProduct(id, product) {
    /* presupuse que el valor que no cambia seria el code, aunque creo que seria el id, pero pide que no se alla eliminado asique podria modificarse, creo que faltaria ese dato el enunciado o no? */
    let productos = await this.getProducts();
    const updatedProducst = productos.map((producto) => {
      if (producto.id === id) {
        return {
          ...producto,
          ...product,
          id: id,
        };
      }
      return producto;
    });
    await fs.promises.writeFile(this.path, JSON.stringify(updatedProducst),"utf-8")
    /* 
    const encontrado = productos.findIndex((p) => p.code === product.code);
    if (!encontrado) {
      return console.log(`no se encontro el producto`);
    }
    productos[encontrado] = {
      ...encontrado,
      ...product,
      id: product.id,
    };
 */
  }
  async deleteProduct(id) {
    let productos = await this.getProducts();
    let elementosBorrados = productos.filter((producto) => producto.id !== id);
    await fs.promises.writeFile(this.path, JSON.stringify(elementosBorrados),"utf-8");
  }
}

const test = async () => {
  const manageProduct = new ProductManager("./productos.json");
  let data = await manageProduct.getProducts();
  manageProduct.addProducts({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
  });
  data = await manageProduct.getProducts();
  /* console.log(data);
   */

  /* el retorno luego de ser un console.log en la funcion me queda undefined, habria que hacer un console log con un ternario, si retorna el elemento o undefined? */
  console.log(await manageProduct.getProductById(2));
};

test();
