import authRouter from "./auth.js";
import userRouter from "./user.js";
import watchlistRouter from "./watchlist.js";
import ratingRouter from "./rating.js";
import reviewRouter from "./review.js";
import statisticsRouter from "./statistics.js";

export default (app, passport) => {
  authRouter(app, passport);
  userRouter(app);
  watchlistRouter(app);
  ratingRouter(app);
  reviewRouter(app);
  statisticsRouter(app);
};
