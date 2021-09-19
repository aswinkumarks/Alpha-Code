import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/Auth-Context";
import { ThemeWrapper } from "./components/Layout/ThemeWrapper";

axios.interceptors.request.use(
  (request) => {
    if (request.url.includes("api") || request.url.includes("user")) {
      const token = localStorage.getItem("token");
      request.headers["Authorization"] = `Token ${token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ReactDOM.render(
  <AuthContextProvider>
    <BrowserRouter>
      <ThemeWrapper>
        <App />
      </ThemeWrapper>
    </BrowserRouter>
  </AuthContextProvider>,
  document.getElementById("root")
);
