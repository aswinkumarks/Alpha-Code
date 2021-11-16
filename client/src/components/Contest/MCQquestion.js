import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MCQquestionForm from "./MCQquestionForm";

import { useRef, useState } from "react";

const MCQquestion = (props) => {
  const [mcqOptions, changeMCQoptions] = useState([]);
  const [rerender, setRerender] = useState(false);

  function addMCQoption() {
    changeMCQoptions(
      mcqOptions.concat({
        // id: mcqOptions.length + 1,
        option: "",
        correct_option: false,
      })
    );
  }

  function delMCQoption(pos) {
    changeMCQoptions(mcqOptions.filter((item, index) => index !== pos));
    props.setmcqhandler(mcqOptions);
    setRerender(true);
    setTimeout( () => {setRerender(false)}, 1000);
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
      {/* {console.log(mcqOptions)} */}

      <Grid item md={12}>
        <p>MCQ Options :</p>
        <Button variant="outlined" onClick={addMCQoption}>
          +
        </Button>
      </Grid>

      <Grid item md={12}>
        {rerender &&
          mcqOptions.map((option, index) => (
            <MCQquestionForm
              delOptionHandler={delMCQoption}
              mcqOption={option}
              index={index}
            />
          ))}

        {!rerender &&
          mcqOptions.map((option, index) => (
            <MCQquestionForm
              delOptionHandler={delMCQoption}
              mcqOption={option}
              index={index}
            />
          ))}
      </Grid>
      {props.setmcqhandler(mcqOptions)}
    </Grid>
  );
};

export default MCQquestion;
