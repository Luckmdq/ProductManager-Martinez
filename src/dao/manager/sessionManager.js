import { userModel } from "../models/user.model.js";

export const setUsers = async (first_name, last_name, age, email, password) => {
  try {
    const user = await userModel.create({
      first_name,
      last_name,
      age,
      email,
      password,
    });
    return user;
  } catch (e) {
    return e;
  }
};

export const loginUsers = async (email, password) => {
  try {
    const user = await userModel.findOne({ email:email });
    if (!user) {
      return {
        message: "usuario no encontrado",
        success:false
      };
    }
    if (user.password !== password) {
      return{
        message: "Invalid password",
        success: false,
      }
    }
    return({
        ...user._doc,
        success:true
    })
  } catch (error) {
    return(error);
  }
};
