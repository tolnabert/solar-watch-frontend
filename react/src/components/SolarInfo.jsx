import "../index.css";

function SolarInfo({ solarInfo }) {
  return (
    <div className='solar-info-container'>
      <table className='solar-info-table'>
        <thead>
          <tr className='solar-info-table-label'>
            <th>City</th>
            <th>Country</th>
            <th>State</th>
            <th>Date</th>
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
              <td>{info.state || "-"}</td>
              <td>{info.date}</td>
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
