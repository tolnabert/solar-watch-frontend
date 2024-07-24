import { useState, useEffect } from "react";
import SolarInfo from "../components/SolarInfo";
import "../index.css";
import { fetchGetWithAuth } from "../fetchMethods";
import { useNavigate } from "react-router-dom";

function ListSolarInfo() {
  const navigate = useNavigate();
  const [solarInfo, setSolarInfo] = useState([]);
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    const roles = localStorage.getItem("roles");

    if (!token) {
      navigate("/login");
      return;
    }

    if (!roles.includes("ROLE_ADMIN")) {
      navigate("/");
      return;
    }

    fetchSolarInfo(token);
  }, [navigate]);

  const fetchSolarInfo = async () => {
    try {
      const data = await fetchGetWithAuth("/api/admin/solar-info/all", token);
      setSolarInfo(data);
    } catch (error) {
      console.error("Error fetching solar information:", error);
    }
  };

  return (
    <div className='solar-info-container'>
      <h1 className='solar-info-list-title'>Solar Information</h1>
      {solarInfo.length > 0 ? (
        <SolarInfo solarInfo={solarInfo} />
      ) : (
        <p className='solar-info-list-msg'>No solar information available</p>
      )}
    </div>
  );
}

export default ListSolarInfo;
