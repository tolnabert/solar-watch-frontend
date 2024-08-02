import { useState } from "react";
import FormRow from "../components/FormRow";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");

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
        setMessage("Login successful! Redirecting to landing page!");
        setMessageType("success");
        setTimeout(() => {
          //only in development for showcase delay
          navigate("/search");
        }, 1500);
      } else {
        setMessage("Incorrect username or password");
        setMessageType("error");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setMessage("An error occurred while logging in");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className='login-page-title'>Login</h1>
      <form onSubmit={handleSubmit}>
        <FormRow
          type='text'
          name='username'
          labelText='Username: '
          value={formData.username}
          placeholder='username'
          onChange={handleChange}
          required
        />
        <FormRow
          type='password'
          name='password'
          labelText='Password: '
          value={formData.password}
          placeholder='password'
          onChange={handleChange}
          required
        />
        <button className='form-login-btn' type='submit' disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {message && (
          <p
            className={`message-login ${
              messageType === "error" ? "error" : "success"
            }`}
          >
            {message}
          </p>
        )}
      </form>
      <p className='login-msg'>
        Not a member yet?{" "}
        <Link className='login-link' to='/register'>
          register
        </Link>
      </p>
    </>
  );
}
export default Login;
