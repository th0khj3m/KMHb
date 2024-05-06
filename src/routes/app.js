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
import MovieDetails from "./movie-details.js";
import MovieReviews from "./movie-reviews.js";

import CastDetails from "./cast-details.js";
import Ratings from "./ratings.js";
import Dashboard from "./admin/dashboard.js";
import Accounts from "./admin/accounts.js";

import PrivateRoute from "../components/private-route.js";
import MenuMovies from "./menu/menu-movies.js";
import MenuCasts from "./menu/menu-casts.js";
import ForgotPassword from "./forgot-password.js";
import ResetPasswordPage from "./reset-password.js";
import UserReviews from "./user-reviews.js";
import ChatRoom from "./chatroom.js";
import PasswordRequestSent from "./request-sent.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot-password/new" element={<ForgotPassword />} />
      <Route path="forgot-password/sent" element={<PasswordRequestSent />} />
      <Route path="reset-password/:token" element={<ResetPasswordPage />} />

      <Route path="menu/movies" element={<MenuMovies />} />
      <Route path="movies/:movieId" element={<MovieDetails />} />
      <Route path="movies/:movieId/reviews" element={<MovieReviews />} />
      {/* <Route path="reviews/:reviewId" element={<Review />} */}
      <Route path="menu/casts" element={<MenuCasts />} />
      <Route path="casts/:castId" element={<CastDetails />} />

      {/* User Routes */}
      <Route path="user" element={<PrivateRoute />}>
        <Route path="watchlist" element={<Watchlist />} />
        <Route path="chatroom" element={<ChatRoom />} />
        <Route path="ratings" element={<Ratings />} />
        <Route path="reviews" element={<UserReviews />} />
      </Route>

      {/*Admin Routes */}
      <Route path="admin" element={<PrivateRoute isAdminRoute={true} />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="accounts" element={<Accounts />} />
        {/* <Route path="user-reviews" element={<Admin/>} /> */}
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  )
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function isLoggedIn() {
      await dispatch(checkLoginStatus());
    }
    isLoggedIn();
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
