import CreateQuestionForm from "../components/Contest/CreateQuestionForm";
import NavBar from "../components/Layout/NavBar";
import axios from "axios";
import { useHistory } from "react-router-dom";

const CreateQuestionPage = (props) => {

  return (
    <div>
      <CreateQuestionForm cname={props.cname}
    //   onCreateNewQuestion={addNewQuestionHandler}
       />
    </div>
  );
};

export default CreateQuestionPage;
