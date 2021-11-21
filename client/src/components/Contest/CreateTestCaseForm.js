import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { useRef, useState, useEffect } from "react";

const CreateTestCaseForm = (props) => {
  const [tc_type, setTCtype] = useState(props.tcinfo.OutputType);
  const [tc_visibilty, setTCvisibilty] = useState(props.tcinfo.testCaseType);

  useEffect(() => {
    updateTcOptionValue();
  }, [tc_type, tc_visibilty]);

  const inputRef = useRef();
  const outputRef = useRef();
  const scoreRef = useRef();
  const tc_typeRef = useRef();
  const tc_visRef = useRef();

  function changeTCtype(event) {
    setTCtype(event.target.value);
  }

  function changeTCvisibilty(event) {
    setTCvisibilty(event.target.value);
  }

  function delTC() {
    props.delTChandler(props.index);
  }

  function updateTcOptionValue() {
    props.tcinfo.testCaseType = tc_visRef.current.value;
    props.tcinfo.pgmInput = inputRef.current.value;
    props.tcinfo.OutputType = tc_typeRef.current.value;
    props.tcinfo.pgmOutputOrEvalCode = outputRef.current.value;
    props.tcinfo.score = scoreRef.current.value;
    // console.log(props.tcinfo);
  }

  return (
    <Grid
      container
      justify="space-between"
      rowSpacing={1}
      spacing={1}
      sx={{ mt: 1 }}
    >

      <Grid item xs={2} md={3}>
        <TextField
          disabled
          id="outlined-disabled"
          label="Test Case number"
          defaultValue="1"
          value={props.index+1}
        />
      </Grid>

      <Grid item xs={12} md={2}>
        <Button variant="outlined" color="error" onClick={delTC}>
          <b>- </b>&nbsp;Remove
        </Button>
      </Grid>

      <Grid item xs={12} md={8}>
        <TextField
          fullWidth
          id="standard-basic"
          label="Input"
          variant="outlined"
          multiline
          onChange={updateTcOptionValue}
          defaultValue={props.tcinfo.pgmInput}
          inputProps={{ ref: inputRef }}
        />
      </Grid>

      <Grid item xs={12} md={2}>
        <TextField
          id="standard-number"
          label="Score"
          type="number"
          variant="outlined"
          onChange={updateTcOptionValue}
          defaultValue={props.tcinfo.score}
          inputProps={{ ref: scoreRef }}
        />
      </Grid>

      <Grid item xs={12} md={2}>
        <Select
          id="demo-simple-select"
          label="Visibilty"
          value={tc_visibilty}
          onChange={changeTCvisibilty}
          inputProps={{ ref: tc_visRef }}
        >
          <MenuItem value={"Hidden"}>Hidden</MenuItem>

          <MenuItem value={"Visible"}>Visible</MenuItem>
        </Select>
      </Grid>

      <Grid item xs={12} md={10}>
        <TextField
          fullWidth
          id="standard-basic"
          label="Output"
          variant="outlined"
          multiline
          onChange={updateTcOptionValue}
          defaultValue={props.tcinfo.pgmOutputOrEvalCode}
          inputProps={{ ref: outputRef }}
        />
      </Grid>

      <Grid item xs={12} md={2}>
        <Select
          id="demo-simple-select"
          label="Testcase Type"
          value={tc_type}
          onChange={changeTCtype}
          inputProps={{ ref: tc_typeRef }}
        >
          <MenuItem value={"Static"}>Static</MenuItem>

          <MenuItem value={"Dynamic"}>Dynamic</MenuItem>
        </Select>
      </Grid>
    </Grid>
  );
};

export default CreateTestCaseForm;
