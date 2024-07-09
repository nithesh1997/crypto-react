import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "../Login/auth.scss";
import "pages/Login/Login.scss"

const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    const { email, password } = state;
    // alert(`You are login with email: ${email} and password: ${password}`);
    if (email === "" || password === "") {
      setError("Please enter email and password");
    } else {
      if (email === "admin@admin.com" || password === "pass") {
        setError("");
        localStorage.setItem("authenticated", true);
        navigate("/home");
      } else {
        setError("Invalid credentials");
      }
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <span>Sign in</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <div style={{ fontSize: "12px", color: "#FF2400" }}>{error}</div>
        <a href="#" style={{ fontSize: "10px", color: "d6d6d6" }}>
          Forgot your password?
        </a>
        <button>Sign In</button>
      </form>
    </div>
  );
};
export default Login;
