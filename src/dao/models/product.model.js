import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productoCollection = "products";

const productoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
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
  status: {
    type: Boolean,
  },
  category: {
    type: String,
    enum: ["Paño fijo", "Puerta", "Corrediza", "Abrir"],
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "users",
  },
  thunbnail: {
    type: String,
    default: "Sin Imagen",
  },
});

productoSchema.plugin(mongoosePaginate);

const productoModel = mongoose.model(productoCollection, productoSchema);

export default productoModel;
