import passport from "passport";
import local from "passport-local";
import { userModel } from "../dao/models/user.model.js";
import { createHash, isMatch } from "./bcrypt.js";
import { Strategy as GithubStrategy } from "passport-github2";

const LocalStrategy = local.Strategy();

const inicioPassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age, role } = req.body;
        try {
          const user = await userModel.findOne({ email });
          if (user) {
            return done(null, false);
          }
          const newUser = new userModel({
            first_name,
            last_name,
            email,
            age,
            password: await createHash(password),
            role,
          });
          const result = await newUser.save();
          return done(null, result);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userModel({ email: username });
          if (!user) {
            return done(null, false);
          }
          if (!isMatch(user, password)) {
            return done(null, false);
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  passport.use(
    "login",
    new GithubStrategy(
      {
        clientID: "Iv1.509ad65d2b6d55d1",
        callbackURL: "http://localhost:8080/api/session/githubcallback",
        clientSecret: "9768c0f652e1a2bf0d60846c7f412521ed2bde8f",
      },
      async (accesToken, refresToken, profile, done) => {
        try {
          const user = await userModel.findOne({ email: profile._json.email });
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
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (user, done) => {
    const user = await userModel.findOne({ _id: id });
    done(null, user);
  });
};

export default inicioPassport;
