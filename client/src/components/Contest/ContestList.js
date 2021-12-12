import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ContestItem from "./ContestItem";

import { useState, useEffect } from "react";
import axios from "axios";

function ContestList() {
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

  function delContestHandler(cId) {
    console.log();

    //add rest api call to del from db
    axios
      .delete("/api/contests/" + cId)
      .then(function (response) {
        console.log(response);
        setLoadedContests(loadedContests.filter((item) => item.cId !== cId));
      })
      .catch(function (error) {
        console.log("error");
        console.log(error);
      });
  }

  if (isLoading) {
    return (
      <section>
        <p>Loading ...</p>
      </section>
    );
  }

  return (
    <Box component="span" sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {loadedContests.map((contest) => (
          <ContestItem
            cInfo={contest}
            delContest={delContestHandler}
          ></ContestItem>
        ))}
      </Grid>
    </Box>
  );
}

export default ContestList;
