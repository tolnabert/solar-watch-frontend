import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import "../index.css";

function Header() {
  const isLoggedIn = localStorage.getItem("jwtToken") !== null;
  const roles = localStorage.getItem("roles");

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("roles");
  };

  return (
    <div className='header'>
      <Logo className='header-logo' />
      {isLoggedIn ? (
        <div>
          <NavLink className='header-logout-button' onClick={handleLogout}>
            Logout
          </NavLink>
          {roles.includes("ROLE_ADMIN") && (
            <NavLink className='header-admin-button' to={"/admin"}>
              Admin
            </NavLink>
          )}
        </div>
      ) : (
        <div>
          <NavLink className='header-login-button' to={"/login"}>
            Login
          </NavLink>
          <NavLink className='header-register-button' to={"/register"}>
            Register
          </NavLink>
        </div>
      )}
    </div>
  );
}
export default Header;
