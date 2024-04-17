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
import Lists from "./lists.js";
import List from "./list-details.js";
import ListForm from "./list-form/list-form.js";
import PrivateRoute from "../components/private-route.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      {/* <Route path="movies" element={<Movies />}> */}
      <Route path="movies/:movieId" element={<MovieDetails />}>
        <Route path="reviews" element={<Reviews />} />
      </Route>
      {/* </Route> */}
      <Route path="casts/:castId" element={<CastDetails />} />
      <Route path="lists" element={<Lists />} />
      <Route path="lists/:title" element={<List />} />
      <Route path="lists/create" element={<ListForm />} />

      <Route path="watchlist" element={<PrivateRoute />}>
        <Route element={<Watchlist />} />
      </Route>

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
