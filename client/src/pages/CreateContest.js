import CreateContestForm from "../components/Contest/CreateContestForm";
import NavBar from "../components/Layout/NavBar";
import axios from "axios";
import { useState } from "react";

import CreateQuestion from "./CreateQuestion";

const CreateContestPage = () => {
  const [contestCreated, changeContestCreate] = useState('');

  function addNewContestHandler(contestData) {
    console.log(contestData);

    //add rest api call to add to db
    axios
      .post("/api/contests/", contestData)
      .then(function (response) {
        console.log("data sent !");
        console.log(response);
        changeContestCreate(contestData.cname);
      })
      .catch(function (error) {
        console.log("error");
        console.log(error);
      });
  }

  if (!contestCreated)
    return (
      <div>
        <NavBar />
        <CreateContestForm onCreateNewContest={addNewContestHandler} />;
      </div>
    );
  else
    return (
      <div>
        <NavBar />
        <CreateQuestion cname={contestCreated}/>
      </div>
    );
};

export default CreateContestPage;
