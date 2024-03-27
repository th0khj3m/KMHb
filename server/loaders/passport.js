import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

export default (app) => {
    
    //Initialize passport
    app.use(passport.initialize());
    app.use(passport.session());

    // Set method to serialize data to store in cookie
}
