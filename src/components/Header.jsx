import { NavLink } from "react-router-dom";
import Logo from "./Logo";

function Header() {
  const isLoggedIn = localStorage.getItem("jwtToken") !== null;
  const roles = localStorage.getItem("roles");

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("roles");

  };

  return (
    <div className='header'>
      <Logo />
      {isLoggedIn ? (
        <>
          {roles.includes("ROLE_ADMIN") && (
            <NavLink className='navlink-button' to={"/admin"}>
              Admin
            </NavLink>
          )}
          <NavLink className='navlink-button' onClick={handleLogout}>
            Logout
          </NavLink>
        </>
      ) : (
        <>
          <NavLink className='navlink-button' to={"/register"}>
            Register
          </NavLink>
          <NavLink className='navlink-button' to={"/login"}>
            Login
          </NavLink>
        </>
      )}
    </div>
  );
}
export default Header;
