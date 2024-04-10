import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Root from "../routes/root.js";
import Home from "../routes/home.js";
import Login from "../routes/login/login";
import Register from "../routes/register/register";
import Watchlist from "../routes/watchlist.js";
import MovieDetails from "../routes/movie-details.js";
import CastDetails from "../routes/cast";
import Lists from "../routes/lists.js";
import List from "../routes/list-details.js";
import ListForm from "../routes/list-form/list-form";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="watchlist" element={<Watchlist />} />
      <Route path="movies/:movieId" element={<MovieDetails />} />
      <Route path="casts/:castId" element={<CastDetails />} />
      <Route path="lists" element={<Lists />} />
      <Route path="lists/:title" element={<List />} />
      <Route path="lists/create" element={<ListForm />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
