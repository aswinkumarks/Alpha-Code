import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useRef, useState } from "react";
import { useHistory } from "react-router";

import MenuItem from "@mui/material/MenuItem";
import CodingQuestion from "./CodingQuestion";
import MCQquestion from "./MCQquestion";

const QuestionForm = (props) => {
  const [qtype, setQtype] = useState("Coding");

  const questionRef = useRef();
  const descriptionRef = useRef();
  const routerHistory = useHistory();
  const scoreRef = useRef();

  let questionData = props.qData;
  let mcqOptions = [];
  let testCases = [];

  function changeQtype(event) {
    setQtype(event.target.value);
  }

  function setMcqOptions(mcqdata) {
    mcqOptions = mcqdata;
    // console.log(mcqOptions);
  }

  function setTestCases(tcdata) {
    testCases = tcdata;
    // console.log(testCases);
  }

  function saveQuestion() {
    questionData.qtype = qtype;
    questionData.question = questionRef.current.value;
    questionData.description = descriptionRef.current.value;
    questionData.score = scoreRef.current.value;
    questionData.testcases = testCases;
    questionData.options = mcqOptions;

    props.postQuestion(questionData);
  }

  return (
    <Box sx={{ border: 1, p: 4, borderRadius: 2 }}>
      <form>
        <Grid
          container
          justify="space-between"
          rowSpacing={6}
          spacing={3}
          // sx={{ mt: 1 }}
        >
          <Grid item xs={12} md={12}>
            <TextField
              disabled
              id="outlined-disabled"
              label="Question number"
              value={questionData.qno}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <TextField
              id="qtype"
              select
              label="Type"
              value={qtype}
              onChange={changeQtype}
            >
              <MenuItem value={"Coding"}>Coding</MenuItem>
              <MenuItem value={"MCQ"}>MCQ</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} md={10}>
            <TextField
              fullWidth
              id="outlined-textarea"
              label="Question"
              multiline
              inputProps={{ ref: questionRef }}
            />
          </Grid>

          <Grid item xs={12} md={10}>
            <TextField
              fullWidth
              id="outlined-textarea"
              label="Description"
              multiline
              inputProps={{ ref: descriptionRef }}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <TextField
              id="standard-number"
              label="Score"
              type="number"
              variant="outlined"
              inputProps={{ ref: scoreRef }}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            {qtype === "Coding" && (
              <CodingQuestion settestcasehandler={setTestCases} />
            )}
            {qtype === "MCQ" && <MCQquestion setmcqhandler={setMcqOptions} />}
          </Grid>

          <Grid item>
            <Button type="button" variant="contained" onClick={saveQuestion}>
              Save
            </Button>
          </Grid>

          <Grid item>
            <Button
              type="button"
              variant="contained"
              onClick={props.submitAllQuestions}
            >
              Finish
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default QuestionForm;
