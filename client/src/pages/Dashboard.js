import ContestList from "../components/Contest/ContestList";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  return (
    <section>
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
