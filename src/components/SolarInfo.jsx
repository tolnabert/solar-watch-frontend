function SolarInfo({ solarInfo }) {
  return (
    <div>
      <h2>Solar Information</h2>
      <ul>
        {solarInfo.map((info, index) => (
          <li key={index}>
            <strong>City:</strong> {info.name}
            <br />
            <strong>Country:</strong> {info.country}
            <br />
            <strong>State:</strong> {info.state}
            <br />
            <strong>Latitude:</strong> {info.latitude}
            <br />
            <strong>Longitude:</strong> {info.longitude}
            <br />
            <strong>Sunrise:</strong> {info.sunrise}
            <br />
            <strong>Sunset:</strong> {info.sunset}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SolarInfo;
