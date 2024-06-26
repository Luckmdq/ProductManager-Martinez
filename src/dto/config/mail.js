import nodemailer from "nodemailer";
import { obtencionConstantes } from "../../config.js";
const MAIL = obtencionConstantes("mail");

const transporte = nodemailer.createTransport({
  service: MAIL.SERVICE,
  port: MAIL.PORT,
  auth: {
    user: MAIL.USER,
    pass: MAIL.PASS,
  },
});
export const recuperacion = (token) => {
  try {
    const result = transporte.sendMail({
      from: `La pagina de prueba <${MAIL.USER}>`,
      to: MAIL.USER,
      subjet: "Mail de prueba para recuperacion de contraseña",
      html: `
            <div>
              <h1>buenas quien seas, necesito que te metas aca sin perder el tiempo y recuperes tu contraseña</h1>
              <a>link: http://localhost:8080/restore-password/${token}</>
            </div>
          `,
    });
    return result;
  } catch (error) {
    return error;
  }
};
