import { useState, useEffect, useMemo } from "react";
import axios from "axios";

import NavBar from "../components/Layout/NavBar";
import ContestList from "../components/Contest/ContestList";

import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  // document.body.style = "background: rgb(18,18,18);";
  return (
    <section>
      <NavBar />
      <br />
      <Button variant="contained">
        <Link to="/create_contest">Create Contest</Link>
      </Button>
      <br />
      <br />

      <ContestList/>
    </section>
  );
};

export default DashboardPage;
