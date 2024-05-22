import { useState } from "react";
import FormRow from "../components/FormRow";

function AddSolarInfo() {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    state: "",
    latitude: "",
    longitude: "",
    sunrise: "",
    sunset: "",
  });
  const [date, setDate] = useState(new Date());
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
    setDate(formattedDate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setLoading(true);

    const token = localStorage.getItem("jwtToken");

    try {
      const response = await fetch(`/api/solar-info/data/admin/${date}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
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
          name='name'
          labelText='City name: '
          value={formData.name}
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
          value={date}
          onChange={(e) => handleDateChange(e)}
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
        <FormRow
          type='text'
          name='sunrise'
          labelText='Sunrise: '
          value={formData.sunrise}
          onChange={handleChange}
          required
        />
        <FormRow
          type='text'
          name='sunset'
          labelText='Sunset: '
          value={formData.sunset}
          onChange={handleChange}
          required
        />
        <button type='submit' disabled={loading}>
          {loading ? "Adding Solar Info..." : "Add Solar Info"}
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
export default AddSolarInfo;
