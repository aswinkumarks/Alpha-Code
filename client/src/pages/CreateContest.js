import CreateContestForm from "../components/Contest/CreateContestForm";
import NavBar from "../components/Layout/NavBar";
import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import qs from "qs";
import { createBrowserHistory } from "history";

import CreateQuestion from "./CreateQuestion";

const CreateContestPage = () => {
  const [contestCreated, setContest] = useState("");
  const history = createBrowserHistory();

  let cInfo = {
    startTime: new Date(),
    endTime: new Date(),
    cname: "",
    hosted_by: "",
    duration: "",
    desc: "",
  };

  useEffect(() => {
    const filterParams = history.location.search.substr(1);
    const filtersFromParams = qs.parse(filterParams);
    if (filtersFromParams.cname) {
      setContest(filtersFromParams.cname);
    }
  }, []);

  useEffect(() => {
    history.push(`?cname=${contestCreated}`);
  }, [contestCreated]);

  function addNewContestHandler(contestData) {
    console.log(contestData);

    //add rest api call to add to db
    axios
      .post("/api/contests/", contestData)
      .then(function (response) {
        console.log("data sent !");
        console.log(response);
        setContest(contestData.cname);
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
        <CreateContestForm
          onCreateNewContest={addNewContestHandler}
          cInfo={cInfo}
        />
      </div>
    );
  else
    return (
      <div>
        <NavBar/>
        <CreateQuestion cname={contestCreated} />
      </div>
    );
};

export default CreateContestPage;
