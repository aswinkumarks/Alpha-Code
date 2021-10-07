import CreateContestForm from "../components/Contest/CreateContestForm";
import NavBar from "../components/Layout/NavBar";
import axios from "axios";
import { useHistory } from "react-router-dom";

const CreateContestPage = () => {
  const history = useHistory();

  function addNewContestHandler(contestData) {
    console.log(contestData);

    //add rest api call to add to db
    axios
      .post("/api/contests/", contestData)
      .then(function (response) {
        console.log("data sent !");
        console.log(response);
        history.replace("/");
      })
      .catch(function (error) {
        console.log("error");
        console.log(error);
      });
  }

  return (
    <div>
      <NavBar />
      <CreateContestForm onCreateNewContest={addNewContestHandler} />
    </div>
  );
};

export default CreateContestPage;
