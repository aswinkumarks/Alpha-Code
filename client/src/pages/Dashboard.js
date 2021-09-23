import { useState, useEffect, useMemo } from "react";
import axios from "axios";

import NavBar from "../components/Layout/NavBar";
import ContestList from "../components/Contest/ContestList";
import CreateContest from './CreateContest';

const DashboardPage = () => {
  // document.body.style = "background: rgb(18,18,18);";
  const [isLoading, setIsLoading] = useState(true);
  const [loadedContests, setLoadedContests] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/api/contests/")
      .then(function (response) {
        setIsLoading(false);
        console.log(response.data);
        setLoadedContests(response.data);
      })
      .catch(function (error) {
        console.log("Fetch Contests Data Failed!");
        console.log(error);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading ...</p>
      </section>
    );
  }
  return (
    <section>
      <NavBar />
      <CreateContest/>
      {/* <ContestList contests={loadedContests} /> */}
    </section>
  );
};

export default DashboardPage;
