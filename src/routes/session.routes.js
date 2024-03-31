import { Router } from "express";
import passport from "passport";
import {
  egreso,
  ingreso,
  registro,
  restauracionContraseña,
} from "../controllers/usuario.controller.js";

const sessionRoutes = Router();

sessionRoutes.post(
  "/register",
  passport.authenticate("register", { failiredRedirect: "/failregister" }),
  registro
);

sessionRoutes.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  await ingreso
);

sessionRoutes.post("/logout", egreso);

sessionRoutes.post("/restore-password", restauracionContraseña);

sessionRoutes.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  (req, res) => {
    console.log("ando por aca")
  }
);

sessionRoutes.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    console.log("ando por acaa")
    req.session.user = req.user;
    res.redirect("/");
  }
);

export default sessionRoutes;
