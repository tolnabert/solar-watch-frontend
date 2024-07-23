import { Link } from "react-router-dom";
import logo from "../../public/solarwatchlogo.jpg";

function Logo() {
  return (
    <Link to='/'>
      <img
        className='header-logo-img'
        src={logo}
        alt='logo'
      />
    </Link>
  );
}
export default Logo;
