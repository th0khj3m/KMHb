import listRouter from "./list.js";
import watchlistRouter from "./watchlist.js";

export default (app) => {
    listRouter(app);
    watchlistRouter(app);
}