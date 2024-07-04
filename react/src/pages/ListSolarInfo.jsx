import React, { useState, useEffect } from 'react';
import SolarInfo from '../components/SolarInfo';
import '../components/solarInfoStyles.css';
import { fetchGetWithAuth } from '../fetchMethods';

function ListSolarInfo() {
  const [solarInfo, setSolarInfo] = useState([]);

  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    fetchSolarInfo();
  }, []);

  const fetchSolarInfo = async () => {
    try {
      const response = await fetchGetWithAuth('/api/all-solar-info', {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch solar information');
      }
      
      const data = await response.json();
      setSolarInfo(data);
    } catch (error) {
      console.error('Error fetching solar information:', error);
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
