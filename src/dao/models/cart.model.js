import mongoose from "mongoose";
const cartCollection = "carts";
const cartProductSchema = mongoose.Schema({
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

export default cartModel = mongoose.model(cartCollection, cartSchema);
