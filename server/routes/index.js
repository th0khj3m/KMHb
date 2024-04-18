import authRouter from "./auth.js";
import userRouter from "./user.js";
import listRouter from "./list.js";
import watchlistRouter from "./watchlist.js";
import ratingRouter from "./rating.js";
import reviewRouter from "./review.js";

export default (app, passport) => {
    authRouter(app, passport);
    userRouter(app);
    watchlistRouter(app);
    listRouter(app);
    ratingRouter(app);
    reviewRouter(app);
}