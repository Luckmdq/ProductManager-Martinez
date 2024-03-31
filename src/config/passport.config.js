import passport from "passport";
import local from "passport-local";
import { isMatch } from "./bcrypt.js";
import { Strategy as GithubStrategy } from "passport-github2";
import usuario from "../dao/usuario.dao.js";
import { ingreso } from "../controllers/usuario.controller.js";

const usuarioInstancia = new usuario();
const LocalStrategy = local.Strategy;

const inicioPassport = () => {
  /* registro local */
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email", session: false },
      async (req, password, done) => {
        try {
          const { first_name, last_name, email, age } = req.body;
          const result = await usuarioInstancia.crear(
            first_name,
            last_name,
            email,
            age,
            password,
            "usuario"
          );
          if (!result) {
            console.log("usuario existente");
            return done(null, false); //si no se crea el usuario retorna falso
          }
          return done(null, result);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  /* login local */
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email", session: false },
      async (email, password, done) => {
        try {
          const user = await usuarioInstancia.ingreso(email, password);
          if (!user) {
            return done(null, false, "credenciales invalidas");
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  /* login github */
  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: "Iv1.509ad65d2b6d55d1",
        callbackURL: "http://localhost:8080/api/session/githubcallback",
        clientSecret: "9768c0f652e1a2bf0d60846c7f412521ed2bde8f",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile._json.email);
          const result = await usuarioInstancia.crear(
            profile._json.name.split("")[0],
            profile._json.name.split("")[1],
            profile._json.email,
            15,
            "GitHubGenerated",
            "usuario"
          );
          if (!result) {
            console.log("no obtiene el email mio por configuracion de cuenta");
            return done(null, false); //si no se crea el usuario retorna falso
          }
          return done(null, result);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  /* 
        try {

          console.log(profile)
          const user = await usuarioInstancia.existente(profile._json.email );
          if (!user) {
            const newUser = new userModel({
              first_name: profile.json.name.split("")[0],
              last_name: profile.json.name.split("")[1],
              age: 15,
              email: profile._json.email,
              password: "GitHubGenerated",
            });
            const result = await userModel.save();
            return done(null, result);
          }
        } catch (error) {
          return done(error);
        } */
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser(async (id, done) => {
    const userFind = await usuarioInstancia.buscaId(id);
    done(null, userFind._id);
  });
};

export default inicioPassport;
