import QuestionForm from "../components/Contest/QuestionForm";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useHistory } from "react-router";
import { useState, useEffect } from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const CreateQuestionPage = (props) => {
  let questionData = {
    qno: "",
    qtype: "MCQ",
    question: "",
    description: "",
    score: "",
    contest: props.cname,
    testcases: [],
    options: [],
  };

  const [qno, changeQno] = useState(1);
  const [value, setValue] = useState(0);
  const [questions, setQuestions] = useState([]);

  const routerHistory = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchQuestions = () => {
    axios
      .get(`/api/question/?cname=${props.cname}`)
      .then(function (response) {
        setQuestions(response.data);
        console.log('questions : ',response.data);
        changeQno(response.data.length + 1);
      })
      .catch(function (error) {
        console.log("Fetch Question Data Failed!");
        console.log(error);
      });
  };

  useEffect(() => {
    if (props.mode == "edit") fetchQuestions();
    else setQuestions(questions.concat(questionData));
  }, []);

  function submitAllQuestions() {
    routerHistory.push("/");
  }

  function addNewQuestion() {
    changeQno(qno + 1);
    setQuestions((prevQuestions) => {
      return prevQuestions.concat(questionData);
    });
  }

  function delQuestion(q_idx) {

    if (questions[q_idx].id){
      console.log("deleting question : " + JSON.stringify(questions[q_idx]));
    axios
      .delete("/api/question/"+ questions[q_idx].id)
      .then(function (response) {
        console.log("question data sent !");
        console.log(response);
        if (q_idx==0) setValue(1);
        else if (q_idx+1 == questions.length) setValue(q_idx-1);
        setQuestions(questions.filter((_, index) => index !== q_idx));
      })
      .catch(function (error) {
        console.log("error");
        console.log(error);
      });
    }
    else{
      if (q_idx==0) setValue(1);
        else if (q_idx+1 == questions.length) setValue(q_idx-1);
        setQuestions(questions.filter((_, index) => index !== q_idx));
      }    

  }

  function postQuestion(qData) {
    console.log("posting question : " + JSON.stringify(qData));
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
    <Container fixed>
      <Typography gutterBottom variant="h4" color="text.secondary">
        Contest : {props.cname}
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider", width: 300 }}
        >
          {questions.map((_, i) => (
            <Tab label={i + 1} {...a11yProps(i)} />
          ))}

          {questions.length == 0 ? (
            <Tab
              label="Add Question"
              icon={<AddIcon />}
              onClick={addNewQuestion}
            />
          ) : (
            <Tab icon={<AddIcon />} onClick={addNewQuestion} />
          )}
        </Tabs>

        {questions.map((question, index) => (
          <TabPanel value={value} index={index}>
            <QuestionForm
              qno={index + 1}
              qData={question}
              postQuestion={postQuestion}
              delQuestion={delQuestion}
              submitAllQuestions={submitAllQuestions}
            />
          </TabPanel>
        ))}
      </Box>
    </Container>
  );
};

export default CreateQuestionPage;
