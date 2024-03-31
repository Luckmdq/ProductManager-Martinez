import bcrypt from "bcrypt";

export const createHash = async (password) =>
  bcrypt.hash(password, bcrypt.genSalt(10));

//compare password with hashed password
export const isMatch = (user, password) => {
  return bcrypt.compare(password, user.password);
};
