import mongoose from "mongoose";
const carritoCollection = "carts";

const carritoSchema = mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          required: true,
          ref: "products",
        },
        quantity: Number,
      },
    ],
    default: [],
  },
});

const carritoModel = mongoose.model(carritoCollection, carritoSchema);
export default carritoModel
