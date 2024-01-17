import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const productCollection = "products";
const productSchema = new mongoose.Schema( {
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  status:{
    type : Boolean ,
    required:true
  },
  category: {
    type: String,
    enum:["Paño fijo","Puerta","Corrediza","Abrir"],
    required:true
  },
  thunbnail:{
    type:String,
    default:"Sin Imagen",
  }
  
});

productSchema.plugin(mongoosePaginate)

export const productModel = mongoose.model(productCollection, productSchema);
