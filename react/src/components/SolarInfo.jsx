import "../components/solarInfoStyles.css";

function SolarInfo({ solarInfo }) {
  if (!solarInfo || solarInfo.length === 0) {
    return (
      <div className="solar-info-container">
        <h2>Solar Information</h2>
        <p>No solar information available</p>
      </div>
    );
  }

  return (
    <div className="solar-info-container">
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
          {solarInfo.map((info, index) => (
            <tr key={index}>
              <td>{info.name}</td>
              <td>{info.country}</td>
              <td>{info.state || '-'}</td>
              <td>{info.latitude}</td>
              <td>{info.longitude}</td>
              <td>{info.sunrise}</td>
              <td>{info.sunset}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SolarInfo;
