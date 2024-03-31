//Crear un modelo Ticket el cual contará con todas las formalizaciones de la compra. Éste contará con los campos
//Id (autogenerado por mongo)
//code: String debe autogenerarse y ser único
//purchase_datetime: Deberá guardar la fecha y hora exacta en la cual se formalizó la compra (básicamente es un created_at)
//amount: Number, total de la compra.
//purchaser: String, contendrá el correo del usuario asociado al carrito.


import mongoose from "mongoose";

const ticketCollection = "tickets";
const ticketSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  purchase_dateTime: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    unique: true,
    required: true,
  },
  purchaser: {
    type: Number,
    required: true,
  },
});

const ticketModel = mongoose.model(ticketCollection, ticketSchema);

export default ticketModel;
