import { Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/Dashboard";
import AuthContext from "./store/Auth-Context";
import CreateContestPage from "./pages/CreateContest";
import CreateQuestionPage from "./pages/CreateQuestion";
import EditContestPage from "./pages/EditContest";

function App() {
  const authCtx = useContext(AuthContext);
  if (authCtx.isLoggedIn) {
    return (
      <Switch>
        <Route path="/" exact>
          <DashboardPage />
        </Route>
        <Route path="/create_contest">
          <CreateContestPage/>
        </Route>

        <Route path="/edit_contest/*">
          <EditContestPage/>
        </Route>
        
        <Route path="*">
          <Redirect to="/" />
        </Route>

      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/signup">
          <SignupPage />
        </Route>
        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    );
  }
}

export default App;
