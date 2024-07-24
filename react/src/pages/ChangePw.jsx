import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ChangePw() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const roles = localStorage.getItem("roles");

    if (!token) {
      navigate("/login");
      return;
    }
    if(roles.includes("ROLE_ADMIN") || roles.includes("ROLE_USER")) {
      return;
    } 

    navigate("/");
  }, [navigate]);

  return <div>change password</div>;
}
export default ChangePw;
