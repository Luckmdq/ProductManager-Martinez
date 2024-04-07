import dotenv from "dotenv";

export const obtencionConstantes = (conjunto) => {
  dotenv.config({ path: "src/.env" });
  switch (conjunto) {
    case "bd":
      return {
        PORT: process.env.PORT || 3000,
        BD_STRING: process.env.BD_STRING,
        SESSION_SECRET: process.env.PRIVATE_KEY || "secret",
      };
      break;
    case "jwt":
      return {
        SECRET: process.env.PRIVATE_KEY,
      };
      break;
  }
};
