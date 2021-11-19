import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import NavBar from "../components/Layout/NavBar";
import qs from "qs";
import { createBrowserHistory } from "history";
import CreateContestForm from "../components/Contest/CreateContestForm";
import CreateQuestion from "./CreateQuestion";

function EditContestPage(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedContests, setLoadedContests] = useState();
  const [loadedQuestions, setLoadedQuestions] = useState([]);
  const history = createBrowserHistory();
  const filterParams = history.location.search.substr(1);
  const filtersFromParams = qs.parse(filterParams);
  let proceedToQ = false;

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/api/contests/" + filtersFromParams.cId)
      .then(function (response) {
        // setIsLoading(false);
        console.log(response.data);
        setLoadedContests(response.data);
      })
      .catch(function (error) {
        console.log("Fetch Contests Data Failed!");
        console.log(error);
      });

    //  filter q based on cname
    // axios
    //   .get("/api/question/")
    //   .then(function (response) {
    //     // setIsLoading(false);
    //     console.log(response.data);
    //     setLoadedQuestions(response.data);
    //   })
    //   .catch(function (error) {
    //     console.log("Fetch Questions Data Failed!");
    //     console.log(error);
    //   });
    setIsLoading(false);
  }, []);

  function editContestHandler(contestData) {
    console.log(contestData);
    axios
      .patch("/api/contests/" + filtersFromParams.cId+"/", contestData)
      .then(function (response) {
        console.log(response);
        setLoadedContests(contestData.cname);
        proceedToQ=true;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  if (loadedContests && !proceedToQ) {
    return (
      <div>
        <NavBar />
        <CreateContestForm
          onEditContest={editContestHandler}
          cInfo={loadedContests}
        />
      </div>
    );
  } 
  else if(proceedToQ){
      return(<div>
        <NavBar />
        <CreateQuestion cname={loadedContests['cname']} />
      </div>);
  }
  else {
    return <div>add loading animation</div>;
  }
}

export default EditContestPage;
