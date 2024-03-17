import './app.css';

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Home from "../../routes/home/home";
import Watchlist from '../../routes/watchlist/watchlist';
import SignIn from '../../routes/sign-in/sign-in';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />}>
      <Route path="watchlist" element={<Watchlist />} />
      <Route path = "sign-in" element = {<SignIn />} />
    </Route>
  ));

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
