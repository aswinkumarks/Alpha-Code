import { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./AuthForm.css";
import AuthContext from "../../store/Auth-Context";

const LoginForm = () => {
  const background = `background-image: linear-gradient(to right, var(--gradient-color-stops));
  --gradient-from-color: #81e6d9;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-to-color, rgba(129, 230, 217, 0));
  --gradient-to-color: #4299e1;`

  document.body.style = background;
  const [isLoading, setIsLoading] = useState(false);
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    const username = usernameInputRef.current.value;
    const password = passwordInputRef.current.value;

    setIsLoading(true);
    axios
      .post("/rest-auth/login/", {
        username: username,
        password: password,
      })
      .then(function (response) {
        authCtx.login(username, response.data.key);
      })
      .catch(function (error) {
        let errorMessage = "Authentication Failed!";
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          if (error.response.data && error.response.non_field_errors) {
            errorMessage = "Invalid username / password";
          }
        } else {
          console.log(error);
        }
        alert(errorMessage);
      })
      .then(function () {
        setIsLoading(false);
      });
  };

  return (
    <div className="center">
      <div className="form-card">
        <form onSubmit={submitHandler}>
          <h1 className="heading">Participant Login</h1>
          <div className="px-5">
            <input
              className="inputField"
              type="text"
              id="username"
              placeholder="Username"
              required=""
              ref={usernameInputRef}
            />
            <input
              className="inputField"
              type="password"
              id="password"
              placeholder="Password"
              required=""
              ref={passwordInputRef}
            />
          </div>
          <div className="flex justify-center m-3">
            {!isLoading && (
              <button className="login-btn hover:bg-blue-500" type="submit">
                Login
              </button>
            )}
            {isLoading && <p className="text-blue">Loading ..</p>}
          </div>
        </form>
        <div className="text-blue">
          Don't have an Account?
          <Link to="/signup">
            <span>Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
