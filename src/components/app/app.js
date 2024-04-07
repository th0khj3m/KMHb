import "./app.css";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Root from "../../routes/root/root";
import Home from "../../routes/home/home";
import Login from "../../routes/login/login";
import Register from "../../routes/register/register";
import Watchlist from "../../routes/watchlist/watchlist";
import Lists from "../../routes/lists/lists";
import List from "../../routes/list/list";
import ListForm from "../../routes/list-form/list-form";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="watchlist" element={<Watchlist />} />
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
