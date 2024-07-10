import { NavLink } from "react-router-dom";
import "./navbar.css";
import { useAuth } from "../store/auth";

export const Navbar = () => {
  const { user,isLoggedIn } = useAuth();

  return (
    <header>
      <div className="Container">
      {!!isLoggedIn && <nav>
          <ul>
            <li>
              <NavLink className="nav-links" to="/">Home</NavLink>
            </li>

           
                <li>
                  <NavLink className="nav-links" to="/addShop">Add Shops</NavLink>
                </li>
                <li>
                  <NavLink className="nav-links" to="logout">{user.email} (Logout)</NavLink>
                </li>

          </ul>
        </nav>}
      </div>
    </header>
  );
};
