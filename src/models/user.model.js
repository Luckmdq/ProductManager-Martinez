import mongoose from "mongoose";

const userCollection = "users";
const userSchema = mongoose.Schema({
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
    default: "user",
  },
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;
