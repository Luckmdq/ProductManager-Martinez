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
  cart:{
    id : mongoose.Schema.Types.ObjectId, 
    ref:'carts',
  },
  role:{
    type:String,
    default:'user'
  }
});

export const userModel = mongoose.model(userCollection, userSchema);
