import "./login.css"
import { useContext, useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/auth/AuthContext";
import { CircularProgress } from "@mui/material";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      {
        email: email.current.value,
        password: password.current.value,
      },
      dispatch
    );
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
              placeholder="Email"
              type={"email"}
              className="loginInput"
              required
              ref={email}
            />
            <input
              placeholder="Password"
              type={"password"}
              className="loginInput"
              required
              minLength={6}
              ref={password}
            />
            <button className="loginButton" disabled={isFetching} type="submit">
              {isFetching ? (
                <CircularProgress color="inherit" size="20px" />
              ) : (
                "Login"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              {isFetching ? (
                <CircularProgress color="inherit" size="20px" />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;