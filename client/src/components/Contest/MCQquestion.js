import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MCQquestionForm from "./MCQquestionForm";

import { useRef, useState } from "react";

const MCQquestion = () => {
  const [mcqOptions, changeMCQoptions] = useState([]);

  function addMCQoption() {
    changeMCQoptions(
      mcqOptions.concat({
        id: mcqOptions.length + 1,
        option: "",
        correct_option: "",
      })
    );
  }

  function delMCQoption(pos) {
    changeMCQoptions(mcqOptions.filter((item, index) => index !== pos - 1));
  }

  return (
    // <div>

    <Grid
      container
      justify="space-between"
      rowSpacing={1}
      spacing={3}
      sx={{ mt: 1 }}
    >
      {console.log(mcqOptions)}

      <Grid item md={12}>
        <p>MCQ Options :</p>
        <Button variant="outlined" onClick={addMCQoption}>
          +
        </Button>
      </Grid>

      <Grid item md={12}>
        {mcqOptions.map((option, index) => (
          <MCQquestionForm
            delOptionHandler={delMCQoption}
            mcqOption={option}
            index={index + 1}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default MCQquestion;
