import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CreateTestCaseForm from "./CreateTestCaseForm";

import { useRef, useState } from "react";

const CodingQuestion = () => {
  function addTestCase() {
    changeTCinfo(
      tcinfo.concat({
        id: tcinfo.length + 1,
        question: "",
        testCaseType: "",
        pgmInput: "",
        OutoutType: "",
        pgmOutoutOrEvalCode: "",
        score: "",
      })
    );
  }

  function delTestCase(pos) {
    // let a = tcinfo.splice(pos, 1)
    changeTCinfo(tcinfo.filter((item, index) => index !== pos - 1));
  }

  const [tcinfo, changeTCinfo] = useState([]);
  const descriptionRef = useRef();

  return (
    <div>
      {console.log(tcinfo)}
      <Grid item xs={12} md={12}>
        <TextField
          fullWidth
          id="outlined-textarea"
          label="Description"
          multiline
          inputProps={{ ref: descriptionRef }}
        />
      </Grid>

      <Grid item xs={12} md={12}>
        <p>Test Cases :</p>
        <Button variant="outlined" onClick={addTestCase}>
          +
        </Button>
      </Grid>

      <Grid item xs={12} md={11}>
        {tcinfo.map((tc, index) => (
          <CreateTestCaseForm
            delTChandler={delTestCase}
            tcinfo={tc}
            index={index + 1}
          />
        ))}
      </Grid>
    </div>
  );
};

export default CodingQuestion;
