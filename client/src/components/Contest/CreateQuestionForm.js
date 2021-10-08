import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useRef, useState } from "react";

import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import CreateTestCaseForm from "./CreateTestCaseForm";

const CreateQuestionForm = (props) => {
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

  const [tcinfo, changeTCinfo] = useState([]);

  function addTestCase() {
    changeTCinfo(
      tcinfo.concat({
        id: tcinfo.length+1,
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
    changeTCinfo(tcinfo.filter((item, index) => index !== pos-1));
  }

  const qTypeRef = useRef();
  const questionRef = useRef();
  const descriptionRef = useRef();

  return (
    <Container fixed sx={{ mt: 5 }}>
      {console.log(tcinfo)}

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
                defaultValue="[add counter here]"
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
                  index={index+1}
                />
              ))}
            </Grid>
            <Grid item>
              <Button type="button" variant="contained">
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
