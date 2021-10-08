import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import { useRef, useState } from "react";

const MCQquestionForm = (props) => {
  const [mcq_correct_option, setMCQcorrect] = useState("Wrong");
  const mcq_correct_options = [
    {
      value: "Wrong",
      label: "Wrong",
    },
    {
      value: "Correct",
      label: "Correct",
    },
  ];

  function changeMCQcorrect(event) {
    setMCQcorrect(event.target.value);
  }

  function delOption(){
    props.delOptionHandler(props.index);
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
          id="standard-basic"
          label="Option"
          variant="outlined"
          multiline
          // inputProps={{ ref: contestNameRef }}
        />
      </Grid>

      <Grid item>
        <TextField
          //   id=""
          select
          label="✔/x"
          value={mcq_correct_option}
          onChange={changeMCQcorrect}
        >
          {mcq_correct_options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
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
