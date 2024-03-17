//Import the NavLink component
import { NavLink } from "react-router-dom";
import "./header.css";
import Search from "../search/search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" className="nav-link">
            <img
              src={process.env.PUBLIC_URL + "/images/logo.png"}
              alt="Website Logo"
              className="logo-image"
            />
          </NavLink>
        </li>
        <li>
          <NavLink to="/menu" className="nav-link" style={{ display: "block" }}>
            <FontAwesomeIcon icon={faBars} />
            <span> Menu</span>
          </NavLink>
        </li>
        <li class = "search-bar"><Search /></li>
        <li>
          <NavLink
            to="/watchlist"
            className="nav-link"
            style={{ display: "flex" }}
          >
            <img
              src={process.env.PUBLIC_URL + "/images/bookmark.png"}
              alt="Watchlist"
              className="watchlist-image"
            />
            <span>Watchlist </span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-in" className="nav-link" id="sign-in">
            Sign In
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
