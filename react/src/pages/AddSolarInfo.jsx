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
  const [errors, setErrors] = useState({});

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

  const validateTime = (time, amPm) => {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
      return false;
    }
    if (
      hours < 1 ||
      hours > 12 ||
      minutes < 0 ||
      minutes > 59 ||
      seconds < 0 ||
      seconds > 59
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setLoading(true);

    const token = localStorage.getItem("jwtToken");
    const errors = {};

    const sunriseValid = validateTime(formData.sunrise, formData.sunriseAmPm);
    const sunsetValid = validateTime(formData.sunset, formData.sunsetAmPm);

    if (!sunriseValid) {
      errors.sunrise = "Time must be AM/PM format (0:00:00-11:59:59)";
    }

    if (!sunsetValid) {
      errors.sunset = "Time must be AM/PM format (0:00:00-11:59:59)";
    }

    if (Object.keys(errors).length) {
      setErrors(errors);
      setLoading(false);
      return;
    }

    try {
      const formattedSunrise = `${formData.sunrise} ${formData.sunriseAmPm}`;
      const formattedSunset = `${formData.sunset} ${formData.sunsetAmPm}`;

      const solarInfoData = {
        ...formData,
        sunrise: formattedSunrise,
        sunset: formattedSunset,
      };

      const response = await fetch("/api/admin/solar-info/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(solarInfoData),
      });

      if (response.ok) {
        setMessage("Solar information added successfully!");
        setErrors({});
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
    <>
      <h1 className="solar-info-add-title">Add Solar Info</h1>
      <form className='solar-info-add-form' onSubmit={handleSubmit}>
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
        <div className='time-group'>
          <label className='sunrise-label' htmlFor={name}>
            Sunrise:
          </label>
          <input
            className='form-input'
            type='time'
            step={2}
            min={0}
            max={12}
            id='sunrise'
            name='sunrise'
            value={formData.sunrise}
            onChange={handleChange}
            required='true'
          />
          <select
            name='sunriseAmPm'
            value={formData.sunriseAmPm}
            onChange={handleChange}
            className='am-pm-select'
          >
            <option value='AM'>AM</option>
            <option value='PM'>PM</option>
          </select>
          {errors.sunrise && <p className='error-msg-time'>{errors.sunrise}</p>}
        </div>
        <div className='time-group'>
          <label className='sunset-label' htmlFor={name}>
            Sunset:
          </label>
          <input
            className='form-input'
            type='time'
            step={2}
            min={0}
            max={12}
            id='sunset'
            name='sunset'
            value={formData.sunset}
            onChange={handleChange}
            required='true'
          />
          <select
            name='sunsetAmPm'
            value={formData.sunsetAmPm}
            onChange={handleChange}
            className='am-pm-select'
          >
            <option value='AM'>AM</option>
            <option value='PM'>PM</option>
          </select>
          {errors.sunset && <p className='error-msg-time'>{errors.sunset}</p>}
        </div>
        <button className="form-add-btn" type='submit' disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </button>
        {message && <p>{message}</p>}
      </form>
    </>
  );
}
export default AddSolarInfo;
