import mongoose from "mongoose";

const messageCollection = "messages";
const messageSchema = {
  user: {
    type: String,
    required: true,
    unique: true,
  },
  message: {
    type: String,
    required: true,
  },
};

export default messageModel = mongoose.model(messageCollection, messageSchema);
