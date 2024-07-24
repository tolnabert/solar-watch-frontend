import { NavLink } from "react-router-dom";

function NavLinks({ links }) {
  return (
    <div>
      {links.map((link) => (
        <NavLink
          className={({ isActive }) =>
            `navlink-label ${isActive ? "navlink-selected" : ""}`
          }
          to={link.href}
          key={link.label}
          end={link.href === "/" || link.href.includes("/admin")}
        >
          {link.label}
        </NavLink>
      ))}
    </div>
  );
}

export default NavLinks;
