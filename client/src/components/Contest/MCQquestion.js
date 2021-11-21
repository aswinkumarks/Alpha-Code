import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MCQquestionForm from "./MCQquestionForm";
import Box from "@mui/material/Box";

import { useState } from "react";

const MCQquestion = (props) => {
  const [mcqOptions, changeMCQoptions] = useState(props.options);
  function addMCQoption() {
    changeMCQoptions(
      mcqOptions.concat({
        option: "",
        correct_option: false,
      })
    );
  }

  function delMCQoption(pos) {
    changeMCQoptions(mcqOptions.filter((item, index) => index !== pos));
    props.setmcqhandler(mcqOptions);
  }

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider", width:800}}>
      <Grid item md={12}>
        <Button variant="outlined" onClick={addMCQoption}>
        <b>+</b>&nbsp;Option
        </Button>
      </Grid>

        {mcqOptions.map((option, index) => (
            <MCQquestionForm
              delOptionHandler={delMCQoption}
              mcqOption={option}
              index={index}
            />
          ))}

      {props.setmcqhandler(mcqOptions)}
      </Box>
    </div>
  );
};

export default MCQquestion;
