import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import AuthService from "../services/AuthService.js";
const AuthServiceInstance = new AuthService();

export default async (app) => {
  //Initialize passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Set method to serialize data to store in cookie
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Set method to deserialize data stored in cookie and attach to req.user
  passport.deserializeUser((id, done) => {
    done(null, { id });
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
