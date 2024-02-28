import dotenv from "dotenv";

export const obtencionConstantes = () => {
  dotenv.config({ path: "src/.env" });
  return ({
    PORT: process.env.PORT||3000 ,
    BD_STRING: process.env.BD_STRING,
    SESSION_SECRET:process.env.SESSION_SECRET || 'secret',
  });
};
