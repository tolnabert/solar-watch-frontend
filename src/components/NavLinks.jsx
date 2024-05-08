import { links } from "@/utils";
import { NavLink } from "react-router-dom";

function NavLinks() {
  return (
    <div>
      {links.map((link) => {
        return (
          <NavLink
            className={({ isActive }) => {
              return `navlink-label ${isActive ? "navlink-select" : ""}`;
            }}
            to={link.href}
            key={link.label}
          >
            {link.label}
          </NavLink>
        );
      })}
    </div>
  );
}

export default NavLinks;
