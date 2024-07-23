import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to='/'>
      <img
        className='header-logo-img'
        src='../../public/solarwatchlogo.jpg'
        alt='logo'
      />
    </Link>
  );
}
export default Logo;
