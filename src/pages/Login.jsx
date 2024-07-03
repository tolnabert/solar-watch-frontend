import React, { useState } from "react";
import FormRow from "../components/FormRow";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "user",
    password: "asd",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        localStorage.setItem("jwtToken", data.jwt);
        localStorage.setItem("roles", data.roles);
        navigate("/");
      } else {
        setErrorMessage("Incorrect username or password");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setErrorMessage("An error occurred while logging in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <button type='submit' disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
      <p>
        Not a member yet? <Link to='/register'>register</Link>
      </p>
    </>
  );
}
export default Login;
