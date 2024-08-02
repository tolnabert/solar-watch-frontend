import { useEffect, useState } from "react";
import "../index.css";
import FormRow from "../components/FormRow";
import SolarInfo from "../components/SolarInfo";
import { fetchGetWithAuth } from "../fetchMethods";
import { useNavigate } from "react-router-dom";

function SearchSolarInfo() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("jwtToken");

  const [formData, setFormData] = useState({
    cityName: "",
    country: "",
    state: "",
    date: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    const roles = localStorage.getItem("roles");

    if (!token) {
      navigate("/login");
      return;
    }
    if (roles.includes("ROLE_ADMIN") || roles.includes("ROLE_USER")) {
      return;
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    const formattedDate = date.toISOString().slice(0, 10);
    setFormData({
      ...formData,
      date: formattedDate,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `/api/solar-info?city=${formData.cityName}&country=${formData.country}&state=${formData.state}&date=${formData.date}`;
    try {
      setIsLoading(true);
      const result = await fetchGetWithAuth(url, token);
      setData((prevData) => [...result, ...prevData]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStateInput = () => {
    const isUs = formData.country.toLowerCase() === "us";
    if (isUs) {
      return (
        <FormRow
          type='text'
          name='state'
          labelText='State: '
          value={formData.state}
          onChange={handleChange}
          required={isUs}
          placeholder={isUs ? "Enter state (e.g., Texas)" : ""}
        />
      );
    }
    return null;
  };

  return (
    <div>
      <form className='search-solar-info' onSubmit={handleSubmit}>
        <FormRow
          type='text'
          name='cityName'
          labelText='City Name: '
          value={formData.cityName}
          placeholder='city name'
          onChange={handleChange}
          required
        />
        <FormRow
          type='text'
          name='country'
          labelText='Country: '
          value={formData.country}
          placeholder='(Optional) e.g., ES'
          onChange={handleChange}
        />
        {renderStateInput()}
        <FormRow
          type='date'
          name='date'
          labelText='Date: '
          value={formData.date}
          onChange={handleDateChange}
          required
        />
        <button className='form-btn' type='submit' disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </button>
        {error && <p className='error-msg'>{error.message}</p>}
      </form>
      {data.length > 0 ? (
        <div>
          <h2 className='solar-info-title'>Solar Information History</h2>
          <SolarInfo solarInfo={data} />
        </div>
      ) : (
        <h2 className='solar-info-title-warning'>
          Search for a city with country(optional) and with state in case of US.
        </h2>
      )}
    </div>
  );
}

export default SearchSolarInfo;
