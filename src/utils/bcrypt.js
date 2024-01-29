import bcrypt from "bcrypt";

export const createHash=password=>bcrypt.hashSync(password,bcrypt.genSaltSync(10))

//compare password with hashed password
export const isValidPassword=(user,password)=>bcrypt.compareSync(password,user.password)