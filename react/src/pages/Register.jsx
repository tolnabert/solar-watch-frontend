import { useState } from "react";
import FormRow from "../components/FormRow";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: new Date(),
    email: "",
    username: "",
    password: "",
    passwordConfirmation: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

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
      dateOfBirth: formattedDate,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirmation) {
      setMessage("Passwords must match");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage("");
    setMessageType("");
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Registration successful! You can now login!");
        setMessageType("success");
        setTimeout(() => {//only in development for showcase delay
          navigate("/login");
        }, 1500);
      } else {
        const data = await response.json();
        if (data.error) {
          const errors = data.error.split("; ").join("\n");
          setMessage(errors);
          setMessageType("error");
        } else {
          setMessage("Failed to register");
          setMessageType("error");
        }
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("An error occurred during registration");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className='register-page-title'>Register</h1>
      <form onSubmit={handleSubmit}>
        <FormRow
          type='text'
          name='firstName'
          labelText='First Name: '
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <FormRow
          type='text'
          name='lastName'
          labelText='Last Name: '
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <FormRow
          type='date'
          name='dateOfBirth'
          labelText='Date of Birth: '
          value={formData.dateOfBirth}
          onChange={(event) => handleDateChange(event)}
          required
        />
        <FormRow
          type='email'
          name='email'
          labelText='Email: '
          value={formData.email}
          onChange={handleChange}
          required
        />
        <FormRow
          type='text'
          name='username'
          labelText='Username: '
          value={formData.username}
          onChange={handleChange}
          required
        />
        <FormRow
          type='password'
          name='password'
          labelText='Password: '
          value={formData.password}
          onChange={handleChange}
          required
        />
        <FormRow
          type='password'
          name='passwordConfirmation'
          labelText='Password confirmation: '
          value={formData.passwordConfirmation}
          onChange={handleChange}
          required
        />
        <button className='form-register-btn' type='submit' disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        {message && (
          <p
            className={`message-register ${
              messageType === "success" ? "success" : "error"
            }`}
          >
            {message}
          </p>
        )}
      </form>
      <p className='register-msg'>
        Already a member?{" "}
        <Link className='register-link' to='/login'>
          Login
        </Link>
      </p>
    </>
  );
}
export default Register;
