import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CreateTestCaseForm from "./CreateTestCaseForm";

import { useState } from "react";

const CodingQuestion = (props) => {
  const [tcinfos, changeTCinfo] = useState([]);
  const [rerender, setRerender] = useState(false);

  function addTestCase() {
    changeTCinfo(
      tcinfos.concat({
        // id: tcinfos.length + 1,
        testCaseType: "Hidden",
        pgmInput: "",
        OutputType: "Static",
        pgmOutputOrEvalCode: "",
        score: "",
      })
    );
  }

  function delTestCase(pos) {
    changeTCinfo(tcinfos.filter((item, index) => index !== pos));
    props.settestcasehandler(tcinfos);
    setRerender(true);
    setTimeout(() => {
      setRerender(false);
    }, 1000);
  }

  return (
    <div>

      <Grid item xs={12} md={12}>
        <p>Test Cases :</p>
        <Button variant="outlined" onClick={addTestCase}>
          +
        </Button>
      </Grid>

      <Grid item xs={12} md={11}>
        {rerender &&
          tcinfos.map((tc, index) => (
            <CreateTestCaseForm
              delTChandler={delTestCase}
              tcinfo={tc}
              index={index}
            />
          ))}
        {!rerender &&
          tcinfos.map((tc, index) => (
            <CreateTestCaseForm
              delTChandler={delTestCase}
              tcinfo={tc}
              index={index}
            />
          ))}
      </Grid>
      {props.settestcasehandler(tcinfos)}
    </div>
  );
};

export default CodingQuestion;
