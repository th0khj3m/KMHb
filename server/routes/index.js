import listRouter from "./list.js";
import watchlistRouter from "./watchlist.js";
import authRouter from "./auth.js";

export default (app, passport) => {
    authRouter(app, passport);
    listRouter(app);
    watchlistRouter(app);
}