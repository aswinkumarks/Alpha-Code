import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";

import { useRef, useState, useEffect } from "react";

const MCQquestionForm = (props) => {
  const [mcq_correct_option, setMCQcorrect] = useState(
    props.mcqOption.correct_option
  );

  useEffect(() => {
    updateOptionValue();
  }, [mcq_correct_option]);

  const optionRef = useRef();
  const correct_wrongRef = useRef();

  function delOption() {
    props.delOptionHandler(props.index);
  }

  function changeCorrectWrong(event) {
    setMCQcorrect(event.target.value);
  }

  function updateOptionValue() {
    props.mcqOption.option = optionRef.current.value;
    props.mcqOption.correct_option = correct_wrongRef.current.value;
    // console.log(props.mcqOption);
  }

  return (
    <Grid
      container
      justify="space-between"
      rowSpacing={1}
      spacing={2}
      sx={{ mt: 1 }}
    >

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          // id="standard-basic"
          label="Option"
          variant="outlined"
          multiline
          defaultValue={props.mcqOption.option}
          inputProps={{ ref: optionRef }}
          onChange={updateOptionValue}
        >
          {props.mcqOption.option}
        </TextField>
      </Grid>

      <Grid item>
        <Select
          id="demo-simple-select"
          value={mcq_correct_option}
          label="✔/x"
          onChange={changeCorrectWrong}
          defaultValue={"Wrong"}
          inputProps={{ ref: correct_wrongRef }}
        >
          <MenuItem value={false}>Wrong</MenuItem>

          <MenuItem value={true}>Correct</MenuItem>
        </Select>
      </Grid>

      <Grid item>
        <Button variant="outlined" color="error" onClick={delOption}>
          -
        </Button>
      </Grid>
    </Grid>
  );
};

export default MCQquestionForm;
