import "./app.css";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Home from "../../routes/home/home";
import Watchlist from "../../routes/watchlist/watchlist";
import SignIn from "../../routes/sign-in/sign-in";
import Lists from "../../routes/lists/lists";
import List from "../../routes/list/list";
import ListForm from "../../routes/list-form/list-form";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />}>
      <Route path="watchlist" element={<Watchlist />} />
      <Route path="sign-in" element={<SignIn />} />
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
