import listRouter from "./list.js";
import watchlistRouter from "./watchlist.js";
import authRouter from "./auth.js";
import userRouter from "./user.js";

export default (app, passport) => {
    authRouter(app, passport);
    userRouter(app);
    listRouter(app);
    watchlistRouter(app);
}