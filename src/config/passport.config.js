import passport from "passport";
import local from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import usuario from "../dao/usuario.dao.js";

const usuarioInstancia = new usuario();
const LocalStrategy = local.Strategy;

const inicioPassport = () => {
  /* registro local */
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email", session: false },
      async (req,email, password, done) => {
        try {
          const { first_name, last_name, email, age, role = "user" } = req.body;
          let result = await usuarioInstancia.existente(email);
          console.log()
          if (!!result) {
            done(null, false ,{message:"usuario Existente"});
            return;
          }
          result = await usuarioInstancia.crear(
            first_name,
            last_name,
            email,
            age,
            password,
            role
          );
          done(null, result);
          return;
        } catch (error) {
          done(error)
          return;
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
            profile._json.name.split(" ")[0],
            profile._json.name.split(" ")[1],
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
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser(async (id, done) => {
    const userFind = await usuarioInstancia.buscaId(id);
    done(null, userFind._id);
  });
};

export default inicioPassport;
