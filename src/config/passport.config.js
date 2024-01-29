import passport from "passport";

import local from "passport-local";
import { userModel } from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import { Strategy as GithubStrategy } from "passport-github2";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          const user = await userModel.findOne({ email: username });
          if (user) {
            console.log("user already exists");
            return done(null, false);
          }
          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
          };
          const result = await userModel.create(newUser);
          return done(null, result);
        } catch (error) {
          return done("errror to obtain the user" + error);
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
          const user = await userModel.findOne({ email: username });
          if (!user) {
            console.log("user doesnt exists");
            return done(null, false);
          }
          if (!isValidPassword(user, password)) {
            return done(null, false);
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use("github", new GithubStrategy(
    {
      clientID: "Iv1.509ad65d2b6d55d1",
      callbackURL: "http://localhost:8080/api/session/githubcallback",
      clientSecret: "99068881c09124d1581fa8c5afddb850f84644e8",
    },
    async(accesToken,refreshToken,profile,done)=>{
      try {
        const user=await userModel.findOne({email:profile._json.email})
        if(!user){
          let newUser={
            first_name:profile._json.name.split(' ')[0],
            last_name:profile._json.name.split(' ')[1],
            age:18,
            email:profile._json.email,
            password:'GithubGenerated'
          }
          const result=await userModel.create(newUser);
          return done(null,result)
        }
      } catch (error) {
        return done(error)
      }
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findOne({ _id: id });
    done(null, user);
  });
};

export default initializePassport;
