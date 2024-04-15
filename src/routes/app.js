import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Root from "./root.js";
import Home from "./home.js";
import Login from "./login/login.js";
import Register from "./register/register.js";
import Watchlist from "./watchlist.js";
import Movies from "./movies.js";
import MovieDetails from "./movie-details.js";
import Reviews from "./reviews.js";
import CastDetails from "./cast-details.js";
import Lists from "./lists.js";
import List from "./list-details.js";
import ListForm from "./list-form/list-form.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="watchlist" element={<Watchlist />} />
      {/* <Route path="movies" element={<Movies />}> */}
      <Route path="movies/:movieId" element={<MovieDetails />}>
        <Route path="reviews" element={<Reviews />} />
      </Route>
      {/* </Route> */}
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
