import './app.css';

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Home from "../../routes/home/home";
import Watchlist from "../../routes/watchlist/watchlist";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />}>
      <Route path="watchlist" element={<Watchlist />} />
    </Route>
  ));

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
