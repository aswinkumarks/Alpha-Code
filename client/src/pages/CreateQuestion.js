import CreateQuestionForm from "../components/Contest/CreateQuestionForm";
import NavBar from "../components/Layout/NavBar";
import axios from "axios";
import { useHistory } from "react-router-dom";

const CreateQuestionPage = () => {

  return (
    <div>
      <NavBar />
      <CreateQuestionForm 
    //   onCreateNewQuestion={addNewQuestionHandler}
       />
    </div>
  );
};

export default CreateQuestionPage;
