import { useState, useEffect } from "react";
import SolarInfo from "../components/SolarInfo";
import "../index.css";
import { fetchGetWithAuth } from "../fetchMethods";

function ListSolarInfo() {
  const [solarInfo, setSolarInfo] = useState([]);
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    if (token) {
      fetchSolarInfo();
    }
  }, [token]);

  const fetchSolarInfo = async () => {
    try {
      const data = await fetchGetWithAuth("/api/admin/solar-info/all", token);
      setSolarInfo(data);
      console.log(data); // Log the received data
    } catch (error) {
      console.error("Error fetching solar information:", error);
    }
  };

  return (
    <div className="solar-info-container">
      <h2>Solar Information</h2>
      {solarInfo.length > 0 ? (
        <SolarInfo solarInfo={solarInfo} />
      ) : (
        <p>No solar information available</p>
      )}
    </div>
  );
}

export default ListSolarInfo;
