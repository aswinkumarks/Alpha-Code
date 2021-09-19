import { useState, createContext } from "react";
import axios from "axios";

const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  username: ""
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialUsername = localStorage.getItem("username")
  const [token, setToken] = useState(initialToken);
  const [username, setUsername] = useState(initialUsername);
  const isUserLoggedIn = !!token;
  const setUserInfo = () => {
    axios
      .get("/rest-auth/user/")
      .then(function (response) {
        localStorage.setItem("name", response.data.first_name);
      })
      .catch(function (error) {
        console.log("Fetch User info Failed!");
        console.log(error);
      });
  };
  const loginHandler = (username, token) => {
    setToken(token);
    setUsername(username);
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    setUserInfo();
  };
  const logoutHandler = () => {
    axios
      .post("/rest-auth/logout/", {})
      .then(function (response) {
        setToken(null);
        localStorage.clear();
      })
      .catch(function (error) {
        console.log("Logout Failed!");
        console.log(error);
      });
  };
  const contextValue = {
    token: token,
    isLoggedIn: isUserLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    username: username
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
