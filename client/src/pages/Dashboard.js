import { useState, useEffect, useMemo } from "react";
import axios from "axios";

import NavBar from "../components/Layout/NavBar";
import ContestList from "../components/Contest/ContestList";

import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

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
        // console.log(response.data);
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

      <br/>
      <Button variant="contained">
        <Link to="/create_contest">Create Contest</Link>
      </Button>
      <br/><br/>

      <ContestList contests={loadedContests} />
    </section>
  );
};

export default DashboardPage;
