import React from 'react';
import "../components/solarInfoStyles.css";

function SolarInfo({ solarInfo }) {
  if (!solarInfo || solarInfo.length === 0) {
    return null; // Handle case where solarInfo is empty or not yet loaded
  }

  return (
    <div className="solar-info-container">
      <h2>Solar Information</h2>
      <table className="solar-info-table">
        <thead>
          <tr>
            <th>City</th>
            <th>Country</th>
            <th>State</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Sunrise</th>
            <th>Sunset</th>
          </tr>
        </thead>
        <tbody>
          {solarInfo.map((cityData, index) => (
            <React.Fragment key={index}>
              {cityData.map((info, idx) => (
                <tr key={idx}>
                  <td>{info.name}</td>
                  <td>{info.country}</td>
                  <td>{info.state}</td>
                  <td>{info.latitude}</td>
                  <td>{info.longitude}</td>
                  <td>{info.sunrise}</td>
                  <td>{info.sunset}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SolarInfo;