import CreateQuestionForm from "../components/Contest/CreateQuestionForm";
import NavBar from "../components/Layout/NavBar";
import axios from "axios";
import { useHistory } from "react-router-dom";

const CreateQuestionPage = (props) => {
  //dict of dicts {qno:{qdata}}
  let questionsList = {};

  function add2QuestionList(questionData,qno) {
    questionsList[qno]=questionData;
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
