import CreateContestForm from "../components/Contest/CreateContestForm";
import NavBar from "../components/Layout/NavBar";
import axios from "axios";

const CreateContestPage = () => {
  function addNewContestHandler(contestData) {
    console.log(contestData);
    const contest_data = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contestData),
    };

    //add rest api call to add to db
    // axios
    //   .post("/api/create_contest/", JSON.stringify(contestData), {
    //     headers: { "content-Type": "application/json" },
    //   })
      fetch("/api/create_contest/", contest_data)
      .then(function (response) {
        console.log("data sent !");
        console.log(response);
      })
      .catch(function (error) {
        console.log("error");
        console.log(error);
      });
  }

  return (
    <div>
      <NavBar />
      <CreateContestForm onCreateNewContest={addNewContestHandler} />
    </div>
  );
};

export default CreateContestPage;
