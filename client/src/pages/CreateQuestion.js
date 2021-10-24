import CreateQuestionForm from "../components/Contest/CreateQuestionForm";
import NavBar from "../components/Layout/NavBar";
import axios from "axios";
import { useHistory } from "react-router-dom";

const CreateQuestionPage = (props) => {
  //list of dicts
  let questionsList = [];

  function add2QuestionList(questionData) {
    questionsList.push(questionData);
    console.log(
      "createquestion.js : questiolist : " + JSON.stringify(questionsList)
    );
  }

  return (
    <div>
      <CreateQuestionForm
        cname={props.cname}
        questionListHandler={add2QuestionList}
        //   onCreateNewQuestion={addNewQuestionHandler}
      />
    </div>
  );
};

export default CreateQuestionPage;
