import { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { createBrowserHistory } from "history";
import ContestForm from "./components/ContestForm";
import CreateQuestion from "../codingWindow/CreateQuestion";

function EditContestPage(props) {
  const [contest, setContest] = useState(false);
  const [activePage, setActivePage] = useState("contest");
  const history = createBrowserHistory();
  const filterParams = history.location.search.substr(1);
  const filtersFromParams = qs.parse(filterParams);

  useEffect(() => {
    console.log(filtersFromParams);
    if (filtersFromParams.activePage) {
      setActivePage(filtersFromParams.activePage);
    }
  }, []);

  useEffect(() => {
    fetchContest();
  }, []);

  const fetchContest = () => {
    axios
      .get(`/api/contests/${filtersFromParams.cId}`)
      .then(function (response) {
        setContest(response.data);
      })
      .catch(function (error) {
        console.log("Fetch Contests Data Failed!");
        console.log(error);
      });
  };

  function editContestHandler(contestData) {
    console.log(contestData);
    axios
      .put(`/api/contests/${filtersFromParams.cId}/`, contestData)
      .then(function (response) {
        console.log(response);
        setActivePage("question");
        history.replace({
          search: qs.stringify({
            ...filtersFromParams,
            activePage: "question",
          }),
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  if (activePage === "contest" && contest) {
    return <ContestForm onEditContest={editContestHandler} cInfo={contest} />;
  } else if (activePage === "question" && contest) {
    return <CreateQuestion cname={contest["cname"]} mode='edit'/>;
  } else {
    return <div>add loading animation</div>;
  }
}

export default EditContestPage;
