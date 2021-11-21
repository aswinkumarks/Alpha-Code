import QuestionForm from "../components/Contest/QuestionForm";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import axios from "axios";
import { useHistory } from "react-router";
import { useState } from "react";

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
  const [qno, changeQno] = useState(1);
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let questionData = {
    qno: "",
    qtype: "",
    question: "",
    description: "",
    score: "",
    contest: props.cname,
    testcases: [],
    options: [],
  };

  const routerHistory = useHistory();

  function submitAllQuestions() {
    routerHistory.push("/");
  }

  function addNewQuestion() {
    changeQno(qno + 1);
    routerHistory.push("/create_contest");
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
          height: 224,
        }}
      >
        <Grid item>
          <Button type="button" variant="contained" onClick={addNewQuestion}>
            Next
          </Button>
        </Grid>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          {[...Array(qno).keys()].map((_, i) => (
              <Tab label={i + 1} {...a11yProps(i)} />
            ))}
        </Tabs>

        {[...Array(qno).keys()].map((_, i) => (
            <TabPanel value={value} index={i}>
              <QuestionForm
                qno={i+1}
                qData={questionData}
                postQuestion={postQuestion}
                submitAllQuestions={submitAllQuestions}
              />
            </TabPanel>
          ))}
      </Box>
    </Container>
  );
};

export default CreateQuestionPage;
