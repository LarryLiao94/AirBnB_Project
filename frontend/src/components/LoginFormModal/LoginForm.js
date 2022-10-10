import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './LoginForm.css'

function LoginForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);
  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ email, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className='login--container'>
    <form className='loginform' onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label className='loginformvalue'>
        email
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <small className="input-error"></small>
      </label>
      <label className='loginformvalue'>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <small className="input-error"></small>
      </label>
      <button type="submit" className='login-button'>Log In</button>
      <NavLink className='new-user' to="/signup">Click here to create an account</NavLink>
      <button
        onClick={(e) => {
          setEmail("demo@user.io");
          setPassword("password");
        }}
      >
        Click here to login as a demo user
      </button>
    </form>
    </div>
  );
}

export default LoginForm;
