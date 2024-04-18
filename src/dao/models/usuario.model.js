import mongoose from "mongoose";

const usurioCollection = "users";
const usuarioSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
  cart: {
    type: mongoose.Schema.ObjectId,
    ref: "cart",
  },
  role: {
    type: String,
    enum: ["user", "admin", "premium"],
    required: true,
  },
});

const usuarioModel = mongoose.model(usurioCollection, usuarioSchema);

export default usuarioModel;
