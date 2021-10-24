import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useRef, useState } from "react";

import MenuItem from "@mui/material/MenuItem";
import CodingQuestion from "./CodingQuestion";
import MCQquestion from "./MCQquestion"

const CreateQuestionForm = (props) => {

  const [qno, changeQno] = useState(1);

  const qtypes = [
    {
      value: "Coding",
      label: "Coding",
    },
    {
      value: "MCQ",
      label: "MCQ",
    },
  ];

  const [qtype, setQtype] = useState("Coding");

  function changeQtype(event) {
    setQtype(event.target.value);
  }


  const qTypeRef = useRef();
  const questionRef = useRef();

  function createQuestionHandler() {
    // const qtype = qTypeRef.current.value;
    // const question = questionRef.current.value;

    // const questionData = {
    //   qtype: qtype,
    //   question: question,
    // };

    changeQno(qno+1);
  }

  return (
    <Container fixed sx={{ mt: 5 }}>

      <Box sx={{ border: 1, p: 4, borderRadius: 2 }}>
        <form>
          <Typography gutterBottom variant="h4" color="text.secondary">
            Contest : {props.cname}
          </Typography>

          <Grid
            container
            justify="space-between"
            rowSpacing={6}
            spacing={3}
            sx={{ mt: 1 }}
          >
            <Grid item xs={12} md={12}>
              <TextField
                disabled
                id="outlined-disabled"
                label="Question number"
                defaultValue={qno}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                id="qtype"
                select
                label="Type"
                value={qtype}
                onChange={changeQtype}
                inputProps={{ ref: qTypeRef }}
              >
                {qtypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
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

              
            <Grid item xs={12} md={12}>
              {qtype==="Coding"&&<CodingQuestion/>}
              {qtype==="MCQ"&&<MCQquestion/>}
            </Grid>

            
            <Grid item>
              <Button type="button" variant="contained" onClick={createQuestionHandler}>
                Next
              </Button>
            </Grid>
            <Grid item>
              <Button type="button" variant="contained">
                Finish
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default CreateQuestionForm;
