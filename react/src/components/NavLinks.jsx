import { adminLinks, links } from "../utils/links";
import { NavLink } from "react-router-dom";

function NavLinks() {
  const jwtToken = localStorage.getItem("jwtToken");
  const roles = localStorage.getItem("roles");

  return (
    <div>
      {roles && roles.includes("ROLE_ADMIN")
        ? adminLinks.map((link) => (
            <NavLink
              className={({ isActive }) =>
                `navlink-label ${isActive ? "navlink-selected" : ""}`
              }
              to={link.href}
              key={link.label}
            >
              {link.label}
            </NavLink>
          ))
        : links.map((link) => (
            <NavLink
              className={({ isActive }) =>
                `navlink-label ${isActive ? "navlink-selected" : ""}`
              }
              to={link.href}
              key={link.label}
            >
              {link.label}
            </NavLink>
          ))}
    </div>
  );
}

export default NavLinks;
