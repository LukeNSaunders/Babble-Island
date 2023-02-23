import React from "react";
import { login } from "../../ApiClient.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

const initialState = {
  userName: "",
  password: "",
};

function Login(props) {
  let navigate = useNavigate();
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const moveToRegister = () => {
    navigate("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { userName, password } = state;
    const user = { userName: userName, password: password };
    const res = await login(user);
    if (res.status === 401 || res.status === 400) {
      alert(`Error`);
      setState(initialState);
    } else {
      props.setUser(res);
      navigate("/landing");
    }
  };

  const validateForm = () => {
    return !state.userName || !state.password;
  };

  return (
    <div className="babble-island">
      <section className="login">
        <h1 className="title">Babble Island</h1>

        <br></br>

        <h2>Login</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="User Name"
            name="userName"
            value={state.userName}
            onChange={handleChange}
          />
          <br></br>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={state.password}
            onChange={handleChange}
          />
          <br></br>
          <button
            className="form-submit"
            type="submit"
            disabled={validateForm()}
          >
            &nbsp;Login&nbsp;
          </button>
        </form>
        <p>Don't have an account? Register here</p>
        <button className="form-submit" onClick={moveToRegister}>
          Register
        </button>
      </section>
    </div>
  );
}
export default Login;
