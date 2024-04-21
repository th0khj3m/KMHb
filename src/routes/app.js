import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkLoginStatus } from "../store/auth/auth.actions.js";

import Root from "./root.js";
import Home from "./home.js";
import Login from "./login.js";
import Register from "./register.js";
import Watchlist from "./watchlist.js";
import Movies from "./movies.js";
import MovieDetails from "./movie-details.js";
import Reviews from "./reviews.js";
import CastDetails from "./cast-details.js";
import Ratings from "./ratings.js";

import PrivateRoute from "../components/private-route.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      {/* <Route path="movies" element={<Movies />}> */}
      <Route path="movies/:movieId" element={<MovieDetails />} />
      <Route path="movies/:movieId/reviews" element={<Reviews />} />
      {/* <Route path="reviews/:reviewId" element={<Review />} */}

      {/* </Route> */}
      <Route path="casts/:castId" element={<CastDetails />} />

      {/* <Route path="watchlist" element={<PrivateRoute />}> */}
      <Route path="watchlist" element={<Watchlist />} />
      {/* </Route> */}
      <Route path="ratings" element={<Ratings />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  )
);

function App() {
  const dispatch = useDispatch();

  // Load user
  useEffect(() => {
    async function isLoggedIn() {
      await dispatch(checkLoginStatus());
    }
    isLoggedIn();
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
