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
  const [qtype, setQtype] = useState(props.qData.qtype);

  const questionRef = useRef();
  const descriptionRef = useRef();
  const scoreRef = useRef();

  let questionData = props.qData;
  questionData.qno = props.qno;
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
              defaultValue={questionData.question}
              multiline
              inputProps={{ ref: questionRef }}
            />
          </Grid>

          <Grid item xs={12} md={10}>
            <TextField
              fullWidth
              id="outlined-textarea"
              label="Description"
              defaultValue={questionData.description}
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
              defaultValue={questionData.score}
              inputProps={{ ref: scoreRef }}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            {qtype === "Coding" && (
              <CodingQuestion testCases={questionData.testcases} settestcasehandler={setTestCases} />
            )}
            {qtype === "MCQ" && <MCQquestion options={questionData.options} setmcqhandler={setMcqOptions} />}
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
  );
};

export default QuestionForm;
