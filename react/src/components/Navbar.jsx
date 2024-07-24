import { adminLinks, userLinks, guestLinks } from "../utils/links";
import NavLinks from "./NavLinks";

const Navbar = () => {
  const jwtToken = localStorage.getItem("jwtToken");
  const roles = localStorage.getItem("roles");

  let linksToShow = [];

  if (jwtToken) {
    if (roles && roles.includes("ROLE_ADMIN")) {
      linksToShow = adminLinks;
    } else if (roles && roles.includes("ROLE_USER")) {
      linksToShow = userLinks;
    }
  } else {
    linksToShow = guestLinks;
  }

  return (
    <nav>
      <div className='navbar-container'>
        <NavLinks links={linksToShow} />
      </div>
    </nav>
  );
};
export default Navbar;
