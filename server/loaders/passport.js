import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import AuthService from "../services/AuthService.js";
const AuthServiceInstance = new AuthService();
import UserModel from "../models/user.js";
const UserModelInstance = new UserModel();

export default async (app) => {
  //Initialize passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Set method to serialize data to store user id in cookie
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Set method to deserialize data stored in cookie and attach to req.user
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserModelInstance.findOneById(id); // Assuming you have a method to find a user by ID
      if (!user) {
        done(new Error("User not found"), null);
      } else {
        done(null, user); // Req.user will be the full user object
      }
    } catch (error) {
      done(error, null);
    }
  });

  passport.deserializeUser((id, done) => {
    UserModelInstance.findOneById(id, (err, user) => {
      done(err, user);
    });
  });

  // Configure strategy to be use for local login
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await AuthServiceInstance.login({ username, password });
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  return passport;
};
