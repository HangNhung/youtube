import "./register.css"
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Password don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Ellensocial</h3>
          <span className="loginDesc">
            Social network just for Ellen and Alan
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              className="loginInput"
              ref={username}
            />
            <input
              placeholder="Email"
              className="loginInput"
              ref={email}
              type="email"
            />
            <input
              placeholder="Password"
              className="loginInput"
              minLength={6}
              type="password"
              ref={password}
            />
            <input
              placeholder="Password Again"
              className="loginInput"
              minLength={6}
              type="password"
              ref={passwordAgain}
            />
            <button className="loginButton" type="submit">
              Sign in
            </button>
            <button className="loginRegisterButton">Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;