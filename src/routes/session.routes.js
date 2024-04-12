import { Router } from "express";
import passport from "passport";
import {
  egreso,
  ingreso,
  mailing,
  registro,
  restauracionContraseña,
} from "../dto/controllers/usuario.controller.js";

const sessionRoutes = Router();

sessionRoutes.post(
  "/register",
  passport.authenticate("register", {
    passReqToCallback: true,
    session: false,
    failureRedirect: "failregister",
    failureMessage: true,
  }),
  registro
);
/* fallo de registro */
sessionRoutes.post("/failregister", (req, res) => {
  if (!!req.session.passport.user) {
    console.log("usuario Registrado");
    res.render("failregister");
    return;
  }
  console.log("fallo en registro");
  res.render("failregister");
  return;
});

sessionRoutes.post(
  "/login",
  passport.authenticate("login", {
    session: false,
    failureRedirect: "/faillogin",
  }),
  ingreso
);

/* fallo de registro */
sessionRoutes.post("/faillogin", (req, res) => {
  if (!!req.session.passport.user) {
    console.log("usuario ya ingresado");
    res.render("faillogin");
    return;
  }
  console.log("fallo en credenciales");
  res.render("faillogin");
  return;
});

sessionRoutes.post("/logout", egreso);

sessionRoutes.post("/restore-password", restauracionContraseña);


sessionRoutes.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  (req, res) => {
    console.log("ando por aca");
  }
);

sessionRoutes.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    console.log("ando por acaa");
    req.session.user = req.user;
    res.redirect("/");
  }
);

export default sessionRoutes;
