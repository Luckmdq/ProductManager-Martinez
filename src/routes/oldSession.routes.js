import { Router } from "express";
//import { userModel } from "../models/user.model.js";
import passport from "passport";
import { createHash } from "../config/bcrypt.js";

const sessionRoutes = Router();

sessionRoutes.post(
  "/register",
  passport.authenticate("register", { failiredRedirect: "/failregister" }),
  async (req, res) => {
    res.send({ status: "succes", message: "user registered" });
  }
);
/* 
sessionRoutes.post("/register",passport.authenticate('register') ,async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    return res.status(409).json({ message: "Usuario ya existente" });
  }
  const newUser = {
    first_name,
    last_name,
    email,
    age,
    password: createHash(password),
  };
  await userModel.create(newUser);
  res.status(201).send({ message: "created" });
}); */
/* 
sessionRoutes.post(
  "/login", 
  async (req, res) => {
  const { email, password } = req.body;
  let rta = await loginUsers(email, password);
  rta.succes ? res.redirect("/") : res.redirect("/login");
}); */

sessionRoutes.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  async (req, res) => {
    if (!req.user) {
      return res.status(400).send({ message: "credenciales invalidades" });
    }
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
    };
    res.redirect("/");
  }
);
/* 
sessionRoutes.post("/logout", async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (!err) {
        return res.status(500).json({ message: `Logout failed` });
      }
    });
    res.send({ redirect: "http://localhost:8080/login" });
  } catch (error) {
    res.send(eror);
  }
}); */

sessionRoutes.post("/logout", async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "logount failed" });
      }
    });
    res.send({ redirect: "http://localhost:8080/login" });
  } catch (error) {
    res.status(400).send({ error });
  }
});

sessionRoutes.post("/restore-password", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "unauthorized" });
    }
    user.password = createHash(password);
    await user.save();
    res.send({ message: "password updated" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
});

sessionRoutes.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  (req, res) => {}
);

sessionRoutes.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

export default sessionRoutes;
