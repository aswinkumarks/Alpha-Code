import ContestForm from "./components/ContestForm";
import axios from "axios";
import { useState, useEffect } from "react";
import qs from "qs";
// import { createBrowserHistory } from "history";

import CreateQuestionPage from "../codingWindow/CreateQuestion";

const CreateContestPage = () => {
  const [contestCreated, setContest] = useState("");
  // const history = createBrowserHistory();

  let cInfo = {
    startTime: new Date(),
    endTime: new Date(),
    cname: "",
    hosted_by: "",
    duration: "",
    desc: "",
  };

  // useEffect(() => {
  //   const filterParams = history.location.search.substr(1);
  //   const filtersFromParams = qs.parse(filterParams);
  //   if (filtersFromParams.cname) {
  //     setContest(filtersFromParams.cname);
  //   }
  // }, []);

  // useEffect(() => {
  //   history.push(`?cname=${contestCreated}`);
  // }, [contestCreated]);

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
        <ContestForm
          onCreateNewContest={addNewContestHandler}
          cInfo={cInfo}
        />
      </div>
    );
  else
    return (
      <div>
        <CreateQuestionPage cname={contestCreated} mode='new'/>
      </div>
    );
};

export default CreateContestPage;
