import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password/:token" element={<ResetPasswordPage />} />

      <Route path="menu/movies" element={<MenuMovies />} />
      <Route path="movies/:movieId" element={<MovieDetails />} />
      <Route path="movies/:movieId/reviews" element={<MovieReviews />} />
      {/* <Route path="reviews/:reviewId" element={<Review />} */}

      <Route path="menu/casts" element={<MenuCasts />} />
      <Route path="casts/:castId" element={<CastDetails />} />

      {/*Admin Routes */}
      <Route path="chatroom" element={<ChatRoom />} />
      <Route
        path="watchlist"
        element={
          <PrivateRoute>
            <Watchlist />
          </PrivateRoute>
        }
      />
      <Route
        path="ratings"
        element={
          <PrivateRoute>
            <Ratings />
          </PrivateRoute>
        }
      />
      <Route
        path="user-reviews"
        element={
          <PrivateRoute>
            <UserReviews />
          </PrivateRoute>
        }
      />

      {/*Admin Routes */}

      <Route
        path="dashboard"
        element={
          <PrivateRoute isAdminRoute={true}>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="accounts"
        element={
          <PrivateRoute isAdminRoute={true}>
            <Accounts />
          </PrivateRoute>
        }
      />

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
