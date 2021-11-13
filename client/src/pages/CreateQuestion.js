import CreateQuestionForm from "../components/Contest/CreateQuestionForm";
import NavBar from "../components/Layout/NavBar";
import axios from "axios";
import { useHistory } from "react-router-dom";

const CreateQuestionPage = (props) => {
  //dict of dicts {qno:{qdata}}
  let questionsDict = {};
  let questionsList = [];

  function add2QuestionList(questionData, qno, qtype) {
    questionsDict[qno] = questionData;
    // console.log(
    //   "createquestion.js : questionDict : " + JSON.stringify(questionsDict)
    // );
  }

  function submitAllQuestions() {
    console.log(questionsDict)
    for (let qno in questionsDict) {
      postQuestion(questionsDict[qno]);
    }
  }

  function postQuestion(qData) {
    console.log("posting question : "+ JSON.stringify(qData));
    axios
      .post("/api/question/", qData)
      .then(function (response) {
        console.log("question data sent !");
        console.log(response);
      })
      .catch(function (error) {
        console.log("error");
        console.log(error);
      });
  }

  return (
    <div>
      <CreateQuestionForm
        cname={props.cname}
        questionListHandler={add2QuestionList}
        submitAllQuestionsHandler={submitAllQuestions}
        //   onCreateNewQuestion={addNewQuestionHandler}
      />
    </div>
  );
};

export default CreateQuestionPage;
