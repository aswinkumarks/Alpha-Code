import QuestionTab from "../components/CodeWindow/QuestionTab";
import { fetchQuestions } from "../api/question.js";
import { useAsync } from "react-async";
import { useFetch } from "react-async";

const CodeWindowPage = (props) => {
  let cId = window.location.pathname.split("/")[2];

  const headers = { Accept: "application/json" };
  const { data, error, isPending, run } = useFetch(
    "/api/question/?cId=" + cId,
    { headers }
  );

  let questions = data;

  if (!isPending)
    return <QuestionTab questions={questions} />;
  else
    return <div>fetching questions ...</div>
};

export default CodeWindowPage;
