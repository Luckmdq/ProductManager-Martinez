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
    case "mail":
      return {
        SERVICE: process.env.MAIL_SERVICE,
        PORT: process.env.MAIL_PORT,
        USER: process.env.MAIL_USER,
        PASS: process.env.MAIL_KEY,
      };
      break;
  }
};
