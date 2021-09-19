import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import './AuthForm.css';

const SignupForm = () => {
  const background = `background-image: linear-gradient(to right, var(--gradient-color-stops));
  --gradient-from-color: #81e6d9;
  --gradient-color-stops: var(--gradient-from-color), var(--gradient-to-color, rgba(129, 230, 217, 0));
  --gradient-to-color: #4299e1;`

  document.body.style = background;
  
  const [isLoading, setIsLoading] = useState(false);
  const usernameInputRef = useRef();
  const password1InputRef = useRef();
  const password2InputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const username = usernameInputRef.current.value;
    const password1 = password1InputRef.current.value;
    const password2 = password2InputRef.current.value;

    setIsLoading(true);
    axios.post('/rest-auth/registration/', {
      'username': username,
      'password1': password1,
      'password2': password2
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        let errorMessage = "Sign Up Failed!"
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          if (error.response.data && error.response.non_field_errors) {
            errorMessage = "Invalid username / password";
          }
        }
        else {
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
          <h1 className="heading">Participant Registration</h1>
          <div className="px-5">
            <input className="inputField" type="text" id="username" placeholder="Username" required="" ref={usernameInputRef}/>
            <input className="inputField" type="password" id="password1" placeholder="Password" required="" ref={password1InputRef}/>
            <input className="inputField" type="password" id="password2" placeholder="Confirm Password" required="" ref={password2InputRef}/>
          </div>
          <div className="flex justify-center m-3">
            {!isLoading && <button className="login-btn hover:bg-blue-500" type="submit">Sign Up</button>}
            {isLoading && <p className="text-blue">Loading ..</p>}
          </div>
        </form>
        <div className="text-blue">
          Already have an Account?
          <Link to="/login"><span>Sign In</span></Link>
        </div>
      </div>
    </div>);

};

export default SignupForm;
