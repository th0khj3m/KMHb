//Import the NavLink component
import { Link } from "react-router-dom";
import "./header.css";
import Search from "../search/search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li className = "logo">
            <Link to="/" className="nav-link">
              <img
                src={process.env.PUBLIC_URL + "/images/logo.png"}
                alt="Website Logo"
                className="logo-image"
              />
            </Link>
          </li>
          <li>
            <Link to="/menu" className="nav-link" style={{ display: "block" }}>
              <FontAwesomeIcon icon={faBars} />
              <span> Menu</span>
            </Link>
          </li>
          <li className="search-bar">
            <Search />
          </li>
          <li>
            <Link
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
            </Link>
          </li>
          <li>
            <Link to="/sign-in" className="nav-link" id="sign-in">
              Sign In
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
