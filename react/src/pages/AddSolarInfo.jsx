import { useState } from "react";
import FormRow from "../components/FormRow";

function AddSolarInfo() {
  const [formData, setFormData] = useState({
    cityName: "",
    country: "",
    state: "",
    date: "",
    latitude: "",
    longitude: "",
    sunrise: "",
    sunset: "",
    sunriseAmPm: "AM",
    sunsetAmPm: "PM",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
    console.log(formData);
    setLoading(true);

    const token = localStorage.getItem("jwtToken");

    try {
      const formattedSunrise = `${formData.sunrise} ${formData.sunriseAmPm}`;
      const formattedSunset = `${formData.sunset} ${formData.sunsetAmPm}`;

      const solarInfoData = {
        ...formData,
        sunrise: formattedSunrise,
        sunset: formattedSunset,
      };

      const response = await fetch("/api/add-solar-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(solarInfoData),
      });

      if (response.ok) {
        setMessage("Solar information added successfully!");
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to add solar information");
      }
    } catch (error) {
      console.error("An error occurred while adding solar information:", error);
      setMessage("An error occurred while adding solar information");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h1>Add Solar Info</h1>
      <form onSubmit={handleSubmit}>
        <FormRow
          type='text'
          name='cityName'
          labelText='City name: '
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
          required
        />
        <FormRow
          type='text'
          name='state'
          labelText='State: '
          value={formData.state}
          onChange={handleChange}
        />
        <FormRow
          type='date'
          name='date'
          labelText='Date: '
          value={formData.date}
          onChange={handleDateChange}
          required
        />
        <FormRow
          type='number'
          name='latitude'
          labelText='Latitude: '
          value={formData.latitude}
          onChange={handleChange}
          required
        />
        <FormRow
          type='number'
          name='longitude'
          labelText='Longitude: '
          value={formData.longitude}
          onChange={handleChange}
          required
        />
        <div>
          <label>Sunrise AM/PM:</label>
          <select name="sunriseAmPm" value={formData.sunriseAmPm} onChange={handleChange}>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
        <FormRow
          type='text'
          name='sunrise'
          labelText='Sunrise: '
          value={formData.sunrise}
          onChange={handleChange}
          required
        />
        <div>
          <label>Sunset AM/PM:</label>
          <select name="sunriseAmPm" value={formData.sunsetAmPm} onChange={handleChange}>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
        <FormRow
          type='text'
          name='sunset'
          labelText='Sunset: '
          value={formData.sunset}
          onChange={handleChange}
          required
        />
        <button type='submit' disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
export default AddSolarInfo;
