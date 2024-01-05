import mongoose from "mongoose";
const cartCollection = "carts";
const cartProductSchema = mongoose.Schema({
  productId:{
    type:Number,
    required:true
  },
  cantidad: {
    type: Number,
    required: true,
  },
});

const cartSchema = mongoose.Schema({
  products: {
    type: [cartProductSchema],
    required: true,
  },
});

export const cartModel = mongoose.model(cartCollection, cartSchema);
