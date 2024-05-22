import { useState } from "react";
import FormRow from "../components/FormRow";
import SolarInfo from "../components/SolarInfo";
import { fetchGetWithAuth } from "../fetchMethods";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    cityName: "",
    country: "",
    state: "",
    date: new Date().toISOString().slice(0, 10),
  });

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
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      navigate("/login");
      return;
    }

    const url = `/api/solar-info?city=${formData.cityName}&country=${formData.country}&state=${formData.state}&date=${formData.date}`;
    try {
      setIsLoading(true);
      const result = await fetchGetWithAuth(url, token);
      setData(result);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStateInput = () => {
    if (formData.country.toLowerCase() === "us") {
      return (
        <FormRow
          type='text'
          name='state'
          labelText='State: '
          value={formData.state}
          onChange={handleChange}
        />
      );
    }
    return null;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormRow
          type='text'
          name='cityName'
          labelText='City Name: '
          value={formData.cityName}
          onChange={handleChange}
          required
        />
        <FormRow
          type='text'
          name='country'
          labelText='Country: '
          value={formData.country}
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
        <button type='submit'>Search</button>
      </form>
      {data && <SolarInfo solarInfo={data} />}
    </div>
  );
}

export default LandingPage;
